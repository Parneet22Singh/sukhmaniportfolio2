import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import Nav from '../components/Nav'
import Contact from '../components/Contact'
import Media from '../components/Media'
import FilmSeries from '../components/FilmSeries'
import FilmRail from '../components/FilmRail'
import { mediaReels, filmSeries } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const

// ————————————————————————————————————————————————————————————
// The media route.
//
// Runs on sand like every other practice route. It was briefly dark, on the
// theory that the film work wants the lights down, but it read as a different
// website bolted on. The constellation in <Media/> was recoloured to ink
// instead, which is what needed the black field in the first place.
//
// Structure is a reel: a masthead and a running order, then two chapters —
// the mind coming apart into the work, and the long-form film.
// ————————————————————————————————————————————————————————————

// The formats the work has actually shipped in. Doubled in the markup so the
// marquee can translate a full 50% and loop without a visible seam.
const FORMATS = [
  'TVC',
  'Brand film',
  'OOH & DOOH',
  'Guerrilla',
  'Creator-led',
  'Employee advocacy',
  'Podcast',
  'Reels',
  'UGC',
]

function Marquee() {
  return (
    <div className="relative flex overflow-hidden border-y border-ink/15 py-5 select-none" aria-hidden>
      <div className="flex shrink-0 items-center gap-10 pr-10 animate-marquee">
        {[...FORMATS, ...FORMATS].map((f, i) => (
          <span key={`${f}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
            <span
              className="font-display text-xl md:text-2xl text-ink/70"
              style={{ letterSpacing: '-0.02em' }}
            >
              {f}
            </span>
            <span className="text-gold text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// The running order, stated up front the way a reel lists its contents.
function RunningOrder() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  const rows = [
    { n: '01', title: 'The mind', note: 'One idea, dispersed across six channels', count: `${mediaReels.length} pieces` },
    { n: '02', title: 'Film', note: 'Television commercials and a branded series', count: `${filmSeries.length} playlists` },
  ]

  return (
    <div ref={ref} className="px-6 md:px-12 py-[10vh]">
      <div className="max-w-[1300px] mx-auto">
        {rows.map((r, i) => (
          <motion.div
            key={r.n}
            className="grid grid-cols-[auto_1fr_auto] items-baseline gap-6 md:gap-12 border-t border-ink/15 last:border-b py-6"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.08, ease }}
          >
            <span className="font-mono text-[10px] text-gold tracking-[0.2em]">{r.n}</span>
            <span>
              <span
                className="block font-display font-semibold text-ink"
                style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', letterSpacing: '-0.02em' }}
              >
                {r.title}
              </span>
              <span className="mt-1 block text-ink/65 text-sm">{r.note}</span>
            </span>
            <span className="label !text-[9px] whitespace-nowrap">{r.count}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function MediaPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <FilmRail />

      <div className="fixed top-24 left-4 md:left-8 lg:left-20 z-40">
        <Link
          to="/"
          data-cursor="hover"
          className="liquid-glass rounded-full px-4 py-2 inline-flex items-center gap-2 text-ink/70 hover:text-ink text-xs md:text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
      </div>

      {/* --- masthead --- */}
      {/* clamped rather than a bare 26vh: on a short viewport 26vh drops the
          masthead straight under the fixed Home pill */}
      <header
        className="relative px-6 md:px-12 lg:pl-24 pb-[9vh] overflow-hidden"
        style={{ paddingTop: 'clamp(190px, 26vh, 340px)' }}
      >
        <div className="max-w-[1300px] mx-auto">
          <motion.p
            className="label mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            The Reel
          </motion.p>

          <motion.h1
            className="font-display font-semibold text-ink max-w-[16ch]"
            style={{ fontSize: 'clamp(2.6rem, 8vw, 7.5rem)', letterSpacing: '-0.045em', lineHeight: 0.94 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            The work, <span className="text-gold">in motion.</span>
          </motion.h1>

          <motion.p
            className="mt-10 max-w-[560px] text-ink/65 leading-relaxed text-base md:text-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease }}
          >
            Nine years of output, in every format the work has needed - a thirty-second spot, a
            street activation, a series shot when nobody could leave the house.
          </motion.p>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4 }}
      >
        <Marquee />
      </motion.div>

      <RunningOrder />

      {/* --- chapter 01: the constellation comes apart into the work --- */}
      <Media />

      {/* --- chapter 02: long-form film --- */}
      <FilmSeries />

      <Contact />
    </div>
  )
}
