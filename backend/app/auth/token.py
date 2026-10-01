"""Token pair helper + refresh-token rotation logic."""
from dataclasses import dataclass

from app.auth.jwt import create_access_token, create_refresh_token, decode_token


@dataclass
class TokenPair:
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


def issue_token_pair(user_id: str) -> TokenPair:
    return TokenPair(
        access_token=create_access_token(user_id),
        refresh_token=create_refresh_token(user_id),
    )


def refresh_access_token(refresh_token: str) -> TokenPair:
    payload = decode_token(refresh_token)
    if payload.get("type") != "refresh":
        raise ValueError("Provided token is not a refresh token")
    user_id = payload["sub"]
    return issue_token_pair(user_id)
