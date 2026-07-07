from pydantic import BaseModel
from typing import List, Optional


class DrawingMeta(BaseModel):
    drawing_no: str = ""
    revision: str = ""
    line_number: str = ""
    nps: str = ""
    material_class: str = ""
    service: str = ""


class MTOItem(BaseModel):
    item_no: str
    category: str
    description: str

    size_nps: str = ""
    schedule_rating: str = ""
    material_spec: str = ""
    end_type: str = ""

    quantity: float = 0
    unit: str = ""

    length_m: float | None = None
    confidence: float | None = None

    remarks: str = ""


class Summary(BaseModel):
    total_pipe_length_m: float = 0
    fittings: int = 0
    flanges: int = 0
    valves: int = 0
    gaskets: int = 0
    bolt_sets: int = 0
    field_welds: int = 0


class MTOResponse(BaseModel):
    drawing_meta: DrawingMeta
    items: List[MTOItem]
    summary: Summary