"""Business logic for registration, login, password reset, and Google OAuth."""
from datetime import datetime, timedelta, timezone

from fastapi import HTTPException, status

from app.auth.hashing import hash_password, verify_password
from app.auth.jwt import create_access_token, decode_token
from app.auth.oauth import GoogleAuthError, verify_google_token
from app.auth.token import TokenPair, issue_token_pair
from app.repositories.user_repository import UserRepository
from app.schemas.register import RegisterRequest


class AuthService:
    def __init__(self, repo: UserRepository | None = None):
        self.repo = repo or UserRepository()

    async def register(self, data: RegisterRequest) -> TokenPair:
        existing = await self.repo.get_by_email(data.email)
        if existing:
            raise HTTPException(status.HTTP_409_CONFLICT, "Email already registered")

        user = await self.repo.create(
            email=data.email,
            hashed_password=hash_password(data.password),
            full_name=data.full_name,
            preferred_language=data.preferred_language,
            favorite_genres=",".join(data.favorite_genres) if data.favorite_genres else None,
        )
        return issue_token_pair(str(user.id))

    async def login(self, email: str, password: str) -> TokenPair:
        user = await self.repo.get_by_email(email)
        if not user or not user.hashed_password or not verify_password(password, user.hashed_password):
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Incorrect email or password")
        if not user.is_active:
            raise HTTPException(status.HTTP_403_FORBIDDEN, "Account disabled")
        return issue_token_pair(str(user.id))

    async def login_with_google(self, id_token_str: str) -> TokenPair:
        try:
            profile = verify_google_token(id_token_str)
        except GoogleAuthError as exc:
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, str(exc)) from exc

        user = await self.repo.get_by_google_id(profile["google_id"])
        if not user:
            user = await self.repo.get_by_email(profile["email"])
        if not user:
            user = await self.repo.create(
                email=profile["email"],
                full_name=profile.get("name"),
                google_id=profile["google_id"],
                is_verified=profile.get("email_verified", False),
            )
        return issue_token_pair(str(user.id))

    async def request_password_reset(self, email: str) -> str | None:
        """Returns a short-lived reset token if the user exists (send via email)."""
        user = await self.repo.get_by_email(email)
        if not user:
            # Do not reveal whether the email exists.
            return None
        return create_access_token(str(user.id), extra_claims={"purpose": "password_reset"})

    async def reset_password(self, token: str, new_password: str) -> None:
        try:
            payload = decode_token(token)
        except ValueError as exc:
            raise HTTPException(status.HTTP_400_BAD_REQUEST, "Invalid or expired reset token") from exc

        if payload.get("purpose") != "password_reset":
            raise HTTPException(status.HTTP_400_BAD_REQUEST, "Invalid reset token")

        user = await self.repo.get_by_id(payload["sub"])
        if not user:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")

        await self.repo.update_password(user, hash_password(new_password))
