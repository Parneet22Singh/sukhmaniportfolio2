import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import MarketingFlow from './MarketingFlow'
import QuietField from './QuietField'
import { capabilities } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const

function Moment({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
    >
      {children}
    </motion.div>
  )
}

const child = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

// Giant ghost number behind each moment
function Ghost({ n, className = '' }: { n: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute font-display font-bold text-ivory/[0.04] select-none pointer-events-none leading-none ${className}`}
      style={{ fontSize: '20vw' }}
    >
      {n}
    </span>
  )
}

export default function Services() {
  const revealRef = useRef<HTMLDivElement>(null)
  const revealInView = useInView(revealRef, { once: true, margin: '-20% 0px' })

  return (
    <section id="capabilities" className="relative overflow-hidden py-[16vh] px-6 md:px-12">
      <div className="max-w-[1500px] mx-auto space-y-[15vh]">

        {/* ——— 01 · DIAGNOSIS ——— */}
        <Moment>
          <Ghost n="01" className="top-[-6vw] right-0" />
          <div className="md:w-[60%] relative z-10">
            <motion.p variants={child} className="label-gold mb-6">Diagnosis</motion.p>
            <motion.h3
              variants={child}
              className="font-display font-semibold text-ivory"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
            >
              Find the constraint
            </motion.h3>
            <motion.p variants={child} className="mt-7 max-w-[540px] text-fog leading-relaxed">
              Before a single campaign is briefed: what is actually limiting growth? Usually it is positioning nobody
              agreed on, a funnel that leaks after the click, or two teams working from different definitions of a good
              lead. I go find it in the data, the CRM, the spend history and the conversations nobody has written down.
            </motion.p>
            <motion.p variants={child} className="mt-7 max-w-[540px] text-ivory/80 leading-relaxed border-l-2 border-gold/40 pl-5">
              The deliverable is one sentence, not a deck: <span className="text-gold">here is the constraint, and here is what it costs you.</span>
            </motion.p>
          </div>
        </Moment>

        {/* ——— 02 · DEMAND — coded marketing schematic + gold-block reveal ——— */}
        <Moment className="md:flex md:items-center md:gap-[5%]">
          <Ghost n="02" className="top-[-5vw] left-0" />
          <motion.div
            variants={child}
            className="relative md:w-[38%] aspect-[3/4] rounded-2xl overflow-hidden shadow-soft mb-12 md:mb-0 border border-ivory/10"
            ref={revealRef}
          >
            <MarketingFlow />
            {/* gold block slides away to reveal */}
            <motion.div
              className="absolute inset-0 bg-gold origin-right z-10"
              initial={{ scaleX: 1 }}
              animate={revealInView ? { scaleX: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            />
          </motion.div>
          <div className="relative z-10 md:w-[55%] md:text-right md:flex md:flex-col md:items-end">
            <motion.p variants={child} className="label-gold mb-6">Demand</motion.p>
            <motion.h3
              variants={child}
              className="font-display font-semibold text-ivory"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
            >
              Stories that Sell
            </motion.h3>
            <motion.p variants={child} className="mt-7 max-w-[520px] text-fog leading-relaxed">
              One narrative, carried across OOH, film, creator, social, search and events — so every channel compounds
              the same idea instead of five channels each starting from scratch.
            </motion.p>
            <motion.p variants={child} className="mt-7 max-w-[520px] text-fog leading-relaxed">
              Built backwards from the pipeline target. If a channel cannot show how it moves someone toward a decision,
              it does not get budget.
            </motion.p>
          </div>
        </Moment>

        {/* ——— 03 · MEASUREMENT ——— */}
        <Moment className="text-center">
          <QuietField />
          <Ghost n="03" className="top-[-7vw] left-1/2 -translate-x-1/2" />
          <div className="relative z-10 max-w-[980px] mx-auto">
            <motion.p variants={child} className="label-gold mb-6">Measurement</motion.p>
            <motion.h3
              variants={child}
              className="font-display font-semibold text-ivory"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
            >
              Measured Outcomes
            </motion.h3>
            <motion.p variants={child} className="mt-7 max-w-[620px] mx-auto text-fog leading-relaxed">
              Work that cannot be measured cannot be defended, repeated or funded — it quietly dies in budget review.
              So attribution gets wired to pipeline before the campaign goes live, not after someone asks.
            </motion.p>

            <motion.div variants={child} className="mt-14 grid md:grid-cols-3 gap-4 text-left">
              {[
                { t: 'Track', d: 'Live dashboards and MIS reporting across every channel and market — read by leadership, not filed.' },
                { t: 'Attribute', d: 'Lead attribution and ROI analysis that tie spend to pipeline, so budget conversations use evidence.' },
                { t: 'Decide', d: 'Consumer intelligence and structured testing that tell you what to stop, not just what to start.' },
              ].map((m, i) => (
                <div key={m.t} className="liquid-glass rounded-2xl p-6">
                  <span className="font-display text-fog/50 text-sm">0{i + 1}</span>
                  <h4 className="mt-2 font-display font-semibold text-lg text-ivory">{m.t}</h4>
                  <p className="mt-2 text-fog text-sm leading-relaxed">{m.d}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </Moment>
      </div>

      {/* ——— the full capability set ——— */}
      <div className="relative max-w-[1500px] mx-auto mt-[18vh]">
        <Moment className="mb-[8vh]">
          <motion.p variants={child} className="label mb-5">Where I can help</motion.p>
          <motion.h3
            variants={child}
            className="font-display font-semibold text-ivory max-w-[820px]"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3.6rem)', letterSpacing: '-0.03em', lineHeight: 1.04 }}
          >
            Marketing is the entry point,
            <br className="hidden md:block" /> <span className="text-gold">not the boundary.</span>
          </motion.h3>
        </Moment>

        <Moment className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((c) => (
            <motion.article
              key={c.area}
              variants={child}
              data-cursor="hover"
              className="liquid-glass rounded-2xl p-7 flex flex-col"
            >
              <span className="font-display text-fog/45 text-sm tabular-nums">{c.n}</span>
              <h4
                className="mt-4 font-display font-semibold text-ivory"
                style={{ fontSize: 'clamp(1.15rem, 1.6vw, 1.45rem)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
              >
                {c.area}
              </h4>
              <p className="mt-2.5 text-fog text-sm leading-snug flex-1">{c.lede}.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="label !text-[8px] !text-ivory/55 border border-ivory/12 rounded-full px-2.5 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </Moment>
      </div>
    </section>
  )
}
