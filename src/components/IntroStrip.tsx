import { motion } from 'framer-motion'
import Marked from './Marked'
import { profile, stats } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const

// The homepage's one paragraph of self-description, plus the numbers that
// used to be crammed under the closing hero beat.
//
// This is the site's first light surface. The hero ends flooded orange; this
// lands flat bone immediately after, so the page stops being one long dark
// scroll and starts reading as a sequence of blocks.
export default function IntroStrip() {
  return (
    <section className="block-bone relative px-6 md:px-12 py-[13vh]">
      <div className="max-w-[1300px] mx-auto">
        {/* who is speaking, stated plainly before the claim */}
        <motion.p
          className="label mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease }}
        >
          {profile.title} · <Marked>{profile.company}</Marked>
        </motion.p>

        {/* The Australian market was part of the remit run out of the India
            office, so it is stated as a market worked rather than folded into
            the job title, where "Square Yards Australia" would read as an
            employer she has never actually been on the payroll of. */}
        <motion.p
          className="-mt-6 mb-10 text-sm md:text-base"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
        >
          Market experience includes <Marked>Square Yards Australia</Marked>
        </motion.p>

        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-24 lg:items-end">
          <motion.p
            className="font-display font-medium"
            style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.5rem)', letterSpacing: '-0.02em', lineHeight: 1.24 }}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.85, ease }}
          >
            <Marked>{profile.positioning}</Marked>
          </motion.p>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-px bg-ink/15"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
          >
            {/* hairline grid rather than floating cards - flat surfaces need
                edges, not shadows */}
            {/* Value and label share a baseline, so the qualifier reads as part
                of the figure - "MBA Advanced" - and the third line drops
                underneath it rather than the three stacking into a list. */}
            {stats.map((s) => (
              <div key={s.label} className="bg-bone px-5 py-6">
                <p className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-display font-bold text-2xl md:text-3xl leading-none">{s.value}</span>
                  <span className="label !text-[8px] leading-tight">{s.label}</span>
                </p>
                {'sub' in s && s.sub && (
                  <p className="label mt-2 !text-[8px] leading-tight opacity-70">{s.sub}</p>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
