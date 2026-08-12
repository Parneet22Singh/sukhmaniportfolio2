import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { experience } from '../data/portfolio'

// Editorial career index: hairline rows, oversized indices, expand-on-click.
export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [open, setOpen] = useState(0)

  return (
    <section id="experience" className="relative py-[16vh] px-6 md:px-12 overflow-hidden">
      <div ref={ref} className="relative max-w-[1500px] mx-auto">
        <motion.p
          className="label mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Track Record
        </motion.p>
        <motion.h2
          className="font-display font-semibold text-ink mb-20"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Nine years, <span className="text-gold">three mandates.</span>
        </motion.h2>

        {experience.map((xp, i) => {
          const isOpen = open === i
          return (
            <motion.div
              key={xp.role}
              className="border-t border-ink/15 last:border-b"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full grid grid-cols-[auto_1fr_auto] items-baseline gap-6 md:gap-10 py-9 text-left group"
              >
                <span className="font-display text-ink/55 text-sm md:text-base tabular-nums">0{i + 1}</span>
                <span>
                  <span className={`block font-display font-medium transition-colors duration-300 ${isOpen ? 'text-gold' : 'text-ink group-hover:text-gold'}`}
                    style={{ fontSize: 'clamp(1.3rem, 2.6vw, 2.3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                    {xp.role}
                  </span>
                  <span className="label mt-2 block">{xp.company} · {xp.location}</span>
                </span>
                <span className="justify-self-end text-right">
                  <span className="label block">{xp.period}</span>
                  <span className={`label-gold mt-1.5 block transition-transform duration-400 ${isOpen ? 'rotate-45' : ''} origin-center w-fit ml-auto text-lg`}>+</span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10 md:pl-[4.5rem] max-w-4xl">
                      <div className="mb-8 border-l-2 border-gold/40 pl-5">
                        <p className="label-gold !text-[9px] mb-2">The mandate</p>
                        <p className="text-ink/80 leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)' }}>
                          {xp.mandate}
                        </p>
                      </div>
                      {xp.teams.length > 0 && (
                        <div className="flex gap-2.5 mb-6 flex-wrap">
                          {xp.teams.map((t) => (
                            <span key={t} className="label-gold border border-gold/25 rounded-full px-3.5 py-1.5">{t}</span>
                          ))}
                        </div>
                      )}
                      <ul className="space-y-3.5">
                        {xp.points.map((p) => (
                          <li key={p.slice(0, 24)} className="flex gap-4 text-ink/65 leading-relaxed">
                            <span className="text-gold mt-0.5 shrink-0">→</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
