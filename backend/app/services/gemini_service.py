from pathlib import Path
from google.genai import types
from app.prompts.extraction_prompt import EXTRACTION_PROMPT
from google import genai
import json
from app.core.config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)


def test_connection():
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Say only the word Connected."
    )

    return response.text

def extract_mto_from_image(image_path: Path):
    image_bytes = image_path.read_bytes()
    response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[
        EXTRACTION_PROMPT,
        types.Part.from_bytes(
            data=image_bytes,
            mime_type="image/png",
        ),
    ],
    config=types.GenerateContentConfig(
        response_mime_type="application/json"
    )
)
    if response.text is None:
       raise ValueError("Gemini returned an empty response.")

    return json.loads(response.text)