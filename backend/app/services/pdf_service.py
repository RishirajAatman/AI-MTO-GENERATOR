from pathlib import Path
from pdf2image import convert_from_path

OUTPUT_DIR = Path("uploads")


def convert_pdf_to_image(pdf_path: Path) -> Path:
    """
    Convert first page of PDF into PNG image.
    Returns path to generated image.
    """

    images = convert_from_path(
        pdf_path,
        dpi=300
    )

    image_path = OUTPUT_DIR / f"{pdf_path.stem}.png"

    images[0].save(image_path, "PNG")

    return image_path