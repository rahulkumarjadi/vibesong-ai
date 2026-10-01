import uuid
from pathlib import Path

from fastapi import UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.exceptions.errors import InvalidImageError
from app.models.upload import Upload

ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"}


async def save_upload(db: AsyncSession, user_id: str, file: UploadFile) -> Upload:
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise InvalidImageError(f"Unsupported file type: {file.content_type}")

    contents = await file.read()
    max_bytes = settings.MAX_UPLOAD_MB * 1024 * 1024
    if len(contents) > max_bytes:
        raise InvalidImageError(f"File exceeds max size of {settings.MAX_UPLOAD_MB}MB")

    upload_dir = Path(settings.UPLOAD_DIR)
    upload_dir.mkdir(parents=True, exist_ok=True)

    ext = Path(file.filename or "image.jpg").suffix or ".jpg"
    stored_name = f"{uuid.uuid4()}{ext}"
    dest_path = upload_dir / stored_name
    dest_path.write_bytes(contents)

    upload = Upload(
        user_id=user_id,
        file_path=str(dest_path),
        original_filename=file.filename or stored_name,
        content_type=file.content_type,
        size_bytes=len(contents),
    )
    db.add(upload)
    await db.commit()
    await db.refresh(upload)
    return upload
