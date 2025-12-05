"use client"

import { useEffect, useRef, useCallback } from "react"

interface Spline {
  points: { x: number; y: number }[]
  controlPoints: { x: number; y: number }[]
  velocities: { x: number; y: number }[]
  controlVelocities: { x: number; y: number }[]
  colors: string[]
  thickness: number
  phase: number
  phaseSpeed: number
  smoothnessFactor: number
}

interface SplinesAnimationProps {
  className?: string
  minThickness?: number
  maxThickness?: number
  /** Controls curve smoothness (0-1). Higher = gentler, more flowing curves. Default: 0.7 */
  smoothness?: number
}

// Color palettes for splines - matching the pink/orange/yellow aesthetic
const COLOR_PALETTES = [
  ["#FF1493", "#FF6B6B", "#FFA500", "#FFD700"], // Pink to gold
  ["#FF69B4", "#FF8C00", "#FFB347", "#FFEB3B"], // Hot pink to yellow
  ["#E91E63", "#FF5722", "#FF9800", "#FFC107"], // Rose to amber
  ["#FF4081", "#FF6E40", "#FFD740", "#FFFF00"], // Pink accent to yellow
  ["#F50057", "#FF3D00", "#FF9100", "#FFD600"], // Bright pink to yellow
]

const SplinesAnimation = ({
  className,
  minThickness = 350,
  maxThickness = 450,
  smoothness = 1,
}: SplinesAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const splinesRef = useRef<Spline[]>([])
  const animationRef = useRef<number>(0)
  const dimensionsRef = useRef({ width: 0, height: 0 })

  const createSpline = useCallback(
    (width: number, height: number): Spline => {
      const palette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)]
      const numPoints = 4 + Math.floor(Math.random() * 2)
      const points: { x: number; y: number }[] = []
      const controlPoints: { x: number; y: number }[] = []
      const velocities: { x: number; y: number }[] = []
      const controlVelocities: { x: number; y: number }[] = []

      // Overflow ensures spline extends beyond visible area so endpoints aren't visible
      // Use max thickness plus some buffer to ensure the rounded caps are hidden
      const overflow = maxThickness * 0.8
      const totalWidth = width + overflow * 2
      const startX = -overflow

      // Create points that span beyond the canvas (with overflow on both sides)
      for (let i = 0; i < numPoints; i++) {
        const x = startX + (totalWidth * (i + Math.random() * 0.5)) / numPoints
        const y = height * (0.15 + Math.random() * 0.7)
        points.push({ x, y })
        velocities.push({
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.3,
        })
      }

      // Create control points for bezier curves
      // Smoothness affects how far control points can deviate from the direct path
      // Higher smoothness = smaller deviation = gentler curves
      const maxDeviation = height * 0.5 * (1 - smoothness * 0.85)
      const velocityFactor = 1 - smoothness * 0.7

      for (let i = 0; i < numPoints - 1; i++) {
        const midX = (points[i].x + points[i + 1].x) / 2
        const midY = (points[i].y + points[i + 1].y) / 2
        const offsetY = (Math.random() - 0.5) * maxDeviation
        const offsetX = (Math.random() - 0.5) * maxDeviation * 0.3
        controlPoints.push({ x: midX + offsetX, y: midY + offsetY })
        controlVelocities.push({
          x: (Math.random() - 0.5) * 0.2 * velocityFactor,
          y: (Math.random() - 0.5) * 0.4 * velocityFactor,
        })
      }

      return {
        points,
        controlPoints,
        velocities,
        controlVelocities,
        colors: palette,
        thickness: minThickness + Math.random() * (maxThickness - minThickness),
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.002 + Math.random() * 0.003,
        smoothnessFactor: velocityFactor,
      }
    },
    [minThickness, maxThickness, smoothness],
  )

  const initializeSplines = useCallback(
    (width: number, height: number) => {
      const splines: Spline[] = []
      const numSplines = 5

      for (let i = 0; i < numSplines; i++) {
        splines.push(createSpline(width, height))
      }

      splinesRef.current = splines
    },
    [createSpline],
  )

  const updateSpline = useCallback((spline: Spline, width: number, height: number) => {
    const margin = 100
    const { smoothnessFactor } = spline

    // Update phase for smooth oscillation
    spline.phase += spline.phaseSpeed

    // Update points with smooth movement
    // Oscillation amplitude is reduced by smoothness factor for gentler motion
    spline.points.forEach((point, i) => {
      const vel = spline.velocities[i]

      // Add oscillation based on phase (scaled by smoothness)
      const oscillationX = Math.sin(spline.phase + i * 0.5) * 0.5 * smoothnessFactor
      const oscillationY = Math.cos(spline.phase + i * 0.7) * 0.5 * smoothnessFactor

      point.x += vel.x + oscillationX
      point.y += vel.y + oscillationY

      // Soft boundary bounce
      if (point.x < -margin) vel.x = Math.abs(vel.x) * 0.8
      if (point.x > width + margin) vel.x = -Math.abs(vel.x) * 0.8
      if (point.y < -margin) vel.y = Math.abs(vel.y) * 0.8
      if (point.y > height + margin) vel.y = -Math.abs(vel.y) * 0.8
    })

    // Update control points with reduced oscillation for smoother curves
    spline.controlPoints.forEach((cp, i) => {
      const vel = spline.controlVelocities[i]

      const oscillationX = Math.sin(spline.phase * 1.3 + i) * 0.3 * smoothnessFactor
      const oscillationY = Math.cos(spline.phase * 0.9 + i * 1.2) * 0.5 * smoothnessFactor

      cp.x += vel.x + oscillationX
      cp.y += vel.y + oscillationY

      if (cp.x < -margin) vel.x = Math.abs(vel.x) * 0.8
      if (cp.x > width + margin) vel.x = -Math.abs(vel.x) * 0.8
      if (cp.y < -margin) vel.y = Math.abs(vel.y) * 0.8
      if (cp.y > height + margin) vel.y = -Math.abs(vel.y) * 0.8
    })
  }, [])

  const drawSpline = useCallback((ctx: CanvasRenderingContext2D, spline: Spline) => {
    const { points, controlPoints, colors, thickness } = spline

    if (points.length < 2) return

    // Draw multiple passes for a more organic look
    for (let pass = 0; pass < 3; pass++) {
      const passThickness = thickness * (1 - pass * 0.25)
      const alpha = 1 - pass * 0.2

      ctx.save()
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.lineWidth = passThickness
      ctx.globalAlpha = alpha

      // Create gradient along the path
      const startPoint = points[0]
      const endPoint = points[points.length - 1]

      const gradient = ctx.createLinearGradient(startPoint.x, startPoint.y, endPoint.x, endPoint.y)

      colors.forEach((color, i) => {
        gradient.addColorStop(i / (colors.length - 1), color)
      })

      ctx.strokeStyle = gradient

      // Draw the bezier curve path
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)

      for (let i = 0; i < points.length - 1; i++) {
        const cp = controlPoints[i] || {
          x: (points[i].x + points[i + 1].x) / 2,
          y: (points[i].y + points[i + 1].y) / 2,
        }

        // Quadratic bezier for smoother curves
        ctx.quadraticCurveTo(cp.x, cp.y, points[i + 1].x, points[i + 1].y)
      }

      ctx.stroke()
      ctx.restore()
    }
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = dimensionsRef.current

    // Clear with slight fade for trail effect (optional - remove for clean look)
    ctx.fillStyle = "rgba(255, 0, 153, 1)" // Match background
    ctx.fillRect(0, 0, width, height)

    // Create radial gradient background
    const bgGradient = ctx.createRadialGradient(width * 0.3, height * 0.3, 0, width * 0.5, height * 0.5, width * 0.8)
    bgGradient.addColorStop(0, "#FF0099")
    bgGradient.addColorStop(0.5, "#FF3366")
    bgGradient.addColorStop(1, "#FF0066")
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, width, height)

    // Update and draw splines
    splinesRef.current.forEach(spline => {
      updateSpline(spline, width, height)
      drawSpline(ctx, spline)
    })

    animationRef.current = requestAnimationFrame(animate)
  }, [updateSpline, drawSpline])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const container = containerRef.current
    if (!container) return

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      const dpr = window.devicePixelRatio || 1

      // Set canvas internal resolution
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.scale(dpr, dpr)
      }

      dimensionsRef.current = { width: rect.width, height: rect.height }

      // Reinitialize splines on resize
      initializeSplines(rect.width, rect.height)
    }

    // Use ResizeObserver for proper parent size tracking
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas()
    })

    resizeObserver.observe(container)
    resizeCanvas()

    // Start animation
    animate()

    return () => {
      resizeObserver.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initializeSplines, animate])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className || ""}`}>
      <canvas ref={canvasRef} className="absolute inset-0" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}

export default SplinesAnimation
