const SCORE_LABELS = {
  nature: 'Nature',
  urban: 'Urban',
  romantic: 'Romantic',
  adventure: 'Adventure',
  party: 'Party',
  calm: 'Calm',
}

function ScoreBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-muted">{label}</span>
        <span className="font-mono text-teal">{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-surface2 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-amber to-teal rounded-full" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default function AnalysisPanel({ analysis }) {
  if (!analysis) return null

  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-6 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wider text-muted font-mono mb-2">Detected mood</p>
        <p className="font-display text-2xl text-balance">{analysis.mood}</p>
        <p className="text-sm text-muted mt-1">{analysis.scene} · {analysis.lighting} · {analysis.time_of_day}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {analysis.keywords.map((k) => (
          <span key={k} className="text-xs font-mono px-2.5 py-1 rounded-full border border-line text-muted">#{k}</span>
        ))}
      </div>

      <div className="flex gap-2">
        {analysis.primary_colors.map((c) => (
          <span key={c} className="w-8 h-8 rounded-full border border-line" style={{ backgroundColor: c }} title={c} />
        ))}
        {analysis.secondary_colors.map((c) => (
          <span key={c} className="w-8 h-8 rounded-full border border-line opacity-70" style={{ backgroundColor: c }} title={c} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-2">
        {Object.entries(analysis.scores).map(([key, value]) => (
          <ScoreBar key={key} label={SCORE_LABELS[key]} value={value} />
        ))}
      </div>
    </div>
  )
}
