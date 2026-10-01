from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_user
from app.database import get_db
from app.models.history import History
from app.models.user import User

router = APIRouter(prefix="/api/history", tags=["history"])


@router.get("")
async def list_history(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(History).where(History.user_id == user.id).order_by(History.created_at.desc()).limit(100)
    )
    items = result.scalars().all()
    return [
        {
            "id": h.id,
            "upload_id": h.upload_id,
            "analysis_id": h.analysis_id,
            "action": h.action,
            "created_at": h.created_at,
        }
        for h in items
    ]
