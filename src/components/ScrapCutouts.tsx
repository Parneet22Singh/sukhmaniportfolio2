import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { capabilities } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const

// ————————————————————————————————————————————————————————————
// "Where I can help" as a scrapbook wall.
//
// Six capability lines, each on a torn scrap of paper, taped to the page at a
// slight angle. The alternative — six tidy rows — read like a price list, and
// these are meant to read like a practitioner's board.
//
// Everything is drawn: the ragged edge is a clip-path polygon, the tape is two
// divs, the paper tones come from the site palette. No images, no gradients.
// ————————————————————————————————————————————————————————————

// Deterministic PRNG so a card's tear is identical on every render and between
// server and client — Math.random() here would reshuffle the edges on any
// re-render and the whole wall would twitch.
function rng(seed: number) {
  let s = seed * 9301 + 49297
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

// A torn-paper silhouette as a percentage polygon. Walks the four edges laying
// down points with small perpendicular jitter; the short sides get finer teeth
// than the long ones so the tear reads as fibre rather than as zig-zag.
function tornEdge(seed: number) {
  const r = rng(seed)
  const pts: string[] = []
  const jitter = (amt: number) => (r() - 0.5) * 2 * amt

  const STEPS_X = 16
  const STEPS_Y = 9
  const AMT = 1.5

  for (let i = 0; i <= STEPS_X; i++) pts.push(`${(i / STEPS_X) * 100}% ${Math.max(0, jitter(AMT))}%`)
  for (let i = 1; i <= STEPS_Y; i++) pts.push(`${100 - Math.max(0, jitter(AMT))}% ${(i / STEPS_Y) * 100}%`)
  for (let i = STEPS_X - 1; i >= 0; i--) pts.push(`${(i / STEPS_X) * 100}% ${100 - Math.max(0, jitter(AMT))}%`)
  for (let i = STEPS_Y - 1; i >= 1; i--) pts.push(`${Math.max(0, jitter(AMT))}% ${(i / STEPS_Y) * 100}%`)

  return `polygon(${pts.join(', ')})`
}

// Paper stock per scrap. Kept inside the palette — two warm papers, the orange,
// and the ink — so the wall still reads as the same site.
const STOCK = [
  { paper: '#F1ECE0', text: '#17150F', tape: 'rgba(23,21,15,0.10)' },
  { paper: '#FF5A1E', text: '#17150F', tape: 'rgba(23,21,15,0.14)' },
  { paper: '#DED5C4', text: '#17150F', tape: 'rgba(23,21,15,0.10)' },
  { paper: '#17150F', text: '#F1ECE0', tape: 'rgba(241,236,224,0.16)' },
  { paper: '#DED5C4', text: '#17150F', tape: 'rgba(23,21,15,0.10)' },
  { paper: '#F1ECE0', text: '#17150F', tape: 'rgba(23,21,15,0.10)' },
]

// Angle and vertical drift per scrap — pinned by hand, not laid on a grid.
const TILT = [-2.2, 1.6, -1.1, 2.4, -1.8, 1.2]
const DRIFT = ['lg:mt-0', 'lg:mt-10', 'lg:mt-3', 'lg:mt-6', 'lg:mt-0', 'lg:mt-12']

function Scrap({ c, i }: { c: (typeof capabilities)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const stock = STOCK[i % STOCK.length]
  const tilt = TILT[i % TILT.length]

  return (
    <motion.div
      ref={ref}
      className={`relative ${DRIFT[i % DRIFT.length]}`}
      initial={{ opacity: 0, y: 34, rotate: tilt * 2.2 }}
      animate={inView ? { opacity: 1, y: 0, rotate: tilt } : {}}
      transition={{ duration: 0.7, delay: i * 0.07, ease }}
      whileHover={{ rotate: 0, y: -6 }}
      data-cursor="hover"
      /* drop-shadow, not box-shadow: box-shadow traces the element's border
         box and would draw a clean rectangle around the torn silhouette */
      style={{ filter: 'drop-shadow(0 8px 14px rgba(23,21,15,0.16))' }}
    >
      <div
        className="relative px-7 py-8 md:px-8 md:py-10 min-h-[210px] flex flex-col justify-between"
        style={{ background: stock.paper, color: stock.text, clipPath: tornEdge(i + 3) }}
      >
        <div className="flex items-baseline justify-between gap-4">
          <span
            className="uppercase text-[9px] font-medium"
            style={{ letterSpacing: '0.15em', opacity: 0.62 }}
          >
            {c.area}
          </span>
          <span className="font-display text-sm tabular-nums" style={{ opacity: 0.55 }}>
            {c.n}
          </span>
        </div>

        <p
          className="mt-7 font-display font-medium"
          style={{ fontSize: 'clamp(1.15rem, 1.7vw, 1.6rem)', letterSpacing: '-0.02em', lineHeight: 1.12 }}
        >
          {c.line}
        </p>
      </div>

      {/* masking tape, straddling the top edge at its own angle */}
      <span
        aria-hidden
        className="absolute -top-3 left-1/2 h-6 w-24"
        style={{
          background: stock.tape,
          transform: `translateX(-50%) rotate(${tilt * -2.6}deg)`,
        }}
      />
    </motion.div>
  )
}

export default function ScrapCutouts() {
  return (
    <div className="grid gap-x-6 gap-y-12 md:gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {capabilities.map((c, i) => (
        <Scrap key={c.area} c={c} i={i} />
      ))}
    </div>
  )
}
