from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

router = APIRouter(prefix="/export", tags=["Export"])

LAST_CSV_PATH: Path | None = None


@router.get("/csv")
def download_csv():

    global LAST_CSV_PATH

    if LAST_CSV_PATH is None:
        raise HTTPException(
            status_code=404,
            detail="No CSV has been generated yet."
        )

    if not LAST_CSV_PATH.exists():
        raise HTTPException(
            status_code=404,
            detail="CSV file not found."
        )

    return FileResponse(
        path=LAST_CSV_PATH,
        filename=LAST_CSV_PATH.name,
        media_type="text/csv",
    )