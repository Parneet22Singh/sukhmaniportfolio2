import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion'
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
//   p 0.03–0.22  the portrait fades up, holds, and clears the stage
//   p 0.25–1.00  three beats carry the argument
//   p 0.92–1.00  the melt rises — once the closing beat is typed and read
//
// The portrait used to hang on until 0.32 while beat 01 opened at 0.17, so the
// first statement typed itself over a half-faded photograph. It is gone by
// 0.22 now, and the stage sits empty for a beat before 01 arrives.
//
// The beats sit UNDER the melt (z-30 against the melt's z-60), so the lava
// genuinely drowns the copy rather than flowing behind it. The original
// complaint — that beat 03 was never visible — was a timing problem, not a
// stacking one: the melt used to start at 0.72 while beat 03 opened at 0.74,
// so it was buried the instant it appeared. Beat 03 now opens at 0.70 and is
// fully legible for the whole 0.77–0.88 stretch before the fill reaches it.
//
// SUKHMANI never leaves. It shrinks and holds at the top for the whole
// journey, and only goes as the hero itself scrolls out.
//
// The beats are set deliberately AGAINST the masthead rather than with it.
// Both used to be centred Clash Display at display size, which made the
// argument read as a second helping of the name. They are now rust monospace
// at roughly a fifth the size, left-aligned off the centre line, and they
// TYPE themselves in as you scroll — with a blinking caret — rather than
// fading in.
// ————————————————————————————————————————————————————————————

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

// Windows are deliberately DISJOINT. They used to abut (beat 02 ran to 0.71
// while beat 03 opened at 0.70) and the beats are absolutely positioned on top
// of one another, so for that overlap both were painted at once and the two
// statements sat on top of each other.
//
// The gaps between them are now 0.06 apiece — a held pause on an empty stage
// between one statement and the next, rather than a handover. Beat 03 then
// gets 0.18 to itself before the melt starts at 0.91.
const BEATS: [number, number][] = [
  [0.25, 0.45],
  [0.51, 0.71],
  [0.77, 1.0],
]

// The melt holds off until the closing beat has finished typing AND had a
// beat to be read. It used to start at 0.78, while beat 03 was still typing —
// the curtain drips were coming down through the line before anyone had got
// to the end of it.
const MELT_FROM = 0.92

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

// ——— the statement, typed ———
//
// A typewriter, but driven by scroll position rather than setTimeout. A timed
// version would type itself on mount regardless of where the reader actually
// is, and all three beats would run at once behind a journey that has not
// reached them yet. Here the character count is a function of `p`: scroll
// forward and it types, scroll back and it un-types, which keeps the whole
// hero under the reader's thumb the way the rest of it already is.
//
// Only the integer character count goes into state, so this re-renders once
// per character rather than once per scroll frame.
function useTypedCount(
  p: MotionValue<number>,
  inFrom: number, inTo: number,
  outFrom: number, outTo: number,
  total: number,
) {
  const countAt = (v: number) => {
    const typed = easeOut(clamp01((v - inFrom) / (inTo - inFrom)))
    const erased = clamp01((v - outFrom) / (outTo - outFrom))
    return Math.round(total * clamp01(typed - erased))
  }
  const [n, setN] = useState(() => countAt(p.get()))
  useMotionValueEvent(p, 'change', (v) => setN(countAt(v)))
  return n
}

function Caret({ visible }: { visible: MotionValue<number> }) {
  return (
    <motion.span
      aria-hidden
      className="inline-block text-gold"
      style={{ opacity: visible }}
    >
      <motion.span
        className="inline-block"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      >
        |
      </motion.span>
    </motion.span>
  )
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
  const [from, to] = BEATS[index]

  // Choreography, as fractions of the beat's own window: the rule draws, the
  // prompt line arrives, then the statement types. The erase is quicker than
  // the type, the way a real backspace is.
  const span = to - from
  const ruleIn: [number, number] = [from, from + span * 0.09]
  const kickIn: [number, number] = [from + span * 0.04, from + span * 0.16]
  // Typing finishes by 40% of the beat, the sub by 44%. On beat 03 that puts
  // the line complete at p≈0.82 against a melt that now starts at 0.86 — a
  // clear stretch with the whole statement up and no lava on screen.
  const typeIn: [number, number] = [from + span * 0.14, from + span * 0.4]
  const subIn: [number, number] = [from + span * 0.33, from + span * 0.44]
  const eraseFrom = to - span * 0.15
  const eraseTo = to - span * 0.05
  const fadeOut: [number, number] = [to - span * 0.06, to - span * 0.01]

  const scaleX = useTransform(p, ramp([ruleIn[0], ruleIn[1]], [0, 1]))
  const chromeOut = useTransform(p, ramp([fadeOut[0], fadeOut[1]], [1, 0]))
  const kickOpacity = useTransform(p, ramp([kickIn[0], kickIn[1], fadeOut[0], fadeOut[1]], [0, 1, 1, 0]))
  const kickX = useTransform(p, ramp([kickIn[0], kickIn[1]], [-18, 0]))
  const caretOpacity = useTransform(p, ramp([kickIn[1], typeIn[0], eraseTo, fadeOut[1]], [0, 1, 1, 0]))
  const subOpacity = useTransform(p, ramp([subIn[0], subIn[1], fadeOut[0], fadeOut[1]], [0, 1, 1, 0]))
  const subY = useTransform(p, ramp([subIn[0], subIn[1], fadeOut[0], fadeOut[1]], [18, 0, 0, -14]))

  const typed = useTypedCount(p, typeIn[0], typeIn[1], eraseFrom, eraseTo, line.length)

  return (
    // Deliberately left-aligned and pushed off the centre line. The masthead
    // above is a centred geometric sans at 13vw; this is rust monospace at a
    // fraction of that size. Different face, different colour, different axis
    // — the two no longer read as the same object.
    <div className="absolute inset-x-0 top-[56%] -translate-y-1/2 px-6 md:px-12">
      <div className="max-w-[1500px] mx-auto pl-[8vw] md:pl-[9vw]">
        <div className="max-w-[760px]">
          <motion.div
            className="h-px w-[30%] max-w-[220px] bg-ink/25 origin-left mb-6"
            style={{ scaleX, opacity: chromeOut }}
            aria-hidden
          />

          <motion.p
            className="font-mono text-[9px] md:text-[10px] uppercase text-ink/50 mb-7"
            style={{ letterSpacing: '0.26em', opacity: kickOpacity, x: kickX }}
          >
            <span className="tabular-nums">0{index + 1}</span>
            <span className="mx-3 opacity-40">-</span>
            {kicker}
          </motion.p>

          {/* The full line is rendered invisibly underneath to hold the box
              open; without it the paragraph reflows on every character and the
              sub beneath it jumps around while the statement types. */}
          <h2
            className="relative font-mono font-medium"
            style={{
              color: 'var(--accent-text)',
              fontSize: 'clamp(1.05rem, 2.4vw, 2rem)',
              lineHeight: 1.36,
              letterSpacing: '-0.01em',
            }}
          >
            <span className="invisible" aria-hidden>
              {line}
            </span>
            <span className="absolute inset-0">
              {line.slice(0, typed)}
              <Caret visible={caretOpacity} />
            </span>
          </h2>

          <motion.p
            className="mt-8 max-w-[400px] text-ink/60 text-sm leading-relaxed"
            style={{ opacity: subOpacity, y: subY }}
          >
            {sub}
          </motion.p>
        </div>
      </div>
    </div>
  )
}

function Tick({ p, index }: { p: MotionValue<number>; index: number }) {
  const [from, to] = BEATS[index]
  const active = useTransform(p, ramp([from - 0.04, from + 0.04, to - 0.04, to + 0.04], [0, 1, 1, 0]))
  const h = useTransform(active, (v) => 14 + v * 26)
  return (
    <div className="relative w-px h-10 bg-ink/15">
      <motion.div className="absolute top-0 left-0 w-px bg-gold" style={{ height: h, opacity: active }} />
    </div>
  )
}

// A quiet, permanent instruction for the length of the journey, sitting under
// the beats. The word changes at the last beat: by then the reader has scrolled
// three times and knows how it works — what they need is to be told the end is
// coming, not told to scroll again.
function ScrollHint({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, ramp([0.12, 0.2, 0.86, 0.92], [0, 1, 1, 0]))
  const [atEnd, setAtEnd] = useState(false)
  useMotionValueEvent(p, 'change', (v) => setAtEnd(v > 0.77))

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-x-0 bottom-[6%] z-40 flex flex-col items-center gap-3 pointer-events-none"
      aria-hidden
    >
      <span className="label !text-[9px] !text-ink/45">{atEnd ? 'Almost there' : 'Keep scrolling'}</span>
      {/* a bead running down a hairline, on a loop — the one thing on the
          stage that moves without being scrolled, so it reads as an invitation */}
      <span className="relative block w-px h-12 bg-ink/15 overflow-hidden">
        <motion.span
          className="absolute left-0 top-0 block w-px h-4 bg-gold"
          animate={{ y: [-16, 48] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
        />
      </span>
    </motion.div>
  )
}

function Rail({ p }: { p: MotionValue<number> }) {
  // out before the melt reaches it — the ticks disappear on orange anyway
  const opacity = useTransform(p, ramp([0.26, 0.33, 0.92, 0.97], [0, 1, 1, 0]))
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
  const figOpacity = useTransform(p, ramp([0.03, 0.11, 0.17, 0.22], [0, 1, 1, 0]))
  const figY = useTransform(p, ramp([0.03, 0.11], [70, 0]))
  const figScale = useTransform(p, ramp([0.03, 0.11, 0.22], [0.95, 1, 0.88]))

  // — the melt: starts under the closing beat, not after it —
  // (the melt maps its own 0.72→1 window internally, from the raw scroll value)

  // Reduced motion: no journey, no scroll dependency — one static statement.
  if (reduced) {
    return (
      <section id="hero" className="relative min-h-[100svh] overflow-hidden flex flex-col justify-center px-6 md:px-12 py-[18vh]">
        <div className="max-w-[1100px] mx-auto text-center">
          <p className="label mb-8">
            {profile.discipline} · <span className="whitespace-nowrap">India → Sydney</span>
          </p>
          <h1
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(3rem, 12vw, 11rem)', letterSpacing: '-0.045em', lineHeight: 0.9 }}
          >
            SUKHMANI
          </h1>
          <p className="mt-10 mx-auto max-w-[640px] text-ink/70 leading-relaxed text-lg">
            {profile.positioning}
          </p>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/15">
            {stats.map((s) => (
              <div key={s.label} className="bg-bone px-5 py-6">
                <div className="font-display font-bold text-3xl leading-none">{s.value}</div>
                <div className="label mt-2 !text-[9px]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Taller on phones, not shorter. A wheel notch is ~100px, but a thumb flick
  // is 600-800px — against the old 300vh wrapper (a 1624px scroll range on an
  // 812px screen) one flick moved the journey ~40%, so beats 02 and 03
  // appeared and vanished inside a single swipe. 460vh gives each beat roughly
  // a flick of its own.
  return (
    <section ref={wrapRef} id="hero" className="relative h-[560vh] md:h-[420vh]">
      <div ref={stageRef} className="sticky top-0 h-[100svh] overflow-hidden">

        {/* eyebrow */}
        <motion.p
          style={{ opacity: chromeOpacity }}
          className="label absolute top-24 md:top-28 inset-x-0 z-40 text-center px-6"
          initial={{ opacity: 0, y: -10 }}
          animate={started ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
        >
          {/* the route must never break across lines - "India →" stranded above
              "Sydney" reads as two separate facts */}
          {profile.discipline} · <span className="whitespace-nowrap">India → Sydney</span>
        </motion.p>

        {/* SUKHMANI - reveals dead-centre on load, then everything after is scroll */}
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
                className="text-center font-display font-bold text-ink"
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

        {/* portrait - scroll-triggered: absent at rest, arrives, then clears */}
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
                alt={`${profile.name} - ${profile.title}`}
                className="h-full w-auto max-w-[94vw] object-contain object-bottom"
                /* on bone the heavy black drop-shadow read as grime; a light
                   contrast lift is all the portrait needs to sit on the page */
                style={{ filter: 'grayscale(1) contrast(1.04)' }}
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

        {/* liquid melt - rises behind the closing beat */}
        <BlobMorph triggerRef={wrapRef} from={MELT_FROM} to={1} />

        {/* availability pill */}
        <motion.div style={{ opacity: chromeOpacity }} className="absolute left-[3%] md:left-[6%] bottom-[8%] z-40">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={started ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
            className="flex items-center gap-2 bg-ink text-bone rounded-full px-4 py-2.5 text-xs font-medium whitespace-nowrap"
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
            className="block w-px h-10 bg-gold"
            initial={{ scaleY: 0 }}
            animate={started ? { scaleY: 1 } : undefined}
            transition={{ delay: 1, duration: 0.8, ease: EASE }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>

        {/* Persistent "keep scrolling" cue.
            The opening cue above is tied to chromeOpacity and is gone by p 0.10,
            which left the whole 0.10-0.92 journey with no indication that it is
            driven by scroll at all — the stage just sits there between beats and
            reads as a page that has finished loading. This one runs the length
            of the journey and ducks out before the melt. */}
        <ScrollHint p={p} />

        {/* --- the journey --- */}
        <Rail p={p} />

        {/* below the melt's z-[60] - the lava is meant to swallow this copy */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {heroJourney.map((b, i) => (
            <Beat key={b.line} p={p} index={i} kicker={b.kicker} line={b.line} sub={b.sub} />
          ))}
        </div>
      </div>
    </section>
  )
}
