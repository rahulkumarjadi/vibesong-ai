// Extracts dominant colors, average brightness, and warmth from an image
// using a downsampled canvas read. Runs entirely client-side.

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  const d = max - min
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1))
    switch (max) {
      case r: h = 60 * (((g - b) / d) % 6); break
      case g: h = 60 * ((b - r) / d + 2); break
      case b: h = 60 * ((r - g) / d + 4); break
      default: break
    }
  }
  if (h < 0) h += 360
  return { h, s, l }
}

export function extractPalette(imgEl, sampleSize = 48) {
  const canvas = document.createElement('canvas')
  canvas.width = sampleSize
  canvas.height = sampleSize
  const ctx = canvas.getContext('2d')
  ctx.drawImage(imgEl, 0, 0, sampleSize, sampleSize)
  const { data } = ctx.getImageData(0, 0, sampleSize, sampleSize)

  const buckets = {}
  let totalBrightness = 0
  let totalWarmth = 0
  const pixelCount = data.length / 4

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const bucketKey = `${Math.round(r / 32)}-${Math.round(g / 32)}-${Math.round(b / 32)}`
    buckets[bucketKey] = buckets[bucketKey] || { r: 0, g: 0, b: 0, count: 0 }
    buckets[bucketKey].r += r
    buckets[bucketKey].g += g
    buckets[bucketKey].b += b
    buckets[bucketKey].count += 1

    totalBrightness += (r * 0.299 + g * 0.587 + b * 0.114)
    totalWarmth += (r - b)
  }

  const sorted = Object.values(buckets)
    .map((bkt) => ({ r: Math.round(bkt.r / bkt.count), g: Math.round(bkt.g / bkt.count), b: Math.round(bkt.b / bkt.count), count: bkt.count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const toHex = (r, g, b) => `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`

  const palette = sorted.map((c) => ({
    hex: toHex(c.r, c.g, c.b),
    ...rgbToHsl(c.r, c.g, c.b),
  }))

  return {
    palette,
    primaryColors: palette.slice(0, 2).map((c) => c.hex),
    secondaryColors: palette.slice(2, 4).map((c) => c.hex),
    brightness: totalBrightness / pixelCount, // 0-255
    warmth: totalWarmth / pixelCount, // negative = cool, positive = warm
  }
}

export function loadImageElement(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}
