# from typing import Optional
# from uuid import UUID

# from pydantic import BaseModel, EmailStr


# class UserOut(BaseModel):
#     id: UUID
#     email: EmailStr
#     full_name: Optional[str] = None
#     preferred_language: Optional[str] = None
#     favorite_genres: Optional[str] = None
#     is_active: bool
#     is_verified: bool

#     class Config:
#         from_attributes = True


from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr


# ---------- Register ----------
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    full_name: Optional[str] = None
    preferred_language: Optional[str] = None
    favorite_genres: Optional[list[str]] = None


# ---------- Login ----------

class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ---------- Response ----------

class UserOut(BaseModel):
    id: UUID
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    preferred_language: Optional[str] = None
    favorite_genres: Optional[str] = None
    is_active: bool
    is_verified: bool

    class Config:
        from_attributes = True


# ---------- JWT Token ----------

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


# ---------- Refresh Token ----------

class TokenRefreshRequest(BaseModel):
    refresh_token: str
