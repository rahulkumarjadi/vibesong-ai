from fastapi import APIRouter, Query
from app.services.youtube_service import search_youtube

router = APIRouter(prefix="/api/youtube", tags=["youtube"])

@router.get("/search")
async def youtube_search(
    title: str = Query(...),
    artist: str = Query(...)
):
    return await search_youtube(title, artist)