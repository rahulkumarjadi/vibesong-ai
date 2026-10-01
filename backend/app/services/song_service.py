from sqlalchemy import select, or_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.song import Song


async def search_songs(
    db: AsyncSession,
    query: str | None = None,
    language: str | None = None,
    genre: str | None = None,
    music_type: str | None = None,
    limit: int = 50,
    offset: int = 0,
) -> list[Song]:
    stmt = select(Song)

    if query:
        like = f"%{query}%"
        stmt = stmt.where(or_(Song.title.ilike(like), Song.artist.ilike(like), Song.movie.ilike(like)))
    if language:
        stmt = stmt.where(Song.language == language)
    if genre:
        stmt = stmt.where(Song.genre == genre)
    if music_type:
        stmt = stmt.where(Song.music_type == music_type)

    stmt = stmt.order_by(Song.popularity.desc()).offset(offset).limit(limit)
    result = await db.execute(stmt)
    return list(result.scalars().all())
