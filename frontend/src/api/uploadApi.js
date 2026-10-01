import { extractPalette, loadImageElement } from '../utils/colorExtract'
import { buildImageAnalysis, buildRecommendations } from '../utils/mockEngine'

// In production this posts the image to the FastAPI backend, which forwards
// it to the AI Recommendation Engine (see docs/ai-recommendation-prompt.md)
// and returns the JSON schema documented there. Here, we simulate that
// round trip entirely client-side using real color/brightness analysis of
// the uploaded photo, so the UI and data contract are already production-shaped.
export async function analyzePhoto({ previewUrl, favoriteLanguage }) {
  const img = await loadImageElement(previewUrl)
  const { palette, primaryColors, secondaryColors, brightness, warmth } = extractPalette(img)

  // Simulated network + inference latency
  await new Promise((resolve) => setTimeout(resolve, 1800 + Math.random() * 900))

  const analysis = buildImageAnalysis({ palette, primaryColors, secondaryColors, brightness, warmth })
  const recommendations = buildRecommendations(analysis, favoriteLanguage)

  return { image_analysis: analysis, recommendations }
}
