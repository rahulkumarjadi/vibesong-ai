"""
Wraps the Anthropic API call that performs the actual image -> JSON analysis pass.
"""
import base64
import json
import mimetypes
from pathlib import Path

from anthropic import AsyncAnthropic

from app.config import settings
from app.ai.prompt_builder import build_system_prompt
from app.exceptions.errors import AIProviderError, AIResponseParseError

_client: AsyncAnthropic | None = None


def get_client() -> AsyncAnthropic:
    global _client
    if _client is None:
        if not settings.ANTHROPIC_API_KEY:
            raise AIProviderError("ANTHROPIC_API_KEY is not configured on the server.")
        _client = AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)
    return _client


def _encode_image(file_path: str) -> tuple[str, str]:
    media_type = mimetypes.guess_type(file_path)[0] or "image/jpeg"
    data = Path(file_path).read_bytes()
    return base64.standard_b64encode(data).decode("utf-8"), media_type


def _extract_json(raw_text: str) -> dict:
    text = raw_text.strip()
    # Defensive: strip stray code fences if the model adds them despite instructions.
    if text.startswith("```"):
        text = text.strip("`")
        if text.lower().startswith("json"):
            text = text[4:]
    start = text.find("{")
    end = text.rfind("}")
    if start == -1 or end == -1:
        raise AIResponseParseError("Model response did not contain a JSON object.")
    try:
        return json.loads(text[start : end + 1])
    except json.JSONDecodeError as exc:
        raise AIResponseParseError(f"Failed to parse model JSON: {exc}") from exc


async def analyze_image_and_recommend(file_path: str) -> dict:
    """
    Sends the image to Claude with the VibeSong system prompt and returns the parsed
    {image_analysis, recommendations} payload.
    """
    client = get_client()
    image_b64, media_type = _encode_image(file_path)

    response = await client.messages.create(
        model=settings.CLAUDE_MODEL,
        max_tokens=4096,
        system=build_system_prompt(),
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {"type": "base64", "media_type": media_type, "data": image_b64},
                    },
                    {
                        "type": "text",
                        "text": "Analyze this image and return the VibeSong AI JSON recommendation payload.",
                    },
                ],
            }
        ],
    )

    text_blocks = [block.text for block in response.content if getattr(block, "type", None) == "text"]
    if not text_blocks:
        raise AIProviderError("The AI model returned no text content.")

    return _extract_json("".join(text_blocks))
