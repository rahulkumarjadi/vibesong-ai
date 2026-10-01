"""Google OAuth2 login support (verifies Google ID tokens)."""
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token

from app.core.config import settings  # expects GOOGLE_CLIENT_ID


class GoogleAuthError(Exception):
    pass


def verify_google_token(id_token_str: str) -> dict:
    """Verify a Google-issued ID token and return the user's profile claims."""
    try:
        claims = id_token.verify_oauth2_token(
            id_token_str, google_requests.Request(), settings.GOOGLE_CLIENT_ID
        )
    except ValueError as exc:
        raise GoogleAuthError("Invalid Google token") from exc

    if claims.get("iss") not in ("accounts.google.com", "https://accounts.google.com"):
        raise GoogleAuthError("Invalid token issuer")

    return {
        "email": claims["email"],
        "email_verified": claims.get("email_verified", False),
        "name": claims.get("name"),
        "picture": claims.get("picture"),
        "google_id": claims["sub"],
    }
