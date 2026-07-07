from pathlib import Path
import pandas as pd
from app.models.mto import MTOResponse

OUTPUT_DIR = Path("exports")
OUTPUT_DIR.mkdir(exist_ok=True)


def generate_csv(mto: MTOResponse) -> Path:

    rows = []

    for item in mto.items:

        rows.append(
            {
                "Item No": item.item_no,
                "Category": item.category,
                "Description": item.description,
                "Size": item.size_nps,
                "Schedule": item.schedule_rating,
                "Material": item.material_spec,
                "End Type": item.end_type,
                "Quantity": item.quantity,
                "Unit": item.unit,
                "Length (m)": item.length_m,
                "Confidence": item.confidence,
                "Remarks": item.remarks,
            }
        )

    df = pd.DataFrame(rows)

    csv_path = OUTPUT_DIR / "mto.csv"

    df.to_csv(csv_path, index=False)

    return csv_path