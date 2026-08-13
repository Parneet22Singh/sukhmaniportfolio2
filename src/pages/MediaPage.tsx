import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import Nav from '../components/Nav'
import Contact from '../components/Contact'
import Media from '../components/Media'
import FilmSeries from '../components/FilmSeries'
import FilmRail from '../components/FilmRail'
import YouTube from '../components/YouTube'
import { podcasts } from '../data/portfolio'

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

// Podcasts hosted: the long-form episodes and the Instagram cuts of the same
// conversations, kept in one place because they are one body of work.
function Podcasts() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })

  return (
    <section id="podcasts" className="relative px-6 md:px-12 py-[14vh] scroll-mt-28">
      <div className="max-w-[1300px] mx-auto">
        <motion.div
          className="max-w-[760px] mb-[7vh]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="label mb-5">Hosted</p>
          <h2
            className="font-display font-semibold text-ink"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.6rem)', letterSpacing: '-0.035em', lineHeight: 1 }}
          >
            The <span className="text-gold">podcast.</span>
          </h2>
          <p className="mt-8 max-w-[560px] text-ink/65 leading-relaxed">
            Conceived and hosted - full episodes, plus the cuts that carried them onto social.
          </p>
        </motion.div>

        <div ref={ref} className="grid gap-5 sm:grid-cols-2">
          {podcasts.map((p, i) => (
            <motion.div
              key={p.type === 'youtube' ? p.id : p.url}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.07, ease }}
            >
              {p.type === 'youtube' ? (
                <div className="overflow-hidden border border-ink/15 bg-sand h-full">
                  <YouTube id={p.id} title={p.title} className="!rounded-none" />
                  <div className="px-5 py-4">
                    <p className="font-display font-semibold text-ink leading-snug">{p.title}</p>
                    <p className="label mt-2 !text-[8px]">{p.meta}</p>
                  </div>
                </div>
              ) : (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group flex h-full flex-col justify-between gap-10 border border-ink/15 bg-sand p-6 transition-colors duration-300 hover:bg-ink hover:border-ink"
                >
                  <span className="flex items-center justify-between gap-4 text-ink group-hover:text-bone transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                    </svg>
                    <span className="label !text-[8px] group-hover:!text-bone/70 transition-colors">{p.meta}</span>
                  </span>
                  <span className="text-ink group-hover:text-bone transition-colors">
                    <span className="block font-display font-semibold text-xl leading-snug">{p.title}</span>
                    <span className="mt-2 block label !text-[8px] !text-gold">Watch reel ↗</span>
                  </span>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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

      <Podcasts />

      {/* long-form film */}
      <FilmSeries />

      {/* the constellation comes apart into the work */}
      <Media />

      <Contact />
    </div>
  )
}
