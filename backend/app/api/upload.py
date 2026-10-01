from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_user
from app.database import get_db
from app.exceptions.errors import InvalidImageError
from app.models.user import User
from app.schemas.upload import UploadOut
from app.services.upload_service import save_upload

router = APIRouter(prefix="/api/upload", tags=["upload"])


@router.post("", response_model=UploadOut, status_code=201)
async def upload_image(
    file: UploadFile = File(...),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    try:
        upload = await save_upload(db, user.id, file)
    except InvalidImageError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return upload
