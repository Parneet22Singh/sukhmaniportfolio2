import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { bottlenecks } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const

// ————————————————————————————————————————————————————————————
// The diagnosis, kept scannable: keyword, the symptom in the client's own
// words, and the fix in one line. The long "what is actually happening"
// analysis was cut — a reader deciding whether to hire wants to recognise
// their problem fast, not read an essay about it.
// ————————————————————————————————————————————————————————————

function Row({ b, i }: { b: (typeof bottlenecks)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.05, ease }}
      className="group relative border-t border-ink/15 last:border-b py-8 md:py-9 transition-colors duration-500 hover:bg-ink/[0.03]"
    >
      <span
        className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-700 ease-out group-hover:w-full"
        aria-hidden
      />

      <div className="grid gap-4 md:gap-10 md:grid-cols-[auto_1fr_1fr] md:items-baseline">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-sm tabular-nums opacity-40">{b.n}</span>
          <h3
            className="font-display font-semibold transition-colors duration-400 group-hover:text-gold"
            style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2.1rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
          >
            {b.keyword}
          </h3>
        </div>

        <p className="leading-snug md:pl-4 opacity-70">“{b.symptom}”</p>

        <p className="text-sm leading-snug md:border-l-2 md:border-gold md:pl-5">
          <span className="label-gold !text-[8px] block mb-1.5">The fix</span>
          {b.fix}
        </p>
      </div>
    </motion.div>
  )
}

export default function Bottlenecks() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-15% 0px' })

  return (
    // bone block: the diagnosis table is the one thing on this page a reader
    // will actually scan line by line, so it gets the light surface
    <section id="bottlenecks" className="block-bone relative py-[14vh] px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1500px] mx-auto">
        <div ref={headRef} className="max-w-[760px] mb-[7vh]">
          <motion.p
            className="label mb-5"
            initial={{ opacity: 0, y: 24 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            The Diagnosis
          </motion.p>
          <motion.h2
            className="font-display font-semibold"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.8rem)', letterSpacing: '-0.035em', lineHeight: 0.99 }}
            initial={{ opacity: 0, y: 40 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease }}
          >
            Five ways growth <span className="text-gold">breaks.</span>
          </motion.h2>
        </div>

        <div>
          {bottlenecks.map((b, i) => (
            <Row key={b.n} b={b} i={i} />
          ))}
        </div>

        <motion.p
          className="mt-12 opacity-70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8 }}
        >
          Recognise one?{' '}
          <a href="#contact" className="text-gold u-link">
            That is the conversation worth having.
          </a>
        </motion.p>
      </div>
    </section>
  )
}
