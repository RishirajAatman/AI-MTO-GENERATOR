from fastapi import APIRouter, UploadFile, File, HTTPException
from app.routes import export
from app.services.pipeline_service import run_pipeline

router = APIRouter()

ALLOWED_TYPES = {
    "application/pdf",
    "image/png",
    "image/jpeg"
}


@router.post("/extract")
async def extract(file: UploadFile = File(...)):

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, PNG and JPG files are allowed."
        )

    mto, csv_path, gemini_used, preview_image = run_pipeline(file)
    export.LAST_CSV_PATH = csv_path
    print(preview_image)
    return {
    "mto": mto.model_dump(),
    "csv_file": str(csv_path),
    "source": "gemini" if gemini_used else "mock",
    "preview_image": preview_image,
}