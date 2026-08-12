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
            {stats.map((s) => (
              <div key={s.label} className="bg-bone px-5 py-6">
                <p className="font-display font-bold text-2xl md:text-3xl leading-none">{s.value}</p>
                <p className="label mt-3 !text-[8px] leading-tight">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
