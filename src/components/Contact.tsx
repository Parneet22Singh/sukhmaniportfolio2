import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Magnetic from './Magnetic'
import { profile } from '../data/portfolio'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section
      id="contact"
      className="relative pt-[18vh] pb-12 px-6 md:px-12 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 40%, rgba(255,90,31,.28) 0%, rgba(255,176,32,.12) 45%, transparent 75%), #0E0D12' }}
    >
      <div ref={ref} className="max-w-[1500px] mx-auto text-center">
        <motion.p
          className="label mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          {profile.statusBadge}
        </motion.p>

        <motion.h2
          className="font-display font-semibold text-ivory mx-auto"
          style={{ fontSize: 'clamp(2.6rem, 7.5vw, 8rem)', letterSpacing: '-0.04em', lineHeight: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Tell me where
          <br />
          it's <span className="text-gold">stuck.</span>
        </motion.h2>

        <motion.p
          className="mt-9 mx-auto max-w-[560px] text-fog leading-relaxed text-base md:text-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          One conversation is usually enough to tell whether the problem is the marketing or something underneath it.
          No deck required — just what you are seeing and what you have already tried.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Magnetic className="mt-14">
            <a
              href={`mailto:${profile.email}`}
              className="u-link font-display text-xl md:text-3xl text-gold break-all"
              style={{ letterSpacing: '-0.01em' }}
            >
              {profile.email}
            </a>
          </Magnetic>

          <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="label border border-ivory/20 rounded-full px-6 py-3.5 !text-ivory/80 hover:border-gold hover:!text-gold transition-all duration-300">
              {profile.phone}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="label-gold border border-gold rounded-full px-6 py-3.5 hover:bg-gold hover:!text-midnight transition-all duration-300">
              LinkedIn ↗
            </a>
          </div>
        </motion.div>

        <motion.footer
          className="mt-[14vh] border-t border-ivory/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="label">© 2026 Sukhmani — {profile.discipline}</span>
          <span className="label">Gurugram, India → Sydney, Australia</span>
        </motion.footer>
      </div>
    </section>
  )
}
