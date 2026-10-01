import MainLayout from '../layouts/MainLayout.jsx'
import VibeWaveform from '../components/VibeWaveform.jsx'

export default function About() {
  return (
    <MainLayout>
      <section className="max-w-2xl pt-12">
        <h1 className="font-display text-4xl mb-6">How VibeSong reads a photo</h1>
        <VibeWaveform />
        <div className="mt-8 space-y-5 text-muted leading-relaxed">
          <p>
            Every photo carries a mood before you even name it — the temperature of the light,
            how crowded or empty the frame is, whether the color leans warm or cool. VibeSong AI
            turns those signals into a soundtrack.
          </p>
          <p>
            Once uploaded, the image is analyzed for mood, emotion, scene, lighting, weather,
            time of day, and dominant colors. Those signals are weighted against a catalog
            spanning Telugu, Hindi, English, Tamil, Kannada, Malayalam, Punjabi, Japanese, and
            Korean — across genres from devotional to lo-fi to movie BGMs — to return 20 ranked
            tracks with a confidence score for each.
          </p>
          <p>
            Nothing you upload is stored. The analysis happens for the length of your session only.
          </p>
        </div>
      </section>
    </MainLayout>
  )
}
