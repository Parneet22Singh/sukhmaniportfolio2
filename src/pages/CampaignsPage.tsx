import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import { campaignIndex, filmIndex } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const

// ————————————————————————————————————————————————————————————
// The campaigns index.
//
// This replaces the nav dropdown. A hover menu is a poor home for the single
// largest body of work on the site — it cannot be linked to, it cannot be
// scrolled, and on touch it needs a tap just to reveal what is inside.
//
// The first pass at this page was a grid of sand tiles with type on them, and
// it read as an empty spreadsheet: a page about the most visual work in the
// portfolio that showed none of it. Every entry now leads with its own still,
// carries its own accent, and states its result — so the page is the work
// rather than a table of contents for it.
// ————————————————————————————————————————————————————————————

// Every other card runs image-right on desktop, so the eye zig-zags down the
// page instead of scanning a column.
function Campaign({ c, i }: { c: (typeof campaignIndex)[number]; i: number }) {
  const flip = i % 2 === 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.8, delay: (i % 2) * 0.05, ease }}
    >
      <Link
        to={`/${c.slug}`}
        data-cursor="hover"
        className={`group grid md:grid-cols-2 bg-ink text-bone overflow-hidden ${flip ? 'md:[direction:rtl]' : ''}`}
      >
        {/* the still */}
        <span className="relative block aspect-[4/3] md:aspect-auto md:min-h-[380px] overflow-hidden [direction:ltr]">
          <img
            src={c.cover}
            alt={c.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
          />
          {/* accent wash, lifted on hover so the frame comes forward */}
          <span
            className="absolute inset-0 mix-blend-multiply opacity-70 transition-opacity duration-500 group-hover:opacity-30"
            style={{ background: c.accent }}
            aria-hidden
          />
        </span>

        {/* the copy */}
        <span className="relative block p-8 md:p-12 flex-col justify-between [direction:ltr]">
          {/* the campaign's colour, as a rule down the edge of the text */}
          <span
            className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5"
            style={{ background: c.accent }}
            aria-hidden
          />

          <span className="flex items-baseline justify-between gap-4">
            <span className="label !text-[11px]" style={{ color: c.accent }}>
              {c.kicker}
            </span>
            <span className="label !text-[10px] !text-bone/45 whitespace-nowrap">{c.period}</span>
          </span>

          <span
            className="mt-8 block font-display font-semibold"
            style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.9rem)', letterSpacing: '-0.03em', lineHeight: 1.03 }}
          >
            {c.title}
          </span>

          <span className="mt-5 block text-sm md:text-base leading-relaxed text-bone/65 max-w-[46ch]">
            {c.blurb}
          </span>

          <span
            className="mt-10 inline-flex items-center gap-3 label !text-[10px]"
            style={{ color: c.accent }}
          >
            <span className="grid place-items-center w-9 h-9 rounded-full border border-current transition-colors duration-300 group-hover:bg-current">
              <span className="block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-ink">
                →
              </span>
            </span>
            Open the case
          </span>
        </span>
      </Link>
    </motion.div>
  )
}

export default function CampaignsPage() {
  return (
    <PageShell
      kicker="The Proof"
      title="The work,"
      accent="campaign by campaign."
      lede="Each one started as a problem nobody could solve with more budget. Every page below carries the problem, the call that was made, and what happened next."
    >
      <section className="relative px-6 md:px-12 pb-[8vh]">
        <div className="max-w-[1300px] mx-auto grid gap-5">
          {campaignIndex.map((c, i) => (
            <Campaign key={c.slug} c={c} i={i} />
          ))}
        </div>
      </section>

      {/* The film work is not a campaign, but anyone who came looking for the
          campaigns is looking for this too. */}
      <section className="relative px-6 md:px-12 pb-[14vh]">
        <div className="max-w-[1300px] mx-auto">
          <motion.p
            className="label mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Also on film
          </motion.p>

          <div className="grid gap-px bg-ink/15 md:grid-cols-2">
            {filmIndex.map((f, i) => (
              <motion.div
                key={f.to}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-12% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.06, ease }}
              >
                <Link
                  to={f.to}
                  data-cursor="hover"
                  className="group card-invert flex h-full items-baseline justify-between gap-6 bg-bone text-ink p-8 transition-colors duration-300 hover:bg-ink hover:text-bone"
                >
                  <span>
                    <span className="label-gold !text-[11px]">{f.kicker}</span>
                    <span
                      className="mt-4 block font-display font-semibold"
                      style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)', letterSpacing: '-0.025em', lineHeight: 1.05 }}
                    >
                      {f.title}
                    </span>
                  </span>
                  <span aria-hidden className="label !text-gold transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
