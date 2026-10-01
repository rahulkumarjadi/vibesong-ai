const LANGUAGES = ["English", "Hindi", "Spanish", "French", "Telugu", "Tamil", "Korean", "Japanese"];

export default function LanguageSelector({ value, onChange }) {
  return (
    <div className="field-group">
      <label htmlFor="preferred_language">Preferred language</label>
      <select id="preferred_language" name="preferred_language" value={value} onChange={onChange}>
        <option value="">Select a language</option>
        {LANGUAGES.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}
