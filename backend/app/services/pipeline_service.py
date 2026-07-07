from pathlib import Path
from fastapi import UploadFile
from app.core.config import GEMINI_ENABLED, GEMINI_API_KEY
from app.core.config import GEMINI_ENABLED
from app.models.mto import MTOResponse

from app.services.file_service import save_uploaded_file
from app.services.pdf_service import convert_pdf_to_image
from app.services.gemini_service import extract_mto_from_image
from app.services.summary_service import compute_summary
from app.services.csv_service import generate_csv
from app.services.mock_service import get_mock_response


def run_pipeline(file: UploadFile) -> tuple[MTOResponse, Path, bool, str]:
    """
    Complete MTO extraction pipeline.

    Returns:
        tuple(MTOResponse, csv_path)
    """

    # -----------------------------
    # Step 1 : Save uploaded file
    # -----------------------------
    saved_path = save_uploaded_file(file)

    # -----------------------------
    # Step 2 : Convert PDF -> PNG
    # -----------------------------
    processed_path = saved_path

    if file.content_type == "application/pdf":
        processed_path = convert_pdf_to_image(saved_path)
    preview_image = f"/uploads/{processed_path.name}"
     # -----------------------------
    # Step 3 : AI Extraction
    # -----------------------------

    gemini_used = False

    if GEMINI_ENABLED and GEMINI_API_KEY:
        try:
            print("🤖 Calling Gemini...")

            gemini_response = extract_mto_from_image(processed_path)

            mto = MTOResponse.model_validate(gemini_response)

            gemini_used = True

            print("✅ Gemini Success")

        except Exception as e:
            print(f"❌ Gemini Error: {e}")
            print("⚠️ Falling back to Mock Response")

            mto = get_mock_response()

    else:
        print("⚠️ Gemini disabled or API key not configured.")
        print("⚠️ Using Mock Response")

        mto = get_mock_response()

    # -----------------------------
    # Step 4 : Compute Summary
    # -----------------------------
    mto = compute_summary(mto)

    # -----------------------------
    # Step 5 : Generate CSV
    # -----------------------------
    csv_path = generate_csv(mto)

    print("✅ Pipeline completed successfully.")

    return mto, csv_path, gemini_used, preview_image