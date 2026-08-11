import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import Nav from './Nav'
import Contact from './Contact'

const ease = [0.22, 1, 0.36, 1] as const

// Shared chrome for the interior pages. The homepage is deliberately a short
// introduction; anything that needs room to breathe gets its own route and
// opens with this masthead.
export default function PageShell({
  kicker, title, accent, lede, children,
}: {
  kicker: string
  title: ReactNode
  accent?: ReactNode
  lede?: string
  children: ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Nav />

      <div className="fixed top-24 left-4 md:left-8 z-40">
        <Link
          to="/"
          data-cursor="hover"
          className="liquid-glass rounded-full px-4 py-2 inline-flex items-center gap-2 text-ivory/70 hover:text-ivory text-xs md:text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
      </div>

      <header className="relative px-6 md:px-12 pt-[26vh] pb-[10vh]">
        <div className="max-w-[1300px] mx-auto">
          <motion.p
            className="label mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            {kicker}
          </motion.p>
          <motion.h1
            className="font-display font-semibold text-ivory max-w-[15ch]"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 6.5rem)', letterSpacing: '-0.04em', lineHeight: 0.97 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            {title} {accent && <span className="text-gold">{accent}</span>}
          </motion.h1>
          {lede && (
            <motion.p
              className="mt-10 max-w-[620px] text-fog leading-relaxed text-base md:text-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease }}
            >
              {lede}
            </motion.p>
          )}
        </div>
      </header>

      {children}

      <Contact />
    </div>
  )
}
