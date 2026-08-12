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
      {/* Flat outlined rings replace the two blurred glows. Same drift, same
          role as quiet background structure, but no soft colour wash — the
          build no longer has any of those anywhere. */}
      <motion.div
        className="absolute rounded-full border border-gold/20"
        style={{ top: '4%', left: '-8%', width: '46vw', height: '46vw', y: glowAY }}
      />
      <motion.div
        className="absolute rounded-full border border-ink/[0.10]"
        style={{ bottom: '2%', right: '-10%', width: '52vw', height: '52vw', y: glowBY }}
      />

      {/* plot grid - hairlines, drawn edge to edge with no mask fade */}
      <motion.div
        className="absolute inset-x-0 opacity-70"
        style={{
          top: '-10%', height: '120%', y: gridY,
          backgroundImage:
            'linear-gradient(to right, rgba(245,240,234,0.05) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(245,240,234,0.05) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* the trend line - a dashboard remembered, not displayed */}
      <motion.svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-x-[6%] top-[18%] h-[62%] w-[88%]"
        style={{ y: plotY, opacity: plotOpacity }}
      >
        <path d={`${path} L 100,100 L 0,100 Z`} fill="rgba(255,90,30,0.05)" />
        <path d={path} fill="none" stroke="rgba(255,90,30,0.42)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        {SERIES.filter((_, i) => i % 3 === 0).map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="0.6" fill="rgba(255,90,30,0.55)" vectorEffect="non-scaling-stroke" />
        ))}
      </motion.svg>
    </div>
  )
}
