import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import YouTube from './YouTube'
import { mediaReels } from '../data/portfolio'

/* ============================================================
   THE MIND IN MOTION
   A constellation of gold particles forms a brain; on scroll it
   disintegrates and re-assembles into the six media frames.
   Canvas 2D — 420 particles, no extra deps.
   ============================================================ */

const N = 420
const GOLD = '255, 90, 31'

type P = { bx: number; by: number; t: number; stagger: number; card: number }

// rejection-sample a stylised brain silhouette (two lobes + cerebellum)
function sampleBrain(): [number, number] {
  for (;;) {
    const x = Math.random() * 2 - 1
    const y = Math.random() * 2 - 1
    const inL = ((x + 0.26) / 0.46) ** 2 + (y / 0.36) ** 2 < 1
    const inR = ((x - 0.26) / 0.46) ** 2 + (y / 0.36) ** 2 < 1
    const inC = ((x - 0.34) / 0.2) ** 2 + ((y - 0.34) / 0.13) ** 2 < 1
    if (inL || inR || inC) return [x, y]
  }
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

function MorphCanvas({ progress, cardRefs }: { progress: MotionValue<number>; cardRefs: React.RefObject<(HTMLDivElement | null)[]> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const parts: P[] = Array.from({ length: N }, (_, i) => {
      const [bx, by] = sampleBrain()
      return { bx, by, t: Math.random(), stagger: Math.random() * 0.3, card: i % 6 }
    })
    // constellation pairs (near neighbours in brain space)
    const pairs: [number, number][] = []
    for (let i = 0; i < N; i++)
      for (let j = i + 1; j < N; j++) {
        const dx = parts[i].bx - parts[j].bx, dy = parts[i].by - parts[j].by
        if (dx * dx + dy * dy < 0.006 && pairs.length < 700) pairs.push([i, j])
      }

    let W = 0, H = 0
    const resize = () => {
      const r = canvas.parentElement!.getBoundingClientRect()
      W = canvas.width = r.width
      H = canvas.height = r.height
    }
    resize()
    window.addEventListener('resize', resize)

    // point on a card's perimeter at parameter t ∈ [0,1)
    const perimeter = (rect: { x: number; y: number; w: number; h: number }, t: number): [number, number] => {
      const per = 2 * (rect.w + rect.h)
      let d = t * per
      if (d < rect.w) return [rect.x + d, rect.y]
      d -= rect.w
      if (d < rect.h) return [rect.x + rect.w, rect.y + d]
      d -= rect.h
      if (d < rect.w) return [rect.x + rect.w - d, rect.y + rect.h]
      d -= rect.w
      return [rect.x, rect.y + rect.h - d]
    }

    // only animate while the section is on screen
    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)

    let raf = 0
    let frame = 0
    let pSmooth = 0
    let rects: { x: number; y: number; w: number; h: number }[] = []

    const loop = () => {
      if (!visible) { raf = requestAnimationFrame(loop); return }
      frame++
      // re-measure card rects every 12 frames (cheap, tracks layout)
      if (frame % 12 === 1 && cardRefs.current) {
        const base = canvas.getBoundingClientRect()
        rects = cardRefs.current.map((el) => {
          if (!el) return { x: W / 2, y: H / 2, w: 0, h: 0 }
          const r = el.getBoundingClientRect()
          return { x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height }
        })
      }

      // Smooth the scroll value so fast wheels can't snap the morph,
      // then hold the mind fully formed for the first 28% of the pin
      // before it begins to disperse.
      pSmooth += (progress.get() - pSmooth) * 0.07
      const p = Math.min(Math.max((pSmooth - 0.28) / 0.62, 0), 1)
      ctx.clearRect(0, 0, W, H)

      const cx = W / 2, cy = H * 0.54
      const s = Math.min(W, H) * 0.48
      const time = performance.now() * 0.001

      // brain-state positions (with a slow breathing wobble)
      const pos: [number, number][] = parts.map((pt, i) => {
        const wob = Math.sin(time * 0.8 + i) * 2.5
        const bx = cx + pt.bx * s + wob
        const by = cy + pt.by * s * 0.92 + Math.cos(time * 0.6 + i * 1.7) * 2.5
        const lp = easeInOut(Math.min(Math.max((p - pt.stagger) / 0.7, 0), 1))
        if (lp === 0 || !rects.length) return [bx, by]
        const [tx, ty] = perimeter(rects[pt.card], pt.t)
        return [bx + (tx - bx) * lp, by + (ty - by) * lp]
      })

      // constellation lines, dissolving as the mind disperses
      const lineAlpha = Math.max(0, 0.28 - p * 0.55)
      if (lineAlpha > 0.004) {
        ctx.strokeStyle = `rgba(${GOLD}, ${lineAlpha})`
        ctx.lineWidth = 0.6
        ctx.beginPath()
        for (const [a, b] of pairs) {
          ctx.moveTo(pos[a][0], pos[a][1])
          ctx.lineTo(pos[b][0], pos[b][1])
        }
        ctx.stroke()
      }

      // particles
      for (let i = 0; i < N; i++) {
        const lp = easeInOut(Math.min(Math.max((p - parts[i].stagger) / 0.7, 0), 1))
        const a = 0.75 - lp * 0.45
        ctx.fillStyle = `rgba(${GOLD}, ${a})`
        const r = 1.4 + (i % 5 === 0 ? 0.9 : 0)
        ctx.beginPath()
        ctx.arc(pos[i][0], pos[i][1], r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [progress, cardRefs])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />
}

function Card({ m, i, progress, refFn }: { m: (typeof mediaReels)[number]; i: number; progress: MotionValue<number>; refFn: (el: HTMLDivElement | null) => void }) {
  const start = 0.52 + i * 0.06
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1])
  const y = useTransform(progress, [start, start + 0.12], [28, 0])
  const scale = useTransform(progress, [start, start + 0.12], [0.94, 1])

  return (
    <motion.div ref={refFn} style={{ opacity, y, scale }} className="relative">
      {m.type === 'youtube' ? (
        <div className="overflow-hidden border border-gold/25 bg-warmdark">
          <YouTube id={m.id} title={m.title} className="!rounded-none" />
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-ivory text-xs md:text-sm truncate">{m.title}</span>
            <span className="label !text-[8px] shrink-0 ml-3">YouTube</span>
          </div>
        </div>
      ) : (
        <a
          href={m.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between aspect-video md:aspect-[16/11] bg-gold p-5 transition-colors duration-300 hover:bg-ink"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-ink group-hover:text-bone transition-colors" aria-hidden>
            <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
          </svg>
          <div className="text-ink group-hover:text-bone transition-colors">
            <p className="font-display text-lg md:text-xl" style={{ letterSpacing: '-0.02em' }}>{m.title}</p>
            <p className="mt-1.5 inline-block !text-[9px] uppercase tracking-[0.15em] font-medium opacity-75">Watch Reel ↗</p>
          </div>
        </a>
      )}
    </motion.div>
  )
}

export default function Media() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const headOpacity = useTransform(scrollYProgress, [0, 0.06, 0.32, 0.46], [0, 1, 1, 0])
  const gridLabelOpacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1])

  const [still, setStill] = useState(false)
  useEffect(() => {
    setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // Reduced-motion / fallback: plain grid
  if (still) {
    return (
      <section id="media" className="block-dark relative py-[14vh] px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="label mb-4">Media</p>
          <h2 className="font-display font-semibold text-ivory mb-14" style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', letterSpacing: '-0.03em' }}>
            Stories in <span className="text-gold">motion.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mediaReels.map((m, i) => (
              <Card key={i} m={m} i={0} progress={scrollYProgress} refFn={() => {}} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    // block-dark: the particle constellation is drawn in orange on transparent
    // and only reads against a black field — this is one of the two moments the
    // practice side goes dark on purpose.
    <section ref={sectionRef} id="media" className="block-dark relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <MorphCanvas progress={scrollYProgress} cardRefs={cardRefs} />

        {/* opening state: the mind */}
        <motion.div style={{ opacity: headOpacity }} className="absolute inset-x-0 top-[9vh] text-center px-6 pointer-events-none z-20">
          <p className="label mb-4">Media</p>
          <h2 className="font-display font-semibold text-ivory" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}>
            One mind. <span className="text-gold">Many mediums.</span>
          </h2>
          <p className="mt-5 text-fog max-w-[420px] mx-auto text-sm md:text-base">
            Keep scrolling — watch the thinking disperse into the work.
          </p>
        </motion.div>

        {/* end state: the work */}
        <motion.p style={{ opacity: gridLabelOpacity }} className="absolute inset-x-0 top-[8vh] text-center label pointer-events-none">
          Stories in motion — reels & showreels
        </motion.p>

        <div className="absolute inset-x-0 top-[22vh] bottom-[8vh] flex items-center px-5 md:px-16">
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-[1300px] mx-auto">
            {mediaReels.map((m, i) => (
              <Card
                key={m.type === 'youtube' ? m.id : m.url}
                m={m}
                i={i}
                progress={scrollYProgress}
                refFn={(el) => { cardRefs.current[i] = el }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
