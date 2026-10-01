-- VibeSong AI — reference SQL schema (Postgres dialect).
-- Note: the FastAPI app creates these automatically via SQLAlchemy on startup (dev mode).
-- Use this file + Alembic migrations for production deployments.

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(64) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(120),
    is_active BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS songs (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    album VARCHAR(255),
    language VARCHAR(32) NOT NULL,
    genre VARCHAR(64),
    music_type VARCHAR(64),
    movie VARCHAR(255),
    composer VARCHAR(255),
    mood VARCHAR(64),
    energy VARCHAR(16),
    tempo VARCHAR(32),
    duration_sec INTEGER,
    release_year INTEGER,
    spotify_url VARCHAR(500),
    youtube_url VARCHAR(500),
    album_cover VARCHAR(500),
    preview_url VARCHAR(500),
    popularity FLOAT DEFAULT 0,
    created_at TIMESTAMP DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_songs_title ON songs (title);
CREATE INDEX IF NOT EXISTS idx_songs_artist ON songs (artist);
CREATE INDEX IF NOT EXISTS idx_songs_language ON songs (language);

CREATE TABLE IF NOT EXISTS uploads (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    file_path VARCHAR(500) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    content_type VARCHAR(64) NOT NULL,
    size_bytes INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS image_analyses (
    id UUID PRIMARY KEY,
    upload_id UUID UNIQUE NOT NULL REFERENCES uploads(id),
    mood VARCHAR(64),
    emotion VARCHAR(64),
    scene VARCHAR(120),
    location_type VARCHAR(120),
    lighting VARCHAR(64),
    weather VARCHAR(64),
    time_of_day VARCHAR(64),
    season VARCHAR(32),
    energy VARCHAR(16),
    aesthetic VARCHAR(120),
    festival VARCHAR(120),
    colors JSONB DEFAULT '[]',
    objects JSONB DEFAULT '[]',
    keywords JSONB DEFAULT '[]',
    nature_score INTEGER DEFAULT 0,
    urban_score INTEGER DEFAULT 0,
    romantic_score INTEGER DEFAULT 0,
    adventure_score INTEGER DEFAULT 0,
    party_score INTEGER DEFAULT 0,
    calm_score INTEGER DEFAULT 0,
    raw_json JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS recommendations (
    id UUID PRIMARY KEY,
    analysis_id UUID NOT NULL REFERENCES image_analyses(id),
    song_id UUID REFERENCES songs(id),
    rank INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    album VARCHAR(255),
    language VARCHAR(32),
    genre VARCHAR(64),
    music_type VARCHAR(64),
    movie VARCHAR(255),
    composer VARCHAR(255),
    mood VARCHAR(64),
    energy VARCHAR(16),
    tempo VARCHAR(32),
    reason VARCHAR(500),
    confidence FLOAT DEFAULT 0,
    spotify_url VARCHAR(500),
    youtube_url VARCHAR(500),
    album_cover VARCHAR(500),
    preview_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_recommendations_analysis ON recommendations (analysis_id);

CREATE TABLE IF NOT EXISTS playlists (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    name VARCHAR(120) NOT NULL,
    description VARCHAR(500),
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS playlist_songs (
    id UUID PRIMARY KEY,
    playlist_id UUID NOT NULL REFERENCES playlists(id),
    song_id UUID NOT NULL REFERENCES songs(id),
    position INTEGER DEFAULT 0,
    added_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS favorites (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    song_id UUID NOT NULL REFERENCES songs(id),
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS history (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    upload_id UUID NOT NULL REFERENCES uploads(id),
    analysis_id UUID REFERENCES image_analyses(id),
    action VARCHAR(32) DEFAULT 'recommendation_generated',
    created_at TIMESTAMP DEFAULT now()
);
