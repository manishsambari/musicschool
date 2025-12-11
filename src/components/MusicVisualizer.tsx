'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function MusicVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resizeCanvas)
    }

    // Visualizer bars
    const bars: Array<{
      x: number
      height: number
      targetHeight: number
      color: string
      speed: number
    }> = []

    const numBars = 64
    const barWidth = canvas.offsetWidth / numBars
    const colors = [
      '#8B5CF6', '#A855F7', '#C084FC', '#DDD6FE',
      '#EC4899', '#F472B6', '#FBBF24', '#FCD34D'
    ]

    // Initialize bars
    for (let i = 0; i < numBars; i++) {
      bars.push({
        x: i * barWidth,
        height: 0,
        targetHeight: Math.random() * 200 + 50,
        color: colors[i % colors.length],
        speed: 0.1 + Math.random() * 0.05
      })
    }

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      
      time += 0.02

      bars.forEach((bar, index) => {
        // Create wave-like motion
        const wave = Math.sin(time + index * 0.2) * 0.5 + 0.5
        const bassWave = Math.sin(time * 0.5 + index * 0.1) * 0.3 + 0.7
        
        bar.targetHeight = (wave * bassWave * 150) + 30

        // Smooth animation
        bar.height += (bar.targetHeight - bar.height) * bar.speed

        // Create gradient
        const gradient = ctx.createLinearGradient(0, canvas.offsetHeight, 0, canvas.offsetHeight - bar.height)
        gradient.addColorStop(0, bar.color + '80')
        gradient.addColorStop(0.5, bar.color)
        gradient.addColorStop(1, bar.color + '40')

        ctx.fillStyle = gradient
        ctx.fillRect(bar.x, canvas.offsetHeight - bar.height, barWidth - 2, bar.height)

        // Add glow effect
        ctx.shadowColor = bar.color
        ctx.shadowBlur = 10
        ctx.fillRect(bar.x, canvas.offsetHeight - bar.height, barWidth - 2, bar.height)
        ctx.shadowBlur = 0
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resizeCanvas)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Floating Music Notes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-purple-400 text-2xl opacity-20"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
            }}
            animate={{
              y: -50,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear"
            }}
          >
            {['♪', '♫', '♬', '♩'][Math.floor(Math.random() * 4)]}
          </motion.div>
        ))}
      </div>

      {/* Pulsing Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-purple-500/20"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ 
              scale: [0, 2, 0],
              opacity: [0.8, 0.2, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeOut"
            }}
            style={{
              width: '200px',
              height: '200px',
            }}
          />
        ))}
      </div>
    </div>
  )
}