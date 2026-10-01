import { useState } from "react";
import LanguageSelector from "./LanguageSelector";
import GenreSelector from "./GenreSelector";

export default function RegisterForm({ onSubmit, submitting, error }) {
  // const [form, setForm] = useState({
  //   username: "",
  //   full_name: "",
  //   email: "",
  //   password: "",

  //   preferred_language: "",
  // });
  const [form, setForm] = useState({
    username: "",
    full_name: "",
    email: "",
    password: "",
    preferred_language: "",
  });
  const [genres, setGenres] = useState([]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleGenre = (genre) =>
    setGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, favorite_genres: genres });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label htmlFor="full_name">Full name</label>
      <input id="full_name" name="full_name" value={form.full_name} onChange={handleChange} required />

      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        value={form.username}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        autoComplete="email"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
        autoComplete="new-password"
        minLength={8}
      />

      <LanguageSelector value={form.preferred_language} onChange={handleChange} />
      <GenreSelector selected={genres} onToggle={toggleGenre} />

      {error && <p className="auth-error">{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
