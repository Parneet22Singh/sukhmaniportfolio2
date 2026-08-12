import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CampaignPage from '../components/CampaignPage'
import SocialCards from '../components/SocialCards'
import { oohCampaign as data } from '../data/portfolio'

const AMBER = '#F5C518' // bright - bands, glows, borders
const AMBER_INK = '#FFCE3A' // bright amber - readable accent text on dark
const ease = [0.22, 1, 0.36, 1] as const

// The campaign's own headlines, running like city traffic.
const HEADLINES = [
  'THREESOME ON YOUR BUCKET LIST?',
  'THEKA KITNI DOOR HAI?',
  'SIZE DOES MATTER.',
  'CAN WE TAKE YOUR WIFE ON A DATE?',
]

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 44 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease }}>
      {children}
    </motion.div>
  )
}

export default function OOHCampaign() {
  return (
    <CampaignPage currentSlug="ooh-campaign" accent={AMBER}>
      {/* ----- HERO ----- */}
      <section className="relative pt-36 pb-[8vh] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12]" style={{ background: `radial-gradient(ellipse 60% 45% at 65% 15%, ${AMBER}, transparent 65%)` }} />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="label mb-6" style={{ color: AMBER_INK }}>Square Yards · {data.period} · {data.type}</p>
          <h1 className="font-display font-semibold text-ivory" style={{ fontSize: 'clamp(3rem, 8.5vw, 8.5rem)', lineHeight: 0.92, letterSpacing: '-0.04em' }}>
            Billboards that got
            <br />
            <span style={{ color: AMBER_INK }}>India talking.</span>
          </h1>
          <div className="mt-10 flex flex-col md:flex-row md:items-end gap-8 justify-between">
            <p className="max-w-[520px] text-fog leading-relaxed text-lg">{data.theme}</p>
            <div className="flex gap-2.5 flex-wrap shrink-0">
              {data.tags.map((t) => (
                <span key={t} className="label border border-ivory/15 rounded-full px-4 py-2 !text-ivory/70">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----- headline ticker - the actual copy that ran ----- */}
      {/* `flex` on the wrapper is load-bearing. Without it the track below is a
          block-level flex container, so it inherits the wrapper's width instead
          of sizing to its content and `shrink-0` has no flex parent to act on.
          The keyframe translates -50% of the track, so -50% was half the
          VIEWPORT rather than half the copy: the ribbon crawled at about 5px a
          second whatever duration it was given.

          Doubled, not tripled, for the same reason — -50% only lands back on an
          identical frame when the track is exactly two copies. */}
      <div className="flex overflow-hidden py-5 select-none" style={{ background: AMBER }} aria-hidden>
        <div className="flex shrink-0 gap-14 pr-14 animate-marquee whitespace-nowrap" style={{ animationDuration: '18s' }}>
          {[...HEADLINES, ...HEADLINES].map((h, i) => (
            <span key={i} className="font-display font-semibold text-2xl md:text-3xl tracking-tight flex items-center gap-14" style={{ color: '#231D33' }}>
              {h} <span className="text-sm opacity-60">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ----- THE CITY AS CANVAS: billboard gallery ----- */}
      <section className="relative py-[12vh] px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display font-semibold text-ivory" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}>
              The city was
              <br />
              the <span style={{ color: AMBER_INK }}>canvas.</span>
            </h2>
            <p className="label max-w-[280px] md:text-right leading-relaxed">
              {data.images.length} placements · high-traffic corridors, transit shelters & DOOH screens
            </p>
          </Reveal>

        </div>
        {/* fanned deck of the actual billboards - drag / paginate / click to open */}
        <SocialCards cards={data.images.map((img) => ({ imgUrl: img.url, alt: img.caption, linkUrl: img.url }))} />
      </section>

      {/* ----- WHY IT WORKED ----- */}
      <section className="relative pb-[12vh] px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-[55%_45%] gap-12 items-start border-t border-ivory/10 pt-[8vh]">
          <Reveal>
            <h3 className="font-display font-semibold text-ivory" style={{ fontSize: 'clamp(1.8rem, 3.4vw, 3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Risk was the strategy. <span style={{ color: AMBER_INK }}>Attention was the return.</span>
            </h3>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fog leading-relaxed">
              In a housing market where every competitor shouted the same promises, Square Yards said something nobody expected - out loud, in traffic, at 40 feet wide. Double-entendre headlines earned double-takes, social shares and press pickup, extending a static OOH buy into an always-on digital conversation.
            </p>
            <div className="mt-8 flex gap-10">
              <div><p className="font-display font-semibold text-3xl" style={{ color: AMBER_INK }}>2021–22</p><p className="label mt-1.5">Campaign run</p></div>
              <div><p className="font-display font-semibold text-3xl" style={{ color: AMBER_INK }}>OOH + DOOH</p><p className="label mt-1.5">+ social extension</p></div>
            </div>
          </Reveal>
        </div>
      </section>
    </CampaignPage>
  )
}
