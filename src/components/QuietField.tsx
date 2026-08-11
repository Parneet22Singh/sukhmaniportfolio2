import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// ————————————————————————————————————————————————————————————
// Background texture for the measurement section.
//
// This replaces the old parallax capsule field — bright multicolour
// pills that sat *on top of* the page rather than inside it. Everything
// here is drawn from the existing palette at very low opacity: a plot
// grid, two soft accent glows, and a trend line. It reads as the faint
// ghost of a dashboard behind the copy, and never competes with it.
// ————————————————————————————————————————————————————————————

// A rising, slightly irregular series — plotted, not decorative.
const SERIES = [
  [0, 78], [8, 74], [16, 76], [24, 66], [32, 69],
  [40, 58], [48, 61], [56, 48], [64, 52], [72, 38],
  [80, 42], [88, 28], [96, 31], [100, 22],
] as const

const path = SERIES.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x},${y}`).join(' ')

export default function QuietField() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Everything drifts slowly and in the same direction — no jitter.
  const gridY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const glowAY = useTransform(scrollYProgress, [0, 1], [90, -70])
  const glowBY = useTransform(scrollYProgress, [0, 1], [-60, 80])
  const plotY = useTransform(scrollYProgress, [0, 1], [22, -22])
  const plotOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0, 1, 1, 0.2])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      {/* soft accent glows — the only colour in the field */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: '4%', left: '-8%', width: '46vw', height: '46vw',
          background: 'radial-gradient(circle, rgba(255,90,30,0.14) 0%, rgba(255,90,30,0.04) 42%, transparent 68%)',
          filter: 'blur(30px)', y: glowAY,
        }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          bottom: '2%', right: '-10%', width: '52vw', height: '52vw',
          background: 'radial-gradient(circle, rgba(255,138,76,0.10) 0%, rgba(255,61,110,0.035) 45%, transparent 70%)',
          filter: 'blur(36px)', y: glowBY,
        }}
      />

      {/* plot grid */}
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: '-10%', height: '120%', y: gridY,
          backgroundImage:
            'linear-gradient(to right, rgba(245,240,234,0.035) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(245,240,234,0.035) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 80%)',
        }}
      />

      {/* the trend line — a dashboard remembered, not displayed */}
      <motion.svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-x-[6%] top-[18%] h-[62%] w-[88%]"
        style={{ y: plotY, opacity: plotOpacity }}
      >
        <defs>
          <linearGradient id="qfLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(201,169,110,0)" />
            <stop offset="22%" stopColor="rgba(201,169,110,0.34)" />
            <stop offset="100%" stopColor="rgba(255,90,30,0.42)" />
          </linearGradient>
          <linearGradient id="qfFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,90,30,0.07)" />
            <stop offset="100%" stopColor="rgba(255,90,30,0)" />
          </linearGradient>
        </defs>
        <path d={`${path} L 100,100 L 0,100 Z`} fill="url(#qfFill)" />
        <path d={path} fill="none" stroke="url(#qfLine)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        {SERIES.filter((_, i) => i % 3 === 0).map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="0.6" fill="rgba(201,169,110,0.4)" vectorEffect="non-scaling-stroke" />
        ))}
      </motion.svg>
    </div>
  )
}
