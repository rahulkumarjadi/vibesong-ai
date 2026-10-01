import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import MainLayout from '../layouts/MainLayout.jsx'
import AnalyzingState from '../components/AnalyzingState.jsx'
import AnalysisPanel from '../components/AnalysisPanel.jsx'
import SongCard from '../components/SongCard.jsx'
import FilterChips from '../components/FilterChips.jsx'
import VibeWaveform from '../components/VibeWaveform.jsx'
import { useVibeStore } from '../store/vibeStore'
import { analyzePhoto } from '../api/uploadApi'

const LANG_FILTERS = ['All', 'Telugu', 'Hindi', 'English', 'Tamil', 'Kannada', 'Malayalam', 'Punjabi', 'Japanese', 'Korean']

export default function Results() {
  const navigate = useNavigate()
  const { photo, favoriteLanguage, languageFilter, setLanguageFilter } = useVibeStore()

  useEffect(() => {
    if (!photo) navigate('/')
  }, [photo, navigate])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['analyze', photo?.previewUrl, favoriteLanguage],
    queryFn: () => analyzePhoto({ previewUrl: photo.previewUrl, favoriteLanguage }),
    enabled: !!photo,
    staleTime: Infinity,
  })

  const filtered = useMemo(() => {
    if (!data) return []
    if (languageFilter === 'All') return data.recommendations
    return data.recommendations.filter((s) => s.language === languageFilter)
  }, [data, languageFilter])

  if (!photo) return null

  return (
    <MainLayout>
      {isLoading && <AnalyzingState preview={photo.previewUrl} />}

      {isError && (
        <div className="py-24 text-center">
          <p className="text-muted">Something went wrong analyzing that photo.</p>
          <button onClick={() => navigate('/')} className="mt-4 text-amber underline">Try another photo</button>
        </div>
      )}

      {data && (
        <div className="pt-10">
          <div className="flex items-center gap-3 mb-8">
            <VibeWaveform
              size="sm"
              colors={[...data.image_analysis.primary_colors, ...data.image_analysis.secondary_colors]}
              animated={false}
            />
            <h1 className="font-display text-3xl">Your soundtrack is ready</h1>
          </div>

          <div className="grid lg:grid-cols-[320px_1fr] gap-8">
            <div className="lg:sticky lg:top-8 self-start space-y-6">
              <div className="rounded-2xl overflow-hidden border border-line">
                <img src={photo.previewUrl} alt="Uploaded" className="w-full h-56 object-cover" />
              </div>
              <AnalysisPanel analysis={data.image_analysis} />
              <button
                onClick={() => navigate('/')}
                className="w-full text-sm text-muted hover:text-ink border border-line rounded-full py-2.5 transition-colors"
              >
                Try a different photo
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
                <FilterChips options={LANG_FILTERS} active={languageFilter} onChange={setLanguageFilter} />
                <span className="text-xs font-mono text-muted">{filtered.length} tracks</span>
              </div>

              <div className="space-y-2">
                {filtered.map((song, i) => (
                  <SongCard key={song.title} song={song} index={i} />
                ))}
                {filtered.length === 0 && (
                  <p className="text-muted text-sm py-10 text-center">No tracks match this filter yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}
