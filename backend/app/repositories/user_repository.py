"""Data-access layer for User records."""
from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session  # your async session factory
from app.models.user import User


class UserRepository:
    def __init__(self, session: AsyncSession | None = None):
        self._session = session

    async def _get_session(self) -> AsyncSession:
        if self._session:
            return self._session
        async for session in get_session():
            return session

    async def get_by_id(self, user_id: str) -> Optional[User]:
        session = await self._get_session()
        result = await session.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> Optional[User]:
        session = await self._get_session()
        result = await session.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()

    async def get_by_google_id(self, google_id: str) -> Optional[User]:
        session = await self._get_session()
        result = await session.execute(select(User).where(User.google_id == google_id))
        return result.scalar_one_or_none()

    async def create(self, **fields) -> User:
        session = await self._get_session()
        user = User(**fields)
        session.add(user)
        await session.commit()
        await session.refresh(user)
        return user

    async def update_password(self, user: User, hashed_password: str) -> User:
        session = await self._get_session()
        user.hashed_password = hashed_password
        await session.commit()
        await session.refresh(user)
        return user
