import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { operatingModel } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const

// ————————————————————————————————————————————————————————————
// How an engagement runs. A connecting rail draws down the four
// movements as you scroll, so the sequence reads as a process rather
// than four unrelated cards.
// ————————————————————————————————————————————————————————————

function Step({ s, i }: { s: (typeof operatingModel.steps)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-18% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: i * 0.05, ease }}
      className="relative pl-12 md:pl-0 md:grid md:grid-cols-[120px_1fr] md:gap-12 pb-14 last:pb-0"
    >
      {/* node on the rail */}
      <span
        className="absolute left-[-5px] md:left-[115px] top-1.5 w-2.5 h-2.5 rounded-full bg-gold ring-4 ring-bone"
        aria-hidden
      />

      <div className="md:text-right md:pr-8">
        <p className="font-display font-semibold text-gold text-2xl leading-none tabular-nums">{s.n}</p>
        <p className="label mt-2.5 !text-[9px]">{s.duration}</p>
      </div>

      <div className="mt-4 md:mt-0 md:pl-8">
        <h3
          className="font-display font-semibold"
          style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.3rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
        >
          {s.title}
        </h3>
        <p className="mt-4 max-w-[560px] leading-relaxed opacity-70">{s.body}</p>
      </div>
    </motion.div>
  )
}

// `bare` drops the internal header when the section sits under a PageShell
// masthead that already says the same thing.
export default function OperatingModel({ bare = false }: { bare?: boolean }) {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-15% 0px' })

  const railRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 75%', 'end 65%'] })
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    // bone block — the four movements are the page's spine, so they get the
    // light surface and everything around them stays black
    <section id="approach" className={`block-bone relative px-6 md:px-12 overflow-hidden ${bare ? 'pt-[10vh] pb-[16vh]' : 'py-[16vh]'}`}>
      <div className="max-w-[1200px] mx-auto">
        <div ref={headRef} className={`max-w-[760px] mb-[9vh] ${bare ? 'hidden' : ''}`}>
          <motion.p
            className="label mb-5"
            initial={{ opacity: 0, y: 24 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            {operatingModel.label}
          </motion.p>
          <motion.h2
            className="font-display font-semibold"
            style={{ fontSize: 'clamp(2.3rem, 5vw, 5rem)', letterSpacing: '-0.035em', lineHeight: 1 }}
            initial={{ opacity: 0, y: 40 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease }}
          >
            {operatingModel.heading}
          </motion.h2>
          <motion.p
            className="mt-9 max-w-[600px] leading-relaxed text-base md:text-lg opacity-70"
            initial={{ opacity: 0, y: 30 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.22, ease }}
          >
            {operatingModel.body}
          </motion.p>
        </div>

        <div ref={railRef} className="relative">
          {/* the rail */}
          <div className="absolute left-0 md:left-[120px] top-2 bottom-2 w-px bg-ink/15" aria-hidden />
          <motion.div
            className="absolute left-0 md:left-[120px] top-2 bottom-2 w-px bg-gold origin-top"
            style={{ scaleY: railScale }}
            aria-hidden
          />

          {operatingModel.steps.map((s, i) => (
            <Step key={s.n} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
