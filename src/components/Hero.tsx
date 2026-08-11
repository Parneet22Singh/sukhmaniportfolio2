import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import BlobMorph from './BlobMorph'
import { profile, heroJourney, stats } from '../data/portfolio'

const EASE = [0.22, 1, 0.36, 1] as const
const NAME = 'SUKHMANI'.split('')

// ————————————————————————————————————————————————————————————
// The hero is a scroll journey. A 340vh wrapper holds a sticky 100svh stage;
// `p` (0→1) runs across the sticky range and drives every stage of it.
//
// Nothing here moves on a timer except the one-off entrance of the name. The
// name lift, the portrait, the beats and the melt are all scroll-driven, so
// the whole sequence is under the reader's thumb.
//
//   p 0.00–0.14  SUKHMANI lifts from dead-centre into a masthead and shrinks
//   p 0.03–0.32  the portrait fades up, holds, and clears the stage
//   p 0.26–1.00  three beats carry the argument
//   p 0.72–1.00  the melt rises — while the closing beat is still on screen
//
// SUKHMANI never leaves. It shrinks and holds at the top for the whole
// journey, and only goes as the hero itself scrolls out.
// ————————————————————————————————————————————————————————————

const BEATS: [number, number][] = [
  [0.26, 0.5],
  [0.5, 0.74],
  [0.74, 1],
]

// Piecewise-linear ramp, clamped at both ends.
//
// IMPORTANT: these are *function* transforms rather than
// useTransform(v, [stops], [values]). Given the array form, Framer Motion
// hands a scroll-linked opacity to the compositor as a WAAPI animation on a
// ScrollTimeline — and inside this sticky stage that timeline resolves against
// the wrong range, so values drift (the giant name was fading back in at ~80%
// during the closing beat). Function transforms stay on the main thread.
function ramp(stops: number[], values: number[]) {
  return (v: number) => {
    if (v <= stops[0]) return values[0]
    for (let i = 1; i < stops.length; i++) {
      if (v <= stops[i]) {
        const t = (v - stops[i - 1]) / (stops[i] - stops[i - 1])
        return values[i - 1] + (values[i] - values[i - 1]) * t
      }
    }
    return values[values.length - 1]
  }
}

function useBeat(p: MotionValue<number>, from: number, to: number) {
  const inEnd = from + 0.07
  const outStart = to - 0.06
  const opacity = useTransform(p, ramp([from, inEnd, outStart, to], [0, 1, 1, 0]))
  const y = useTransform(p, ramp([from, inEnd, outStart, to], [44, 0, 0, -36]))
  return { opacity, y }
}

function Beat({
  p, index, kicker, line, sub,
}: {
  p: MotionValue<number>
  index: number
  kicker: string
  line: string
  sub: string
}) {
  const { opacity, y } = useBeat(p, BEATS[index][0], BEATS[index][1])
  return (
    // positioning lives on the outer div — the motion child owns `transform`,
    // so a Tailwind -translate-y-1/2 on the same element would be overwritten
    <div className="absolute inset-x-0 top-[57%] -translate-y-1/2 px-6 md:px-12 text-center">
      <motion.div style={{ opacity, y }} className="max-w-[1000px] mx-auto">
        <p className="label-gold mb-6">
          <span className="tabular-nums">0{index + 1}</span>
          <span className="mx-3 text-fog/40">/</span>
          {kicker}
        </p>
        <h2
          className="font-display font-semibold text-ivory"
          style={{ fontSize: 'clamp(2.1rem, 6vw, 5.6rem)', letterSpacing: '-0.035em', lineHeight: 1.02 }}
        >
          {line}
        </h2>
        <p className="mt-8 mx-auto max-w-[620px] text-fog leading-relaxed text-base md:text-lg">
          {sub}
        </p>
      </motion.div>
    </div>
  )
}

function Tick({ p, index }: { p: MotionValue<number>; index: number }) {
  const [from, to] = BEATS[index]
  const active = useTransform(p, ramp([from - 0.04, from + 0.04, to - 0.04, to + 0.04], [0, 1, 1, 0]))
  const h = useTransform(active, (v) => 14 + v * 26)
  return (
    <div className="relative w-px h-10 bg-ivory/15">
      <motion.div className="absolute top-0 left-0 w-px bg-gold" style={{ height: h, opacity: active }} />
    </div>
  )
}

function Rail({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, ramp([0.2, 0.29, 0.94, 1], [0, 1, 1, 0]))
  return (
    <motion.div
      style={{ opacity }}
      className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4"
      aria-hidden
    >
      {heroJourney.map((_, i) => (
        <Tick key={i} p={p} index={i} />
      ))}
    </motion.div>
  )
}

export default function Hero({ started }: { started: boolean }) {
  const wrapRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const imgOkRef = useRef(true)
  const [reduced, setReduced] = useState(false)

  // How far the name must travel from dead-centre to sit as a masthead.
  // Measured in px so the move is a pure transform (no layout thrash on a very
  // large text node). Kept in a ref as well so the scroll transform below
  // always reads the current measurement.
  const liftRef = useRef(0)
  const [, setLift] = useState(0)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    const measure = () => {
      const sh = stageRef.current?.offsetHeight ?? 0
      const hh = nameRef.current?.offsetHeight ?? 0
      if (!sh || !hh) return
      // centre sits at 0.5·sh; we want the name's top edge at 0.18·sh
      liftRef.current = 0.18 * sh + hh / 2 - 0.5 * sh
      setLift(liftRef.current)
    }
    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure).catch(() => {})
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress: p } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })

  // — SUKHMANI: lifts and shrinks on scroll, then holds for the whole journey —
  const nameLiftY = useTransform(p, (v) => Math.min(Math.max(v / 0.14, 0), 1) * liftRef.current)
  const titleScale = useTransform(p, ramp([0, 0.14], [1, 0.6]))
  const titleNudge = useTransform(p, ramp([0, 0.14], [0, 26]))
  const titleOpacity = useTransform(p, ramp([0, 0.94, 1], [1, 1, 0]))
  const chromeOpacity = useTransform(p, ramp([0.02, 0.1], [1, 0]))

  // — the portrait: entirely scroll-triggered. Absent at rest, fades up as you
  //   begin, holds, then clears out before the beats take the stage —
  const figOpacity = useTransform(p, ramp([0.03, 0.13, 0.22, 0.32], [0, 1, 1, 0]))
  const figY = useTransform(p, ramp([0.03, 0.13], [70, 0]))
  const figScale = useTransform(p, ramp([0.03, 0.13, 0.32], [0.95, 1, 0.88]))

  // — the melt: starts under the closing beat, not after it —
  const meltProgress = useTransform(p, ramp([0.72, 1], [0, 1]))

  // Reduced motion: no journey, no scroll dependency — one static statement.
  if (reduced) {
    return (
      <section id="hero" className="relative min-h-[100svh] overflow-hidden flex flex-col justify-center px-6 md:px-12 py-[18vh]">
        <div className="max-w-[1100px] mx-auto text-center">
          <p className="label mb-8">{profile.discipline} · India → Sydney</p>
          <h1
            className="font-display font-bold text-ivory"
            style={{ fontSize: 'clamp(3rem, 12vw, 11rem)', letterSpacing: '-0.045em', lineHeight: 0.9 }}
          >
            SUKHMANI
          </h1>
          <p className="mt-10 mx-auto max-w-[640px] text-fog leading-relaxed text-lg">
            {profile.positioning}
          </p>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="liquid-glass rounded-2xl px-5 py-6">
                <div className="font-display font-bold text-3xl text-ivory leading-none">{s.value}</div>
                <div className="label mt-2 !text-[9px]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={wrapRef} id="hero" className="relative h-[300vh] md:h-[340vh]">
      <div ref={stageRef} className="sticky top-0 h-[100svh] overflow-hidden">

        {/* eyebrow */}
        <motion.p
          style={{ opacity: chromeOpacity }}
          className="label absolute top-24 md:top-28 inset-x-0 z-40 text-center px-6"
          initial={{ opacity: 0, y: -10 }}
          animate={started ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
        >
          {profile.discipline} · India → Sydney
        </motion.p>

        {/* SUKHMANI — reveals dead-centre on load, then everything after is scroll */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute inset-0 z-10 pointer-events-none select-none"
        >
          {/* the shrink happens about the top edge, so the name rises into a
              masthead rather than collapsing toward the middle of the stage */}
          <motion.div
            style={{ scale: titleScale, y: titleNudge, transformOrigin: 'top center' }}
            className="absolute inset-0"
          >
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-2">
              <motion.h1
                ref={nameRef}
                className="text-center font-display font-bold text-ivory"
                style={{ y: nameLiftY }}
              >
                <span
                  className="inline-block overflow-hidden align-bottom leading-[0.9]"
                  style={{ fontSize: 'clamp(3rem, 13vw, 13rem)', letterSpacing: '-0.045em' }}
                >
                  {NAME.map((c, i) => (
                    <motion.span
                      key={i}
                      className="inline-block will-change-transform"
                      initial={{ y: '118%' }}
                      animate={started ? { y: 0 } : undefined}
                      transition={{ duration: 0.9, delay: 0.05 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {c}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>
            </div>
          </motion.div>
        </motion.div>

        {/* portrait — scroll-triggered: absent at rest, arrives, then clears */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center items-end pointer-events-none">
          <motion.div
            style={{
              transformOrigin: 'bottom center', marginLeft: '4%',
              scale: figScale, opacity: figOpacity, y: figY,
            }}
          >
            <div style={{ height: 'clamp(360px, 78vh, 760px)' }} className="flex items-end justify-center">
              <img
                src="/portrait.png"
                alt={`${profile.name} — ${profile.title}`}
                className="h-full w-auto max-w-[94vw] object-contain object-bottom"
                style={{ filter: 'grayscale(1) contrast(1.06) drop-shadow(0 30px 60px rgba(0,0,0,0.6))' }}
                onError={(e) => {
                  if (imgOkRef.current) {
                    imgOkRef.current = false
                    ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                  }
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* liquid melt — rises under the closing beat */}
        <BlobMorph progress={meltProgress} />

        {/* availability pill */}
        <motion.div style={{ opacity: chromeOpacity }} className="absolute left-[3%] md:left-[6%] bottom-[8%] z-40">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={started ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
            className="flex items-center gap-2 liquid-glass-strong rounded-full px-4 py-2.5 text-ivory text-xs font-medium whitespace-nowrap shadow-pop"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            Sydney · Aug 2026
          </motion.span>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          style={{ opacity: chromeOpacity }}
          className="absolute inset-x-0 bottom-[7%] z-40 flex flex-col items-center gap-3 pointer-events-none"
        >
          <motion.span
            className="label !text-[9px]"
            initial={{ opacity: 0 }}
            animate={started ? { opacity: 1 } : undefined}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            Scroll
          </motion.span>
          <motion.span
            className="block w-px h-10 bg-gradient-to-b from-gold to-transparent"
            initial={{ scaleY: 0 }}
            animate={started ? { scaleY: 1 } : undefined}
            transition={{ delay: 1, duration: 0.8, ease: EASE }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>

        {/* ——— the journey ——— */}
        <Rail p={p} />

        <div className="absolute inset-0 z-30">
          {heroJourney.map((b, i) => (
            <Beat key={b.line} p={p} index={i} kicker={b.kicker} line={b.line} sub={b.sub} />
          ))}
        </div>
      </div>
    </section>
  )
}
