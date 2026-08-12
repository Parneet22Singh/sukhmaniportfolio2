import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CampaignPage from '../components/CampaignPage'
import YouTube from '../components/YouTube'
import { parkingTicket as data } from '../data/portfolio'

const ORANGE = '#FF7A1A'
const ease = [0.22, 1, 0.36, 1] as const

// Diagonal caution tape — the campaign's visual signature.
function CautionTape({ text, reverse = false }: { text: string; reverse?: boolean }) {
  return (
    <div className={`overflow-hidden py-3 select-none ${reverse ? '-rotate-1' : 'rotate-1'}`} style={{ background: ORANGE }} aria-hidden>
      <div className="flex shrink-0 gap-10 animate-marquee whitespace-nowrap" style={reverse ? { animationDirection: 'reverse', animationDuration: '3s' } : { animationDuration: '3s' }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="font-mono font-bold text-[13px] tracking-[0.3em] text-[#231D33] uppercase">
            {text} ⚠
          </span>
        ))}
      </div>
    </div>
  )
}

function Sect({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 44 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease }}>
      {children}
    </motion.div>
  )
}

export default function ParkingTicket() {
  const ticketRef = useRef<HTMLDivElement>(null)
  const ticketInView = useInView(ticketRef, { once: true, margin: '-20% 0px' })

  return (
    <CampaignPage currentSlug="parking-ticket" accent={ORANGE}>
      {/* ----- HERO: YOU'VE BEEN TICKETED ----- */}
      <section className="relative pt-36 pb-[10vh] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.14]" style={{ background: `radial-gradient(ellipse 70% 50% at 50% 20%, ${ORANGE}, transparent 70%)` }} />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="label mb-6" style={{ color: ORANGE }}>
            Square Yards · Guerrilla / Hyperlocal Activation · Executed by {data.executedBy}
          </p>
          <h1 className="font-display font-semibold text-ivory" style={{ fontSize: 'clamp(3rem, 9vw, 9rem)', lineHeight: 0.92, letterSpacing: '-0.04em' }}>
            You've been
            <br />
            <span style={{ color: ORANGE }}>ticketed.</span>
          </h1>
          <p className="mt-8 max-w-[520px] text-fog leading-relaxed text-lg">
            <em className="text-ivory not-italic font-medium">"{data.officialName}"</em> - {data.description}
          </p>
        </div>
      </section>

      <CautionTape text="Violation · Occupying space you don't own" />

      {/* ----- THE TICKET ----- */}
      <section className="relative py-[12vh] px-6">
        <motion.div
          ref={ticketRef}
          initial={{ opacity: 0, y: 60, rotate: -4 }}
          animate={ticketInView ? { opacity: 1, y: 0, rotate: -1.5 } : {}}
          transition={{ duration: 0.9, ease }}
          className="relative max-w-[560px] mx-auto font-mono text-[#231D33] rounded-sm shadow-soft"
          style={{ background: '#F2EDE4' }}
        >
          {/* perforation */}
          <div className="absolute -top-[7px] inset-x-0 flex justify-between px-2" aria-hidden>
            {Array.from({ length: 22 }).map((_, i) => (
              <span key={i} className="w-3 h-3 rounded-full bg-midnight inline-block" />
            ))}
          </div>

          <div className="px-7 md:px-10 pt-10 pb-8">
            <div className="flex items-center justify-between border-b-2 border-dashed border-midnight/30 pb-4">
              <span className="text-[11px] tracking-[0.25em] font-bold">SQUARE YARDS · CIVIC NOTICE</span>
              <span className="text-[10px] px-2 py-1 font-bold text-white" style={{ background: ORANGE }}>NOTICE</span>
            </div>
            <p className="mt-5 text-2xl md:text-3xl font-bold tracking-tight">PARKING VIOLATION</p>

            {[
              ['VIOLATION', "Occupying space you don't own"],
              ['LOCATION', data.cities.join(' · ')],
              ['DATE', data.dates],
              ['ISSUED BY', data.executedBy],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 items-baseline border-b border-midnight/15 py-3.5 text-[13px]">
                <span className="text-[#231D33]/50 tracking-[0.2em] shrink-0">{k}</span>
                <span className="text-right font-medium">{v}</span>
              </div>
            ))}

            <div className="pt-5">
              <span className="text-[#231D33]/50 tracking-[0.2em] text-[11px]">AMOUNT DUE</span>
              <p className="text-4xl font-bold mt-1">Priceless</p>
              <p className="text-[#231D33]/60 text-[11px] mt-1.5">…so find a space that's yours. squareyards.com</p>
            </div>
          </div>

          {/* rubber stamp slams in */}
          <motion.div
            initial={{ opacity: 0, scale: 2.4, rotate: 8 }}
            animate={ticketInView ? { opacity: 1, scale: 1, rotate: -14 } : {}}
            transition={{ duration: 0.45, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute top-8 right-6 border-[3px] rounded px-4 py-2 font-bold tracking-[0.2em] text-lg pointer-events-none"
            style={{ borderColor: ORANGE, color: ORANGE, maskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\'%3E%3Cfilter id=\'g\'%3E%3CfeTurbulence baseFrequency=\'.6\'/%3E%3CfeColorMatrix values=\'0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .8 0\'/%3E%3C/filter%3E%3Crect width=\'120\' height=\'60\' filter=\'url(%23g)\'/%3E%3C/svg%3E")' }}
          >
            VIOLATION
          </motion.div>
        </motion.div>
      </section>

      {/* ----- PENALTY SCHEDULE (stats) ----- */}
      <section className="relative border-y border-ivory/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4">
          {data.stats.map((s, i) => (
            <Sect key={s.label} className={`px-8 py-12 text-center ${i < 3 ? 'md:border-r border-ivory/10' : ''} ${i % 2 === 0 ? 'border-r md:border-r' : ''}`}>
              <p className="font-mono font-bold text-3xl md:text-4xl" style={{ color: ORANGE }}>{s.value}</p>
              <p className="label mt-3">{s.label}</p>
            </Sect>
          ))}
        </div>
      </section>

      {/* ----- EXHIBIT A: the film ----- */}
      <section className="relative py-[12vh] px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <Sect>
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-display font-semibold text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)', letterSpacing: '-0.03em' }}>
                Exhibit <span style={{ color: ORANGE }}>A</span>
              </h2>
              <span className="label font-mono">Case Nº SY-2026-0527</span>
            </div>
            <div className="rounded-2xl overflow-hidden border-2 border-dashed shadow-soft" style={{ borderColor: `${ORANGE}55` }}>
              <YouTube id={data.videoId} title="Parking Ticket campaign film" className="!rounded-none" />
            </div>
          </Sect>
        </div>
      </section>

      {/* ----- WITNESS STATEMENTS (quotes) ----- */}
      <section className="relative pb-[12vh] px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <Sect><p className="label mb-10" style={{ color: ORANGE }}>Witness Statements</p></Sect>
          <div className="grid md:grid-cols-2 gap-6">
            {data.quotes.map((q, i) => (
              <Sect key={q.name} className={i === 1 ? 'md:mt-14' : ''}>
                <figure className="liquid-glass rounded-2xl p-8 md:p-10 h-full">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-fog">STATEMENT {i + 1} OF {data.quotes.length}</span>
                  <blockquote className="mt-5 text-ivory/90 leading-relaxed font-serif text-lg italic">"{q.quote}"</blockquote>
                  <figcaption className="mt-7 pt-5 border-t border-ivory/10">
                    <p className="text-ivory font-medium">{q.name}</p>
                    <p className="label mt-1">{q.role}</p>
                  </figcaption>
                </figure>
              </Sect>
            ))}
          </div>
        </div>
      </section>

      <CautionTape text="3,00,000+ interactions · 3 cities · 3 days" reverse />

      {/* ----- CASE FILES (press) ----- */}
      <section className="relative py-[12vh] px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <Sect>
            <h2 className="font-display font-semibold text-ivory mb-12" style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)', letterSpacing: '-0.03em' }}>
              The case made <span style={{ color: ORANGE }}>headlines.</span>
            </h2>
          </Sect>
          <div className="grid md:grid-cols-3 gap-5">
            {data.press.map((p, i) => (
              <Sect key={p.outlet} className={i === 1 ? 'md:-mt-6' : ''}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block liquid-glass rounded-2xl p-7 h-full transition-transform duration-500 hover:-translate-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.2em] px-2.5 py-1.5 border" style={{ color: ORANGE, borderColor: `${ORANGE}66` }}>
                      FILE {String(i + 1).padStart(2, '0')} · {p.tag.toUpperCase()}
                    </span>
                    <span className="text-fog group-hover:text-ivory transition-colors">↗</span>
                  </div>
                  <p className="mt-6 text-ivory leading-snug font-medium">"{p.title}"</p>
                  <p className="label mt-6 pt-4 border-t border-ivory/10">{p.outlet}</p>
                </a>
              </Sect>
            ))}
          </div>
        </div>
      </section>
    </CampaignPage>
  )
}
