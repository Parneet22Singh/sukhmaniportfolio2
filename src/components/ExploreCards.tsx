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
    blurb: 'Six capability areas, from go-to-market and brand through team structure and measurement - plus the five bottlenecks in full.',
  },
  {
    to: '/approach',
    n: '02',
    kicker: 'The Method',
    title: 'How an engagement runs',
    blurb: 'Diagnose, prioritise, build, hand over. Four movements, and the first one is not optional.',
  },
  {
    to: '/campaigns',
    n: '03',
    kicker: 'The Proof',
    title: 'Campaigns',
    blurb: 'Real work, real numbers - the problem each one solved and the decision that got it there.',
  },
  {
    to: '/about',
    n: '04',
    kicker: 'The Background',
    title: 'Nine years, three mandates',
    blurb: 'Track record, education, competencies and the work in motion.',
  },
]

// The four doors off the homepage. This was a full-bleed orange block and it
// was far too loud — a whole viewport of #FF5A1E next to an orange-accented
// site reads as a warning label, not a menu. Orange is now down to the kicker
// and the arrow; the weight comes from the hairline grid and the ink hover.
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

        {/* one hairline grid - no cards, no shadows */}
        <div className="grid gap-px bg-ink/15 md:grid-cols-2 mb-4">
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
                className="group card-invert block bg-bone text-ink p-8 md:p-10 h-full transition-colors duration-300 hover:bg-ink hover:text-bone"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="label-gold !text-[12px]">{r.kicker}</span>
                  <span className="font-display text-sm tabular-nums opacity-40">{r.n}</span>
                </div>
                <h3
                  className="mt-6 font-display font-semibold"
                  style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.3rem)', letterSpacing: '-0.025em', lineHeight: 1.05 }}
                >
                  {r.title}
                </h3>
                <p className="mt-5 text-sm leading-relaxed max-w-[46ch] opacity-70">{r.blurb}</p>
                <span className="mt-8 inline-flex items-center gap-2 label !text-gold">
                  Open <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* The media route is the one dark page on the site, so its card is
            dark too — it previews the room it opens into rather than sitting
            in the grid pretending to be another sand tile. */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.8, delay: 0.24, ease }}
        >
          <Link
            to="/media"
            data-cursor="hover"
            className="group relative block overflow-hidden bg-ink text-bone p-8 md:p-12"
          >
            {/* a strip of sprockets, echoing the film rail on the page itself */}
            <span className="absolute inset-y-0 left-0 w-3 flex flex-col justify-around" aria-hidden>
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="block h-[6px] w-[6px] ml-[4px] rounded-[1px] bg-bone/15" />
              ))}
            </span>

            <div className="pl-6 md:pl-8">
              <div className="flex items-baseline justify-between gap-4">
                <span className="label-gold !text-[12px]">The Reel</span>
                <span className="font-display text-sm tabular-nums opacity-40">05</span>
              </div>

              <h3
                className="mt-6 font-display font-semibold max-w-[16ch]"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3.4rem)', letterSpacing: '-0.03em', lineHeight: 1.02 }}
              >
                Media, in motion
              </h3>

              <p className="mt-5 text-sm leading-relaxed max-w-[52ch] opacity-70">
                TVCs, a Covid-era celebrity home-tour series, showreels and social - plus the piece
                that takes one mind apart and scatters it across six channels.
              </p>

              <span className="mt-8 inline-flex items-center gap-3 label !text-gold">
                <span className="grid place-items-center w-8 h-8 rounded-full border border-current">
                  <span className="ml-[3px] block h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-current" />
                </span>
                Open the reel
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
