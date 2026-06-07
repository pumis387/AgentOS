'use client'

import { useEffect, useRef } from 'react'

interface Star { x: number; y: number; z: number; px: number; py: number; size: number; opacity: number; speed: number; color: string }

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let stars: Star[] = []
    const STAR_COUNT = 180
    const COLORS = ['rgba(6, 182, 212,', 'rgba(168, 85, 247,', 'rgba(255, 255, 255,', 'rgba(34, 197, 94,']

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    const createStar = (): Star => ({ x: Math.random() * window.innerWidth - window.innerWidth / 2, y: Math.random() * window.innerHeight - window.innerHeight / 2, z: Math.random() * window.innerWidth, px: 0, py: 0, size: Math.random() * 1.5 + 0.3, opacity: Math.random() * 0.8 + 0.2, speed: Math.random() * 0.3 + 0.05, color: COLORS[Math.floor(Math.random() * COLORS.length)] })
    const initStars = () => { stars = Array.from({ length: STAR_COUNT }, createStar) }

    const drawNebula = () => {
      const g1 = ctx.createRadialGradient(canvas.width * 0.2, canvas.height * 0.3, 0, canvas.width * 0.2, canvas.height * 0.3, 300)
      g1.addColorStop(0, 'rgba(6, 182, 212, 0.03)'); g1.addColorStop(1, 'transparent')
      ctx.fillStyle = g1; ctx.fillRect(0, 0, canvas.width, canvas.height)
      const g2 = ctx.createRadialGradient(canvas.width * 0.8, canvas.height * 0.6, 0, canvas.width * 0.8, canvas.height * 0.6, 400)
      g2.addColorStop(0, 'rgba(168, 85, 247, 0.04)'); g2.addColorStop(1, 'transparent')
      ctx.fillStyle = g2; ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    let tick = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawNebula()
      const cx = canvas.width / 2, cy = canvas.height / 2
      stars.forEach(star => {
        star.z -= star.speed
        if (star.z <= 0) { Object.assign(star, createStar()); star.z = window.innerWidth; return }
        const sx = (star.x / star.z) * canvas.width + cx
        const sy = (star.y / star.z) * canvas.height + cy
        if (sx < 0 || sx > canvas.width || sy < 0 || sy > canvas.height) { Object.assign(star, createStar()); star.z = window.innerWidth; return }
        const size = (1 - star.z / window.innerWidth) * star.size * 3
        const alpha = (1 - star.z / window.innerWidth) * star.opacity
        if (star.px && star.py) {
          ctx.beginPath(); ctx.moveTo(star.px, star.py); ctx.lineTo(sx, sy)
          ctx.strokeStyle = `${star.color}${alpha * 0.3})`; ctx.lineWidth = size * 0.5; ctx.stroke()
        }
        ctx.beginPath(); ctx.arc(sx, sy, Math.max(size, 0.3), 0, Math.PI * 2)
        ctx.fillStyle = `${star.color}${alpha})`; ctx.fill()
        if (alpha > 0.7 && size > 1.5) {
          ctx.beginPath(); ctx.arc(sx, sy, size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `${star.color}${alpha * 0.15})`; ctx.fill()
        }
        star.px = sx; star.py = sy
      })
      tick++
      if (tick % 60 === 0) {
        ctx.beginPath(); ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${Math.random() * 0.5 + 0.3})`; ctx.fill()
      }
      animationId = requestAnimationFrame(animate)
    }

    resize(); initStars(); animate()
    window.addEventListener('resize', () => { resize(); initStars() })
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.7 }} />
}
