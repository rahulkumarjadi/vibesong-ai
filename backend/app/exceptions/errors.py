class VibeSongError(Exception):
    """Base application error."""


class AIProviderError(VibeSongError):
    """Raised when the AI provider (Anthropic) call fails or is misconfigured."""


class AIResponseParseError(VibeSongError):
    """Raised when the AI model's response cannot be parsed into the expected JSON shape."""


class InvalidImageError(VibeSongError):
    """Raised when an uploaded file is not a supported/valid image."""


class NotFoundError(VibeSongError):
    """Raised when a requested resource does not exist."""
