import { motion } from 'framer-motion'
import { profile, stats } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const

// The homepage's one paragraph of self-description, plus the numbers that
// used to be crammed under the closing hero beat.
export default function IntroStrip() {
  return (
    <section className="relative px-6 md:px-12 py-[12vh]">
      <div className="max-w-[1300px] mx-auto grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-24 lg:items-end">
        <motion.p
          className="font-display font-medium text-ivory"
          style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.5rem)', letterSpacing: '-0.02em', lineHeight: 1.24 }}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.85, ease }}
        >
          {profile.positioning}
        </motion.p>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.8, delay: 0.12, ease }}
        >
          {stats.map((s) => (
            <div key={s.label} className="liquid-glass rounded-2xl px-5 py-5">
              <p className="font-display font-bold text-2xl md:text-3xl text-ivory leading-none">{s.value}</p>
              <p className="label mt-2.5 !text-[8px] leading-tight">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
