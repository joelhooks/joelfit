import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
 
export const runtime = 'edge'

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
const USE_CLOUDINARY = process.env.USE_CLOUDINARY === 'true'

// Font files in public/fonts directory
const geistRegular = fetch(
  new URL('../../../public/fonts/Geist-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

const geistBold = fetch(
  new URL('../../../public/fonts/Geist-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

type ColorPair = [string, string]

// Define base colors with opacity variations
const BASE_COLORS = {
  // Pinks & Purples
  hotPink: '#FF0080',
  neonPink: '#FF1493',
  deepPurple: '#7928CA',
  electricPurple: '#9D00FF',
  
  // Blues & Cyans
  electricBlue: '#0070F3',
  neonBlue: '#00C8FF',
  cyan: '#00DFD8',
  lightCyan: '#00FFF5',
  
  // Greens
  neonGreen: '#39FF14',
  toxicGreen: '#50FA7B',
  limeGreen: '#CCFF00',
  
  // Oranges & Reds
  neonOrange: '#FF3300',
  neonRed: '#FF0044',
  crimson: '#990000',
  
  // Accent colors
  white: '#FFFFFF',
  black: '#000000',
} as const

function generateColorPalettes(rng: SeededRandom): ColorPair[] {
  const addOpacity = (color: string, opacity: number) => {
    return `${color}${Math.floor(opacity * 99).toString(16).padStart(2, '0')}`
  }

  // Define color combination patterns
  const palettes: ColorPair[] = [
    // Cyberpunk pink-purple
    [addOpacity(BASE_COLORS.hotPink, 0.6), addOpacity(BASE_COLORS.deepPurple, 0.4)],
    [addOpacity(BASE_COLORS.neonPink, 0.6), addOpacity(BASE_COLORS.electricPurple, 0.4)],
    
    // Electric blue-cyan
    [addOpacity(BASE_COLORS.electricBlue, 0.6), addOpacity(BASE_COLORS.cyan, 0.4)],
    [addOpacity(BASE_COLORS.neonBlue, 0.6), addOpacity(BASE_COLORS.lightCyan, 0.4)],
    
    // Toxic green
    [addOpacity(BASE_COLORS.neonGreen, 0.6), addOpacity(BASE_COLORS.toxicGreen, 0.4)],
    [addOpacity(BASE_COLORS.toxicGreen, 0.6), addOpacity(BASE_COLORS.limeGreen, 0.4)],
    
    // Fire orange-red
    [addOpacity(BASE_COLORS.neonOrange, 0.6), addOpacity(BASE_COLORS.neonRed, 0.4)],
    [addOpacity(BASE_COLORS.crimson, 0.6), addOpacity(BASE_COLORS.neonOrange, 0.4)],
    
    // Cross-family combinations
    [addOpacity(BASE_COLORS.hotPink, 0.6), addOpacity(BASE_COLORS.electricBlue, 0.4)],
    [addOpacity(BASE_COLORS.neonBlue, 0.6), addOpacity(BASE_COLORS.toxicGreen, 0.4)],
    [addOpacity(BASE_COLORS.neonPink, 0.6), addOpacity(BASE_COLORS.cyan, 0.4)],
    [addOpacity(BASE_COLORS.electricPurple, 0.6), addOpacity(BASE_COLORS.neonGreen, 0.4)],
    [addOpacity(BASE_COLORS.neonOrange, 0.6), addOpacity(BASE_COLORS.electricBlue, 0.4)],
    [addOpacity(BASE_COLORS.crimson, 0.6), addOpacity(BASE_COLORS.deepPurple, 0.4)],
  ]

  // Shuffle the palettes based on the seed
  for (let i = palettes.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1))
    ;[palettes[i], palettes[j]] = [palettes[j]!, palettes[i]!]
  }

  // Return first 5 palettes after shuffle
  return palettes.slice(0, 5)
}

// Replace static COLORS with seeded generation
function getColors(rng: SeededRandom): ColorPair[] {
  return generateColorPalettes(rng)
}

class SeededRandom {
  private seed: number
  
  constructor(seed: number) {
    this.seed = seed
  }
  
  // Returns number between 0 and 1
  next(): number {
    const x = Math.sin(this.seed++) * 10000
    return x - Math.floor(x)
  }
  
  // Returns number between min and max
  range(min: number, max: number): number {
    return min + this.next() * (max - min)
  }
  
  // Returns true with probability p
  chance(p: number): boolean {
    return this.next() < p
  }
  
  // Pick random item from array
  pick<T>(array: T[]): T {
    return array[Math.floor(this.next() * array.length)]!
  }
}

function generateVoronoiPath(width: number, height: number, rng: SeededRandom) {
  const paths: Array<{ 
    path: string; 
    colors: string[]; 
    rotation: number;
    size: number;
    glow: number;
  }> = []
  
  // Reduce to just 2 shapes for main aesthetic
  const points = Array.from({ length: 2 }, (_, i) => {
    const baseX = rng.range(-width * 0.5, width * 0.5)
    const baseY = rng.range(-height * 0.5, height * 0.5)
    const colors = rng.pick(getColors(rng))
    
    return {
      x: baseX,
      y: baseY,
      colors,
      size: i === 0 ? 4 + rng.range(0, 5) : 0.8 + rng.range(0, 1.2),
      distortion: i === 0 ? 200 : 50,
      complexity: i === 0 ? 8 : 12,
      rotation: rng.next() * Math.PI * 2,
      glow: i === 0 ? 0.9 : 0.5,
    }
  })

  points.forEach(point => {
    const basePoints: Array<{x: number, y: number}> = []
    
    // Simplified polygon generation
    for (let angle = 0; angle < 360; angle += point.complexity) {
      const radian = (angle * Math.PI) / 180
      const radius = (400 + rng.range(0, 300)) * point.size
      
      const baseX = point.x + radius * Math.cos(radian)
      const baseY = point.y + radius * Math.sin(radian)
      basePoints.push({ x: baseX, y: baseY })
    }

    // Create smooth path
    const path = `M${basePoints[0]!.x},${basePoints[0]!.y}` + 
      basePoints.slice(1).map(p => `L${p.x},${p.y}`).join('') + 'Z'
    
    paths.push({ 
      path,
      colors: point.colors,
      rotation: point.rotation,
      size: point.size,
      glow: point.glow,
    })
  })
  
  return paths
}

function generateShatteredLines(width: number, height: number, rng: SeededRandom) {
  const lines: Array<{path: string, opacity: number, width: number}> = []
  const numLines = 15 // Fewer lines
  
  const anchors = Array.from({ length: 4 }, () => ({ // Fewer anchor points
    x: rng.range(-width, width),
    y: rng.range(-height, height),
    influence: 0.3 + rng.range(0, 0.7)
  }))
  
  for (let i = 0; i < numLines; i++) {
    const start = anchors[Math.floor(rng.next() * anchors.length)]!
    let path = `M${start.x},${start.y}`
    
    // Simpler line generation
    const segments = 2
    let currentPoint = { x: start.x, y: start.y }
    
    for (let j = 0; j < segments; j++) {
      const angle = Math.atan2(
        anchors[(j + 1) % anchors.length]!.y - currentPoint.y,
        anchors[(j + 1) % anchors.length]!.x - currentPoint.x
      )
      const length = 300 + rng.range(0, 300)
      
      const endX = currentPoint.x + Math.cos(angle) * length
      const endY = currentPoint.y + Math.sin(angle) * length
      
      path += ` L${endX},${endY}`
      currentPoint = { x: endX, y: endY }
    }
    
    lines.push({
      path,
      opacity: 0.1 + rng.range(0, 0.3),
      width: 1 + rng.range(0, 2)
    })
  }
  
  return lines
}

function generateDistortedGrid(width: number, height: number, rng: SeededRandom) {
  const gridSize = 50 // Larger grid size = fewer lines
  const paths: Array<{ path: string; thickness: number }> = []
  
  // Reduce number of distortion points
  const distortionPoints = Array.from({ length: 3 }, () => ({
    x: rng.range(-width, width),
    y: rng.range(-height, height),
    radius: 200 + rng.range(0, 300),
    strength: 1 + rng.range(0, 2)
  }))

  // Generate fewer grid lines
  for (let x = -width; x <= width; x += gridSize * 2) {
    let path = `M${x},${-height}`
    for (let y = -height; y <= height; y += gridSize) {
      let distortedX = x
      
      distortionPoints.forEach(point => {
        const dx = x - point.x
        const dy = y - point.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - distance / point.radius)
        distortedX += dx * influence * point.strength
      })
      
      path += ` L${distortedX},${y}`
    }
    paths.push({ path, thickness: 1 })
  }

  // Fewer horizontal lines
  for (let y = -height; y <= height; y += gridSize * 2) {
    let path = `M${-width},${y}`
    for (let x = -width; x <= width; x += gridSize) {
      let distortedY = y
      
      distortionPoints.forEach(point => {
        const dx = x - point.x
        const dy = y - point.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - distance / point.radius)
        distortedY += dy * influence * point.strength
      })
      
      path += ` L${x},${distortedY}`
    }
    paths.push({ path, thickness: 1 })
  }
  
  return paths
}

function generateStarfield(width: number, height: number, rng: SeededRandom) {
  const stars: Array<{
    path: string,
    opacity: number,
    size: number
  }> = []
  
  const numStars = 30 // Fewer stars
  
  for (let i = 0; i < numStars; i++) {
    const x = rng.range(-width, width)
    const y = rng.range(-height, height)
    const size = rng.chance(0.9) ? 2 : 4
    const opacity = 0.15 + rng.next() * 0.35
    
    // Simpler star shape
    const path = `M${x-size},${y} L${x+size},${y} M${x},${y-size} L${x},${y+size}`
    
    stars.push({ path, opacity, size })
  }
  
  return stars
}

function generateTechnicalRings(width: number, height: number, rng: SeededRandom) {
  const rings: Array<{
    path: string,
    strokeColor: string,
    strokeWidth: number,
    dashArray?: string
  }> = []

  // Fewer rings
  const numRings = 3
  const centerX = rng.range(-width * 0.3, width * 0.3)
  const centerY = rng.range(-height * 0.3, height * 0.3)
  
  for (let i = 0; i < numRings; i++) {
    const radius = 200 + i * 100
    rings.push({
      path: `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 1 0 ${centerX + radius} ${centerY}`,
      strokeColor: `rgba(255,255,255,${0.1 + i * 0.1})`,
      strokeWidth: 1.5,
      dashArray: i === 1 ? '8,8' : undefined
    })
  }
  
  return rings
}

function generateSwooshes(width: number, height: number, rng: SeededRandom) {
  const swooshes: Array<{
    path: string,
    gradient: [string, string],
    opacity: number
  }> = []

  // Just 2 swooshes
  const numSwooshes = 2
  const colors = getColors(rng)

  for (let i = 0; i < numSwooshes; i++) {
    const startX = rng.range(-width * 0.5, width * 0.5)
    const startY = rng.range(-height * 0.5, height * 0.5)
    
    // Simpler curve
    const endX = startX + rng.range(-width * 0.3, width * 0.3)
    const endY = startY + rng.range(-height * 0.3, height * 0.3)
    const controlX = (startX + endX) / 2 + rng.range(-200, 200)
    const controlY = (startY + endY) / 2 + rng.range(-200, 200)
    
    const path = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`

    swooshes.push({
      path,
      gradient: rng.pick(colors),
      opacity: 0.5 + rng.next() * 0.4
    })
  }

  return swooshes
}

function getDailySeed(str: string): number {
  // Get current date in YYYY-MM-DD format
  const date = new Date()
  const dateStr = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`
  
  // Combine title with date for daily variation
  const combined = `${str}-${dateStr}`
  
  // Generate hash from combined string
  let hash = 0
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

export async function GET(req: NextRequest): Promise<ImageResponse> {
  try {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get('title')?.slice(0, 150) || 'JoelFit'
    const description = searchParams.get('description')?.slice(0, 250) || 'a personal health & fitness framework'
    
    const publicId = `og-images/${Buffer.from(title + description).toString('base64').slice(0, 50)}`
    
    if (USE_CLOUDINARY) {
      const cloudinaryUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${publicId}.png`
      const cloudinaryResponse = await fetch(cloudinaryUrl, { method: 'HEAD' })
      
      if (cloudinaryResponse.ok) {
        return new Response(null, {
          status: 302,
          headers: {
            'Location': cloudinaryUrl,
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=60'
          }
        })
      }
    }
    
    // Generate the image if not found in Cloudinary
    const [geistRegularData, geistBoldData] = await Promise.all([
      geistRegular,
      geistBold,
    ])
    
    const seed = getDailySeed(title)
    const rng = new SeededRandom(seed)
    
    // Calculate dynamic font size based on title length
    const titleFontSize = Math.max(
      40, // minimum size
      title.length > 50 
        ? 48 // long titles
        : title.length > 25 
          ? 56 // medium titles
          : 72 // short titles
    )
    
    // Calculate description font size
    const descFontSize = Math.max(
      24, // minimum size
      description.length > 100 
        ? 26 
        : description.length > 50 
          ? 28 
          : 32
    )
    
    const width = 1200
    const height = 630
    const voronoiPaths = generateVoronoiPath(width, height, rng)
    const shatteredLines = generateShatteredLines(width, height, rng)
    const gridPaths = generateDistortedGrid(width, height, rng)
    const starfield = generateStarfield(width, height, rng)
    const technicalRings = generateTechnicalRings(width, height, rng)
    const swooshes = generateSwooshes(width, height, rng)
 
    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
            fontFamily: 'Geist',
            overflow: 'hidden',
          }}
        >
          {/* Generative Background */}
          <svg
            width="100%"
            height="100%"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 0,
            }}
            viewBox={`${-width * 0.5} ${-height * 0.5} ${width * 2} ${height * 2}`}
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {voronoiPaths.map((path, i) => (
                <linearGradient
                  key={`grad-${i}`}
                  id={`grad-${i}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                  gradientTransform={`rotate(${(path.rotation * 180) / Math.PI}, 0.5, 0.5)`}
                >
                  <stop offset="0%" style={{ stopColor: path.colors[0], stopOpacity: 0.8 }} />
                  <stop offset="50%" style={{ stopColor: path.colors[1], stopOpacity: 0.5 }} />
                  <stop offset="100%" style={{ stopColor: path.colors[0], stopOpacity: 0.3 }} />
                </linearGradient>
              ))}
              <filter id="noise" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" result="noise"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0  0 0 0 0 0  0 0 0 0.1 0"/>
              </filter>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              {/* Glitch effects for text */}
              <filter id="glitch">
                {/* RGB split */}
                <feOffset in="SourceGraphic" dx="2" dy="0" result="red">
                  <feColorMatrix values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
                </feOffset>
                <feOffset in="SourceGraphic" dx="-2" dy="0" result="cyan">
                  <feColorMatrix values="0 0 0 0 0  0 1 0 0 1  0 0 1 0 0  0 0 0 1 0"/>
                </feOffset>
                <feMerge>
                  <feMergeNode in="red"/>
                  <feMergeNode in="cyan"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Digital noise */}
              <filter id="noise-rough">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" seed="1" stitchTiles="stitch"/>
                <feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0  0 0 0 0 1  0 0 0 0.5 0"/>
                <feBlend mode="overlay"/>
              </filter>

              {/* Scanlines */}
              <pattern id="scanlines" patternUnits="userSpaceOnUse" width="4" height="4">
                <rect width="100%" height="1" fill="rgba(255,255,255,0.1)"/>
                <rect y="2" width="100%" height="1" fill="rgba(0,0,0,0.2)"/>
              </pattern>

              {/* Combined text effects */}
              <filter id="cyberpunk">
                <feFlood floodColor="#FF0080" floodOpacity="0.2" result="flood"/>
                <feComposite operator="in" in="flood" in2="SourceGraphic"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
                <feGaussianBlur stdDeviation="0.5" result="blur"/>
                <feMorphology operator="dilate" radius="1" result="spread"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="spread"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Base black background */}
            <rect 
              x={-width * 0.5} 
              y={-height * 0.5} 
              width={width * 2} 
              height={height * 2} 
              fill="#000000" 
            />
            
            {/* Voronoi shapes with enhanced effects */}
            <g style={{ mixBlendMode: 'screen' }}>
              {voronoiPaths.map((path, i) => (
                <g key={i}>
                  {/* Glow layer */}
                  <path
                    d={path.path}
                    fill={`url(#grad-${i})`}
                    filter="url(#glow)"
                    style={{ opacity: path.glow * 0.5 }}
                  />
                  {/* Main shape */}
                  <path
                    d={path.path}
                    fill={`url(#grad-${i})`}
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth={1}
                    style={{ opacity: 0.8 }}
                  />
                </g>
              ))}
            </g>

            {/* Technical Rings */}
            <g style={{ mixBlendMode: 'screen' }}>
              {technicalRings.map((ring, i) => (
                <g key={`ring-${i}`}>
                  {/* Main ring */}
                  <path
                    d={ring.path}
                    fill="none"
                    stroke={ring.strokeColor}
                    strokeWidth={ring.strokeWidth}
                    strokeDasharray={ring.dashArray}
                  />
                </g>
              ))}
            </g>

            {/* Swooshes */}
            <g style={{ mixBlendMode: 'screen' }}>
              {swooshes.map((swoosh, i) => (
                <g key={`swoosh-${i}`}>
                  <defs>
                    <linearGradient
                      id={`swoosh-grad-${i}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" style={{ stopColor: swoosh.gradient[0], stopOpacity: swoosh.opacity }} />
                      <stop offset="100%" style={{ stopColor: swoosh.gradient[1], stopOpacity: swoosh.opacity * 0.5 }} />
                    </linearGradient>
                  </defs>
                  {/* Main swoosh */}
                  <path
                    d={swoosh.path}
                    fill={`url(#swoosh-grad-${i})`}
                    style={{ opacity: swoosh.opacity }}
                  />
                </g>
              ))}
            </g>

            {/* Distorted Grid with higher opacity */}
            <g opacity="0.4">
              {gridPaths.map((path, i) => (
                <path
                  key={`grid-${i}`}
                  d={path.path}
                  fill="none"
                  stroke={i % 2 === 0 ? "#444444" : "#333333"}
                  strokeWidth={path.thickness}
                  strokeDasharray={i % 5 === 0 ? "8,8" : "none"}
                  style={{ mixBlendMode: 'screen' }}
                />
              ))}
            </g>
            
            {/* Noise overlay */}
            <rect width="100%" height="100%" fill="url(#noise)" style={{ mixBlendMode: 'overlay' }} />
            
            {/* Starfield layer */}
            <g style={{ mixBlendMode: 'screen' }}>
              {starfield.map((star, i) => (
                <path
                  key={`star-${i}`}
                  d={star.path}
                  fill="rgba(255,255,255,0.4)"
                  fillOpacity={star.opacity}
                  style={{ mixBlendMode: 'screen' }}
                  filter="url(#glow)"
                />
              ))}
            </g>
            
            {/* Shattered lines on top */}
            <g filter="url(#glow)">
              {shatteredLines.map((line, i) => (
                <path
                  key={`line-${i}`}
                  d={line.path}
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth={line.width}
                  strokeOpacity={line.opacity}
                  style={{ mixBlendMode: 'screen' }}
                />
              ))}
            </g>

            {/* Scanline overlay */}
            <rect 
              width="100%" 
              height="100%" 
              fill="url(#scanlines)" 
              style={{ mixBlendMode: 'overlay' }}
              opacity="0.3"
            />

            {/* Dark gradient overlay for text readability */}
            <defs>
              <linearGradient id="textOverlay" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                <stop offset="30%" stopColor="rgba(0,0,0,0.5)" />
                <stop offset="70%" stopColor="rgba(0,0,0,0.8)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.95)" />
              </linearGradient>
            </defs>
            <rect
              x={-width * 0.5}
              y={-height * 0.5}
              width={width * 2}
              height={height * 2}
              fill="url(#textOverlay)"
              style={{ mixBlendMode: 'multiply' }}
            />
          </svg>
          
          {/* Content - floating text */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              position: 'absolute',
              inset: 0,
              height: '100%',
              width: '100%',
              padding: '0 80px',
            }}
          >
            {/* Title */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
                maxWidth: '900px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: titleFontSize,
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginBottom: description ? '24px' : '0',
                  color: '#FFFFFF',
                  textAlign: 'left',
                  textShadow: '0 0 20px rgba(255,0,128,0.5), -2px 0 #FF0080, 2px 0 #0070F3',
                }}
              >
                {title}
              </div>
              
              {/* Description */}
              {description && (
                <div
                  style={{
                    display: 'flex',
                    fontSize: descFontSize,
                    fontWeight: 400,
                    color: '#E4E4E7',
                    marginTop: '8px',
                    lineHeight: 1.3,
                    maxWidth: '700px',
                    textAlign: 'left',
                    textShadow: '-1px 0 #FF0080, 1px 0 #0070F3, 0 0 10px rgba(0,0,0,0.9)',
                  }}
                >
                  {description}
                </div>
              )}
            </div>
          </div>

          {/* Hash display in bottom right */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              bottom: '12px',
              right: '16px',
              fontSize: '12px',
              fontFamily: 'monospace',
              color: 'rgba(255,255,255,0.3)',
              textAlign: 'right',
              zIndex: 10,
            }}
          >
            #{seed.toString(16).slice(0, 6)}
          </div>
        </div>
      ),
      {
        width,
        height,
        fonts: [
          {
            name: 'Geist',
            data: geistRegularData,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Geist',
            data: geistBoldData,
            weight: 700,
            style: 'normal',
          },
        ],
      },
    )
    
    // Get the image data once
    const imageBuffer = await imageResponse.arrayBuffer()
    
    if (USE_CLOUDINARY && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
      try {
        const formData = new FormData()
        formData.append('file', new Blob([imageBuffer]))
        formData.append('public_id', publicId)
        formData.append('api_key', CLOUDINARY_API_KEY)
        formData.append('timestamp', String(Math.round(Date.now() / 1000)))
        
        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: 'POST', body: formData }
        )
        
        if (cloudinaryResponse.ok) {
          const result = await cloudinaryResponse.json()
          return new Response(null, {
            status: 302,
            headers: {
              'Location': result.secure_url,
              'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=60'
            }
          })
        }
      } catch (error) {
        console.error('Cloudinary upload failed:', error)
      }
    }
    
    // Return a new response with the buffer
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=60'
      }
    })
    
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(`${e.message}`)
    } else {
      console.log('An unknown error occurred')
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
      headers: {
        'Cache-Control': 'no-store'
      }
    })
  }
} 