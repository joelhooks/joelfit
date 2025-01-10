import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
 
export const runtime = 'edge'

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

interface Point {
  x: number
  y: number
  colors: ColorPair
  rng: SeededRandom
}

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
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

function generatePoints(width: number, height: number, count: number, rng: SeededRandom): Point[] {
  const colors = getColors(rng)
  return Array.from({ length: count }, () => ({
    x: rng.next() * width,
    y: rng.next() * height,
    colors: rng.pick(colors),
    rng,
  }))
}

function distortPoint(x: number, y: number, intensity: number, rng: SeededRandom) {
  const angle = rng.next() * Math.PI * 2
  const distance = rng.next() * intensity
  return {
    x: x + Math.cos(angle) * distance,
    y: y + Math.sin(angle) * distance
  }
}

function generateVoronoiPath(width: number, height: number, rng: SeededRandom) {
  // Match Voronoi extension
  const extendedWidth = width * 2
  const extendedHeight = height * 2
  const offsetX = -width * 0.5
  const offsetY = -height * 0.5

  // Reduce to 2 shapes: one dominant and one accent
  const points = Array.from({ length: 2 }, (_, i) => {
    const cluster = rng.chance(0.5)
    const baseX = offsetX + rng.range(0, extendedWidth)
    const baseY = offsetY + rng.range(0, extendedHeight)
    const colors = rng.pick(getColors(rng))
    
    // More dramatic size difference between shapes
    const size = i === 0 
      ? 4 + rng.range(0, 5) // Main shape: 4-9x (bigger)
      : 0.8 + rng.range(0, 1.2) // Accent shape: 0.8-2x (smaller)
    
    return {
      x: cluster ? baseX + rng.range(-500, 500) : baseX,
      y: cluster ? baseY + rng.range(-500, 500) : baseY,
      colors,
      size,
      distortion: i === 0
        ? 200 + rng.range(0, 300) // More dramatic for main shape
        : 50 + rng.range(0, 100), // Subtle for accent
      complexity: i === 0 ? 8 : 12, // Different detail levels
      roughness: i === 0 ? rng.range(0.2, 0.4) : rng.range(0.6, 0.8), // Main smooth, accent rough
      isBouba: i === 0, // Main shape always smooth
      rotation: rng.next() * Math.PI * 2,
      glow: i === 0 ? 0.9 : 0.5, // Stronger glow on main shape
    }
  })

  const paths: Array<{ 
    path: string; 
    colors: string[]; 
    rotation: number;
    size: number;
    glow: number;
  }> = []
  
  points.forEach((point, i) => {
    const cell: string[] = []
    const basePoints: Array<{x: number, y: number}> = []
    
    // Create base polygon points with size variation
    for (let angle = 0; angle < 360; angle += point.complexity) {
      const radian = (angle * Math.PI) / 180
      let radius = (400 + rng.range(0, 300)) * point.size // Larger base radius with size variation
      
      // Find nearest point in this direction
      points.forEach((other, j) => {
        if (i !== j) {
          const dx = other.x - point.x
          const dy = other.y - point.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const pointAngle = Math.atan2(dy, dx)
          const angleDiff = Math.abs(radian - pointAngle)
          
          if (angleDiff < Math.PI / 2.5) { // Wider angle for more overlap
            radius = Math.min(radius, distance * 0.9) // More overlap
          }
        }
      })
      
      // Add some controlled randomness to the radius
      radius *= 0.7 + rng.range(0, 0.6) // More radius variation
      
      const baseX = point.x + radius * Math.cos(radian)
      const baseY = point.y + radius * Math.sin(radian)
      basePoints.push({ x: baseX, y: baseY })
    }
    
    // Add distortion and roughness to the edges
    if (point.isBouba) {
      // Create smooth, organic curves for Bouba shapes
      const smoothedPoints: string[] = []
      basePoints.forEach((basePoint, idx) => {
        const nextIdx = (idx + 1) % basePoints.length
        const prevIdx = (idx - 1 + basePoints.length) % basePoints.length
        
        const prev = basePoints[prevIdx]!
        const next = basePoints[nextIdx]!
        
        // Calculate control points with more dramatic curves
        const controlPoint1 = {
          x: basePoint.x + (next.x - prev.x) * 0.3,
          y: basePoint.y + (next.y - prev.y) * 0.3
        }
        
        const controlPoint2 = {
          x: next.x - (next.x - basePoint.x) * 0.3,
          y: next.y - (next.y - basePoint.y) * 0.3
        }
        
        // Add more dramatic waviness
        const wave = Math.sin(idx * 0.8) * point.distortion * 0.5
        controlPoint1.x += wave
        controlPoint1.y += wave
        controlPoint2.x -= wave
        controlPoint2.y -= wave
        
        if (idx === 0) {
          smoothedPoints.push(`M${basePoint.x},${basePoint.y}`)
        }
        smoothedPoints.push(`C${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${next.x},${next.y}`)
      })
      cell.push(smoothedPoints.join(' ') + 'Z')
    } else {
      // More aggressive distortion for Kiki shapes
      basePoints.forEach((basePoint, idx) => {
        const distorted = distortPoint(basePoint.x, basePoint.y, point.distortion * point.roughness * 1.5, rng)
        
        if (rng.chance(0.6)) { // More extra points
          const nextPoint = basePoints[(idx + 1) % basePoints.length]!
          const extraPoint = distortPoint(
            (basePoint.x + nextPoint.x) / 2,
            (basePoint.y + nextPoint.y) / 2,
            point.distortion * 2,
            rng
          )
          cell.push(`${distorted.x},${distorted.y} ${extraPoint.x},${extraPoint.y}`)
        } else {
          cell.push(`${distorted.x},${distorted.y}`)
        }
      })
    }
    
    paths.push({ 
      path: point.isBouba ? cell[0]! : `M${cell.join('L')}Z`,
      colors: point.colors,
      rotation: point.rotation,
      size: point.size,
      glow: point.glow,
    })
  })
  
  return paths
}

function generateNoisePattern(width: number, height: number, rng: SeededRandom) {
  // Match Voronoi extension
  const extendedWidth = width * 2
  const extendedHeight = height * 2
  const offsetX = -width * 0.5
  const offsetY = -height * 0.5
  
  const cellSize = 40
  const paths: string[] = []
  
  for (let x = offsetX; x < offsetX + extendedWidth; x += cellSize) {
    for (let y = offsetY; y < offsetY + extendedHeight; y += cellSize) {
      const noise = rng.next()
      if (noise > 0.75) {
        const size = cellSize * (0.3 + noise * 0.4)
        paths.push(`M${x},${y}h${size}v${size}h-${size}Z`)
      }
    }
  }
  
  return paths.join(' ')
}

function generateShatteredLines(width: number, height: number, rng: SeededRandom) {
  const lines: Array<{path: string, opacity: number, width: number}> = []
  const numLines = 25 // Fewer lines
  
  // Match Voronoi extension
  const extendedWidth = width * 2
  const extendedHeight = height * 2
  const offsetX = -width * 0.5
  const offsetY = -height * 0.5
  
  // Generate fewer anchor points for more intentional paths
  const anchors = Array.from({ length: 8 }, () => ({
    x: offsetX + rng.range(0, extendedWidth),
    y: offsetY + rng.range(0, extendedHeight),
    influence: 0.3 + rng.range(0, 0.7)
  }))
  
  // Generate lines between random points with smoother curves
  for (let i = 0; i < numLines; i++) {
    const start = anchors[Math.floor(rng.next() * anchors.length)]!
    let currentPoint = { x: start.x, y: start.y }
    let path = `M${currentPoint.x},${currentPoint.y}`
    
    // Add 2-3 segments for cleaner lines
    const segments = 2 + Math.floor(rng.next() * 2)
    
    // Each line gets unique characteristics
    const lineStyle = {
      opacity: 0.1 + rng.range(0, 0.3), // More variance in opacity
      width: rng.chance(0.7) 
        ? 2 + rng.range(0, 4) // Occasional thick lines
        : 0.5 + rng.range(0, 1.5), // Usually thin lines
      smoothness: rng.chance(0.3) // 70% chance of smooth curves
    }
    
    for (let j = 0; j < segments; j++) {
      // Use nearby anchor points to influence the curve
      let influenceX = 0
      let influenceY = 0
      
      anchors.forEach(anchor => {
        const dx = anchor.x - currentPoint.x
        const dy = anchor.y - currentPoint.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const pull = (1 - Math.min(1, distance / 400)) * anchor.influence
        influenceX += dx * pull
        influenceY += dy * pull
      })
      
      // Add some gentle randomness to the direction
      const angle = Math.atan2(influenceY, influenceX) + (rng.next() - 0.5) * Math.PI * 0.5
      const length = 300 + rng.range(0, 300) // Varied lengths
      
      const endX = currentPoint.x + Math.cos(angle) * length
      const endY = currentPoint.y + Math.sin(angle) * length
      
      if (lineStyle.smoothness) {
        // Create smooth, organic curves
        const control1X = currentPoint.x + Math.cos(angle - 0.2) * length * 0.5
        const control1Y = currentPoint.y + Math.sin(angle - 0.2) * length * 0.5
        const control2X = endX - Math.cos(angle + 0.2) * length * 0.3
        const control2Y = endY - Math.sin(angle + 0.2) * length * 0.3
        
        path += ` C${control1X},${control1Y} ${control2X},${control2Y} ${endX},${endY}`
      } else {
        // Create subtle angles instead of sharp zigzags
        const midX = currentPoint.x + Math.cos(angle) * length * 0.5
        const midY = currentPoint.y + Math.sin(angle) * length * 0.5
        const controlX = midX + (rng.next() - 0.5) * 50 // Gentler deviation
        const controlY = midY + (rng.next() - 0.5) * 50
        
        path += ` Q${controlX},${controlY} ${endX},${endY}`
      }
      
      currentPoint = { x: endX, y: endY }
    }
    
    lines.push({
      path,
      opacity: lineStyle.opacity,
      width: lineStyle.width
    })
  }
  
  return lines
}

function generateDistortedGrid(width: number, height: number, rng: SeededRandom) {
  const gridSize = 25 // Base grid cell size
  
  // Match Voronoi extension
  const extendedWidth = width * 2
  const extendedHeight = height * 2
  const offsetX = -width * 0.5
  const offsetY = -height * 0.5
  
  // Create more varied black holes
  const blackHoles = Array.from({ length: 6 }, () => ({
    x: offsetX + rng.range(0, extendedWidth),
    y: offsetY + rng.range(0, extendedHeight),
    radius: 150 + rng.range(0, 300),
    strength: 1 + rng.range(0, 2.5),
    gravityField: 50 + rng.range(0, 200)
  }))

  const paths: Array<{ path: string; thickness: number }> = []
  
  // Generate vertical lines with extended coverage
  for (let x = offsetX; x <= offsetX + extendedWidth; x += gridSize) {
    let path = `M ${x} ${offsetY}`
    let maxDistortion = 0
    
    // Create points along the line
    for (let y = offsetY; y <= offsetY + extendedHeight; y += gridSize / 4) {
      let distortedX = x
      let distortedY = y
      let currentDistortion = 0
      
      // Apply black hole distortion
      blackHoles.forEach(hole => {
        const dx = x - hole.x
        const dy = y - hole.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - distance / hole.radius)
        const angle = Math.atan2(dy, dx)
        
        const distortion = influence * influence * influence * hole.strength
        distortedX += Math.cos(angle) * distortion * 50
        distortedY += Math.sin(angle) * distortion * 50
        
        currentDistortion += (1 - distance / hole.gravityField) * influence
      })
      
      maxDistortion = Math.max(maxDistortion, currentDistortion)
      path += ` L ${distortedX} ${distortedY}`
    }
    
    paths.push({ path, thickness: Math.max(0.5, maxDistortion * 2) })
  }
  
  // Generate horizontal lines with extended coverage
  for (let y = offsetY; y <= offsetY + extendedHeight; y += gridSize) {
    let path = `M ${offsetX} ${y}`
    let maxDistortion = 0
    
    // Create points along the line
    for (let x = offsetX; x <= offsetX + extendedWidth; x += gridSize / 4) {
      let distortedX = x
      let distortedY = y
      let currentDistortion = 0
      
      // Apply black hole distortion
      blackHoles.forEach(hole => {
        const dx = x - hole.x
        const dy = y - hole.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - distance / hole.radius)
        const angle = Math.atan2(dy, dx)
        
        const distortion = influence * influence * influence * hole.strength
        distortedX += Math.cos(angle) * distortion * 50
        distortedY += Math.sin(angle) * distortion * 50
        
        currentDistortion += (1 - distance / hole.gravityField) * influence
      })
      
      maxDistortion = Math.max(maxDistortion, currentDistortion)
      path += ` L ${distortedX} ${distortedY}`
    }
    
    paths.push({ path, thickness: Math.max(0.5, maxDistortion * 2) })
  }
  
  return paths
}

function generateStarfield(width: number, height: number, rng: SeededRandom) {
  const stars: Array<{
    path: string,
    opacity: number,
    rotation: number,
    size: number
  }> = []
  
  // Match extended area
  const extendedWidth = width * 2
  const extendedHeight = height * 2
  const offsetX = -width * 0.5
  const offsetY = -height * 0.5
  
  // Generate 50-75 stars instead of 200-300
  const numStars = 50 + Math.floor(rng.next() * 25)
  
  for (let i = 0; i < numStars; i++) {
    const x = offsetX + rng.range(0, extendedWidth)
    const y = offsetY + rng.range(0, extendedHeight)
    
    // Smaller sizes with rare big ones
    const size = rng.chance(0.98)
      ? 6 + rng.range(0, 8) // 2% chance of big stars (6-14px)
      : rng.chance(0.8)
        ? 3 + rng.range(0, 3) // 18% chance of medium stars (3-6px)
        : 1 + rng.range(0, 2) // 80% chance of small stars (1-3px)
    
    // Lower base opacity
    const opacity = 0.15 + rng.next() * 0.35 // 0.15-0.5 opacity
    const rotation = rng.next() * Math.PI * 2
    
    // Create 5-pointed star path
    const points: Array<[number, number]> = []
    const outerRadius = size
    const innerRadius = size * (0.2 + rng.range(0, 0.3)) // Varied inner radius (20-50% of outer)
    
    for (let j = 0; j < 10; j++) {
      const radius = j % 2 === 0 ? outerRadius : innerRadius
      const angle = (j * Math.PI) / 5 + rotation
      points.push([
        x + radius * Math.cos(angle),
        y + radius * Math.sin(angle)
      ])
    }
    
    // We know points[0] exists because we just added 10 points
    const path = `M${points[0]![0]},${points[0]![1]}` + 
      points.slice(1).map(p => `L${p[0]},${p[1]}`).join('') + 'Z'
    
    stars.push({
      path,
      opacity,
      rotation,
      size
    })
  }
  
  return stars
}

function generateTechnicalRings(width: number, height: number, rng: SeededRandom) {
  const rings: Array<{
    path: string,
    strokeColor: string,
    strokeWidth: number,
    rotation: number,
    dashArray?: string
  }> = []

  // Generate 2-3 ring clusters
  const numClusters = 2 + Math.floor(rng.next() * 2)
  
  for (let cluster = 0; cluster < numClusters; cluster++) {
    // Wider spread for ring centers
    const centerX = rng.range(-width * 0.5, width * 0.5)
    const centerY = rng.range(-height * 0.5, height * 0.5)
    const rotation = rng.next() * Math.PI * 2
    
    // Generate 3-6 rings per cluster (fewer but bigger)
    const numRings = 3 + Math.floor(rng.next() * 4)
    
    for (let i = 0; i < numRings; i++) {
      // Much larger base radius
      const radius = 200 + i * 80 + rng.range(0, 120)
      const detail = rng.chance(0.7)
      
      if (detail) {
        // Technical detailed ring
        let path = `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 1 0 ${centerX + radius} ${centerY}`
        
        // Add technical details
        const numDetails = 8 + Math.floor(rng.next() * 8)
        for (let j = 0; j < numDetails; j++) {
          const angle = (j / numDetails) * Math.PI * 2
          const detailRadius = radius + (rng.next() - 0.5) * 20
          const x = centerX + Math.cos(angle) * detailRadius
          const y = centerY + Math.sin(angle) * detailRadius
          
          if (rng.chance(0.3)) {
            // Even bigger circles
            path += ` M ${x - 6} ${y} a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0`
          } else if (rng.chance(0.5)) {
            // Much longer tick marks
            path += ` M ${x} ${y} l ${Math.cos(angle) * 24} ${Math.sin(angle) * 24}`
          }
        }
        
        rings.push({
          path,
          strokeColor: rng.chance(0.7) 
            ? `rgba(255,255,255,${0.15 + rng.next() * 0.15})` // White rings: 0.15-0.3 opacity
            : `rgba(128,128,128,${0.1 + rng.next() * 0.1})`, // Mid-gray rings: 0.1-0.2 opacity
          strokeWidth: 2 + rng.next() * 3,
          rotation,
          dashArray: rng.chance(0.3) ? '12,12' : undefined
        })
      } else {
        rings.push({
          path: `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 1 0 ${centerX + radius} ${centerY}`,
          strokeColor: `rgba(96,96,96,${0.05 + rng.next() * 0.1})`, // Dark gray rings: 0.05-0.15 opacity
          strokeWidth: 1.5,
          rotation,
          dashArray: '6,12'
        })
      }
    }
  }
  
  return rings
}

function generateSwooshes(width: number, height: number, rng: SeededRandom) {
  const swooshes: Array<{
    path: string,
    gradient: [string, string],
    opacity: number,
    rotation: number
  }> = []

  // Generate 3-5 swooshes
  const numSwooshes = 3 + Math.floor(rng.next() * 3)
  const colors = getColors(rng)

  for (let i = 0; i < numSwooshes; i++) {
    // Much wider spread
    const startX = rng.range(-width * 0.8, width * 0.8)
    const startY = rng.range(-height * 0.8, height * 0.8)
    const controlScale = 0.8 + rng.next() * 0.4

    // Create swoosh path with multiple curves
    let path = `M ${startX} ${startY}`
    
    // Add 2-3 curve segments
    let currentX = startX
    let currentY = startY
    const segments = 2 + Math.floor(rng.next() * 2)
    
    for (let j = 0; j < segments; j++) {
      const angle = rng.next() * Math.PI * 2
      // Much longer swooshes
      const length = 500 + rng.range(0, 600)
      
      // More dramatic control points
      const cp1x = currentX + Math.cos(angle) * length * 0.7
      const cp1y = currentY + Math.sin(angle) * length * 0.7
      const cp2x = currentX + Math.cos(angle + 0.5) * length * 0.95
      const cp2y = currentY + Math.sin(angle + 0.5) * length * 0.95
      
      // End point
      const endX = currentX + Math.cos(angle + 1) * length
      const endY = currentY + Math.sin(angle + 1) * length
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`
      
      currentX = endX
      currentY = endY
    }

    // Much thicker swooshes
    const offset = 40 + rng.range(0, 80)
    path += ` m ${offset} 0`
    
    // Return path in reverse
    for (let j = segments - 1; j >= 0; j--) {
      const angle = rng.next() * Math.PI * 2
      const length = 200 + rng.range(0, 300)
      
      const cp1x = currentX - Math.cos(angle) * length * 0.8
      const cp1y = currentY - Math.sin(angle) * length * 0.8
      const cp2x = currentX - Math.cos(angle + 0.5) * length * 0.5
      const cp2y = currentY - Math.sin(angle + 0.5) * length * 0.5
      
      const endX = currentX - Math.cos(angle + 1) * length
      const endY = currentY - Math.sin(angle + 1) * length
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`
      
      currentX = endX
      currentY = endY
    }
    
    path += ' Z'

    swooshes.push({
      path,
      gradient: rng.pick(colors),
      opacity: 0.5 + rng.next() * 0.4, // Higher base opacity
      rotation: rng.next() * Math.PI * 2
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

export async function GET(req: NextRequest) {
  try {
    const [geistRegularData, geistBoldData] = await Promise.all([
      geistRegular,
      geistBold,
    ])

    const { searchParams } = new URL(req.url)
    const title = searchParams.get('title')?.slice(0, 150) || 'JoelFit'
    const description = searchParams.get('description')?.slice(0, 250) || 'a personal health & fitness framework'
    
    // Use daily seed instead of just title hash
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
    const noisePath = generateNoisePattern(width, height, rng)
    const shatteredLines = generateShatteredLines(width, height, rng)
    const gridPaths = generateDistortedGrid(width, height, rng)
    const starfield = generateStarfield(width, height, rng)
    const technicalRings = generateTechnicalRings(width, height, rng)
    const swooshes = generateSwooshes(width, height, rng)
 
    return new ImageResponse(
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
                <g key={`ring-${i}`} transform={`rotate(${(ring.rotation * 180) / Math.PI})`}>
                  {/* Glow effect for white rings */}
                  {ring.strokeColor === '#FFFFFF' && (
                    <path
                      d={ring.path}
                      fill="none"
                      stroke={ring.strokeColor}
                      strokeWidth={ring.strokeWidth + 1}
                      strokeDasharray={ring.dashArray}
                      filter="url(#glow)"
                      style={{ opacity: 0.3 }}
                    />
                  )}
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
                      gradientTransform={`rotate(${(swoosh.rotation * 180) / Math.PI})`}
                    >
                      <stop offset="0%" style={{ stopColor: swoosh.gradient[0], stopOpacity: swoosh.opacity }} />
                      <stop offset="100%" style={{ stopColor: swoosh.gradient[1], stopOpacity: swoosh.opacity * 0.5 }} />
                    </linearGradient>
                  </defs>
                  {/* Glow effect */}
                  <path
                    d={swoosh.path}
                    fill={`url(#swoosh-grad-${i})`}
                    filter="url(#glow)"
                    style={{ opacity: swoosh.opacity * 0.5 }}
                  />
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
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
} 