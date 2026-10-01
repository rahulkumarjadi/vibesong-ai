const GENRES = ["Pop", "Hip-Hop", "Rock", "Lo-fi", "EDM", "Classical", "Jazz", "R&B", "Indie"];

export default function GenreSelector({ selected, onToggle }) {
  return (
    <div className="field-group">
      <label>Favorite genres</label>
      <div className="genre-grid">
        {GENRES.map((genre) => (
          <button
            type="button"
            key={genre}
            className={`genre-chip ${selected.includes(genre) ? "active" : ""}`}
            onClick={() => onToggle(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}
