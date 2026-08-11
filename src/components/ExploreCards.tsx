import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// The homepage is an introduction, not the whole story. These are the doors.
const ROUTES = [
  {
    to: '/capabilities',
    n: '01',
    kicker: 'The Practice',
    title: 'What I can take on',
    blurb: 'Six capability areas, from go-to-market and brand through team structure and measurement — plus the five bottlenecks in full.',
  },
  {
    to: '/approach',
    n: '02',
    kicker: 'The Method',
    title: 'How an engagement runs',
    blurb: 'Diagnose, prioritise, build, hand over. Four movements, and the first one is not optional.',
  },
  {
    to: '/ooh-campaign',
    n: '03',
    kicker: 'The Proof',
    title: 'Campaigns',
    blurb: 'Real work, real numbers — the problem each one solved and the decision that got it there.',
  },
  {
    to: '/about',
    n: '04',
    kicker: 'The Background',
    title: 'Nine years, three mandates',
    blurb: 'Track record, education, competencies and the work in motion.',
  },
]

export default function ExploreCards() {
  return (
    <section className="relative px-6 md:px-12 py-[14vh]">
      <div className="max-w-[1300px] mx-auto">
        <motion.p
          className="label mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease }}
        >
          Go deeper
        </motion.p>

        <div className="grid gap-4 md:grid-cols-2">
          {ROUTES.map((r, i) => (
            <motion.div
              key={r.to}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 0.75, delay: i * 0.06, ease }}
            >
              <Link
                to={r.to}
                data-cursor="hover"
                className="group block liquid-glass rounded-[24px] p-8 md:p-10 h-full transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="label !text-[9px] !text-gold/80">{r.kicker}</span>
                  <span className="font-display text-fog/40 text-sm tabular-nums">{r.n}</span>
                </div>
                <h3
                  className="mt-6 font-display font-semibold text-ivory transition-colors duration-300 group-hover:text-gold"
                  style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.3rem)', letterSpacing: '-0.025em', lineHeight: 1.05 }}
                >
                  {r.title}
                </h3>
                <p className="mt-5 text-fog text-sm leading-relaxed max-w-[46ch]">{r.blurb}</p>
                <span className="mt-8 inline-flex items-center gap-2 label !text-ivory/60 group-hover:!text-gold transition-colors">
                  Open <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
