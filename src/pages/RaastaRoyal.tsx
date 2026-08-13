import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CampaignPage from '../components/CampaignPage'
import YouTube from '../components/YouTube'
import { raastaRoyal as data } from '../data/portfolio'

const GOLD = '#E7C873' // pale gold - decorative (sprockets, canisters, glows)
const GOLD_INK = '#EBCE84' // bright gold - readable accent text on dark
const ease = [0.22, 1, 0.36, 1] as const

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay, ease }}>
      {children}
    </motion.div>
  )
}

// 35mm sprocket strip.
//
// This was black film stock with near-black perforations, sitting on a black
// page — three blacks inside 10% of each other, so the frame that is supposed
// to make the video read as a strip of film was completely invisible. The
// stock is now a warm grey and the perforations are the page ground, which is
// the right way round anyway: a perforation is a hole you see through.
function Sprockets({ edge }: { edge: 'top' | 'bottom' }) {
  return (
    <div
      className={`flex justify-between px-2 py-2.5 bg-[#2B2620] ${
        edge === 'top' ? 'border-b' : 'border-t'
      } border-[#E7C873]/20`}
      aria-hidden
    >
      {Array.from({ length: 16 }).map((_, i) => (
        <span key={i} className="w-3.5 h-2.5 rounded-[3px] bg-[#0B0A09]" />
      ))}
    </div>
  )
}

export default function RaastaRoyal() {
  return (
    <CampaignPage currentSlug="raasta-royal" accent={GOLD}>
      {/* ----- HERO: title card ----- */}
      <section className="relative pt-40 pb-[8vh] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.16]" style={{ background: `radial-gradient(ellipse 55% 40% at 50% 10%, #6B4E9E, transparent 65%), radial-gradient(ellipse 40% 30% at 50% 55%, ${GOLD}33, transparent 70%)` }} />
        <div className="relative max-w-[1100px] mx-auto px-6 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-5 mb-8" aria-hidden>
              <span className="block w-16 h-px bg-ivory/25" />
              <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
                <path d="M2 17h22M3 17 1 5l6.5 5L13 2l5.5 8L25 5l-2 12" stroke={GOLD} strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
              <span className="block w-16 h-px bg-ivory/25" />
            </div>
            <p className="label mb-6" style={{ color: GOLD_INK }}>{data.brand} presents · A Brand Film</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display font-semibold text-ivory" style={{ fontSize: 'clamp(3rem, 9vw, 9rem)', lineHeight: 0.95, letterSpacing: '-0.04em' }}>
              Raasta bhi
              <br />
              <span className="text-gradient font-serif italic font-normal">Royal</span>
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-10 font-serif italic text-xl md:text-2xl text-ivory/80">"{data.filmQuote}"</p>
          </Reveal>
        </div>
      </section>

      {/* ----- NOW SCREENING: letterboxed film ----- */}
      <section className="relative py-[8vh] px-6 md:px-12">
        <div className="max-w-[1050px] mx-auto">
          <Reveal>
            <p className="label text-center mb-8 tracking-[0.3em]" style={{ color: GOLD_INK }}>◆ Now Screening ◆</p>
            {/* gold hairline rather than ivory/10: on this page the frame is
                the point, and a 10% white edge on black does not read */}
            <div className="rounded-xl overflow-hidden border border-[#E7C873]/25 bg-[#2B2620]">
              <Sprockets edge="top" />
              <YouTube id={data.videoId} start={data.videoStart} title="Raasta bhi Royal - brand film" className="!rounded-none" />
              <Sprockets edge="bottom" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----- CREDITS ----- */}
      <section className="relative py-[10vh] px-6 border-y border-ivory/10">
        <div className="max-w-[640px] mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="font-display font-semibold text-ivory" style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3.2rem)', letterSpacing: '-0.03em' }}>
              The <span style={{ color: GOLD_INK }}>credits.</span>
            </h2>
          </Reveal>
          {data.brief.map((b, i) => (
            <Reveal key={b.label} delay={i * 0.07}>
              <div className="flex items-baseline justify-between gap-8 py-5 border-b border-ivory/10 last:border-0">
                <span className="label shrink-0">{b.label}</span>
                <span className="font-serif italic text-lg text-ivory text-right">{b.value}</span>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.3} className="text-center mt-12">
            <p className="text-fog leading-relaxed">{data.description}</p>
          </Reveal>
        </div>
      </section>

      {/* The "Coming Attractions" grid lived here: three dashed placeholders
          reading "Reel drops soon" for cuts that do not exist. An empty promise
          on a proof page costs more than the space it fills. */}
      <section className="relative py-[10vh] px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          {/* press */}
          {data.press.length > 0 && (
            <Reveal className="mt-16">
              {data.press.map((p) => (
                <a
                  key={p.url}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group liquid-glass rounded-2xl p-7 flex items-center justify-between gap-6 transition-transform duration-500 hover:-translate-y-1"
                >
                  <div>
                    <span className="label" style={{ color: GOLD_INK }}>{p.tag} · {p.outlet}</span>
                    <p className="mt-2.5 text-ivory font-medium leading-snug">{p.title}</p>
                  </div>
                  <span className="text-fog group-hover:text-ivory transition-colors shrink-0 text-xl">↗</span>
                </a>
              ))}
            </Reveal>
          )}
        </div>
      </section>
    </CampaignPage>
  )
}
