import { useRef, type ReactNode } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Marked from './Marked'
import { bio, education, profile } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const tensionRef = useRef<HTMLDivElement>(null)
  const strikeInView = useInView(tensionRef, { once: true, margin: '-25% 0px' })
  const { scrollYProgress } = useScroll({ target: tensionRef, offset: ['start end', 'end start'] })
  const lineScale = useTransform(scrollYProgress, [0.1, 0.7], [0, 1])

  return (
    <section id="about" className="relative overflow-hidden">
      {/* ————— THE TENSION ————— */}
      <div ref={tensionRef} className="relative grid md:grid-cols-[55%_45%] gap-16 md:gap-0 px-6 md:px-12 py-[20vh] max-w-[1500px] mx-auto">
        {/* vertical gold line between columns */}
        <motion.div
          className="hidden md:block absolute left-[55%] top-[18vh] bottom-[18vh] w-px bg-gold/50 origin-top"
          style={{ scaleY: lineScale }}
          aria-hidden
        />

        <div className="md:pr-20">
          <Reveal>
            <h2
              className="font-display font-semibold text-ink"
              style={{ fontSize: 'clamp(2.8rem, 6.5vw, 6.5rem)', lineHeight: 1, letterSpacing: '-0.03em' }}
            >
              Most teams optimise{' '}
              <span className="relative inline-block whitespace-nowrap">
                the campaign.
                <svg className="absolute left-0 top-1/2 w-full h-[0.12em] -translate-y-1/2 overflow-visible" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden>
                  <motion.line
                    x1="0" y1="1" x2="100" y2="1"
                    stroke="#FF5A1E" strokeWidth="1.6" vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    animate={strikeInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.1, delay: 0.6, ease: 'easeInOut' }}
                  />
                </svg>
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="md:pl-20 md:mt-20">
          <Reveal delay={0.25}>
            <h3
              className="font-display font-medium text-ink"
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.9rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}
            >
              The problem is almost always <span className="text-gold">further upstream.</span>
            </h3>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-8 max-w-[420px] text-ink/65 leading-relaxed">
              Nine years running growth across India, the Middle East, Canada and Australia taught me that the brief is rarely the
              problem. I work back from the number to find where it actually breaks — then fix that, and build the
              campaign the business needed in the first place.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ————— ABOUT / EDUCATION ————— */}
      <div className="relative px-6 md:px-12 pb-[16vh] max-w-[1500px] mx-auto">
        <Reveal><p className="label mb-14">About</p></Reveal>

        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-16 md:gap-24 items-start">
          <div>
            <Reveal>
              <blockquote
                className="font-display font-medium text-ink"
                style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.4rem)', lineHeight: 1.25, letterSpacing: '-0.02em' }}
              >
                "{bio.pullQuote}"
              </blockquote>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 space-y-5 max-w-[560px]">
                {bio.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="text-ink/65 leading-relaxed"><Marked>{p}</Marked></p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-10 inline-flex items-center gap-3 border border-gold/30 bg-gold/5 rounded-full px-5 py-3 text-gold text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                </span>
                <Marked>{profile.statusBadge}</Marked>
              </p>
            </Reveal>
          </div>

          {/* education — hairline editorial rows */}
          <div>
            <Reveal><p className="label-gold mb-6">Education</p></Reveal>
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={0.1 + i * 0.1}>
                <div className={`border-t border-ink/15 py-6 ${e.highlighted ? 'border-t-gold/40' : ''}`}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className={`font-display text-xl ${e.highlighted ? 'text-gold' : 'text-ink'}`}>{e.degree}</h4>
                    <span className="label whitespace-nowrap">{e.period}</span>
                  </div>
                  <p className="mt-1.5 text-ink/65 text-sm"><Marked>{`${e.institution} · ${e.location}`}</Marked></p>
                  {e.note && <p className="mt-2 label !text-gold">{e.note}</p>}
                </div>
              </Reveal>
            ))}
            <div className="border-t border-ink/15" />
          </div>
        </div>
      </div>
    </section>
  )
}
