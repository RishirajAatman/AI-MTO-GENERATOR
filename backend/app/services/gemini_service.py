from pathlib import Path
import json

from google import genai
from google.genai import types

from app.core.config import GEMINI_API_KEY
from app.prompts.extraction_prompt import EXTRACTION_PROMPT


def get_client():
    if not GEMINI_API_KEY:
        raise ValueError("Gemini API key not configured.")

    return genai.Client(api_key=GEMINI_API_KEY)


def test_connection():
    client = get_client()

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Say only the word Connected."
    )

    return response.text


def extract_mto_from_image(image_path: Path):
    client = get_client()

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
        ),
    )

    if response.text is None:
        raise ValueError("Gemini returned an empty response.")

    return json.loads(response.text)