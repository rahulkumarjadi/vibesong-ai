export default function FilterChips({ options, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors
            ${active === opt
              ? 'bg-amber text-void border-amber'
              : 'border-line text-muted hover:text-ink hover:border-ink/30'}`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
