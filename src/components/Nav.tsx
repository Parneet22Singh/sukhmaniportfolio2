import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/portfolio'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ·-'

// Text-scramble on hover, resolves left→right.
function Scramble({ text }: { text: string }) {
  const [display, setDisplay] = useState(text)
  const frame = useRef(0)
  const raf = useRef(0)

  const start = useCallback(() => {
    cancelAnimationFrame(raf.current)
    frame.current = 0
    const tick = () => {
      frame.current += 1
      const settled = Math.floor(frame.current / 2)
      setDisplay(
        text
          .split('')
          .map((c, i) =>
            c === ' ' ? ' ' : i < settled ? c : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(''),
      )
      if (settled < text.length) raf.current = requestAnimationFrame(tick)
      else setDisplay(text)
    }
    raf.current = requestAnimationFrame(tick)
  }, [text])

  useEffect(() => () => cancelAnimationFrame(raf.current), [])
  return (
    <span onMouseEnter={start} className="inline-block tabular-nums">
      {display}
    </span>
  )
}

// Routes, not anchors — the site is a set of pages now, not one long scroll.
// Campaigns is a route too: it used to be a hover dropdown, which could not be
// linked to, could not be scrolled, and needed a tap on touch just to reveal
// what was inside it.
const NAV = [
  { label: 'CAMPAIGNS', to: '/campaigns' },
  { label: 'CAPABILITIES', to: '/capabilities' },
  { label: 'APPROACH', to: '/approach' },
  { label: 'MEDIA', to: '/media' },
  { label: 'ABOUT', to: '/about' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Contact is the footer of every page, so this never needs to change route.
  const goToContact = () => {
    setOpen(false)
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Chrome follows the surface: var(--bg) is sand on the practice routes
          and near-black on the campaign routes, so one header serves both. */}
      <header
        className="fixed top-0 left-0 right-0 z-[900] transition-all duration-500 border-b"
        style={{
          background: scrolled ? 'color-mix(in srgb, var(--bg) 88%, transparent)' : 'transparent',
          borderColor: scrolled ? 'var(--border)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : undefined,
        }}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
          <Link to="/" className="flex items-baseline gap-1 font-display font-semibold tracking-tight text-lg">
            Sukhmani<span className="text-gold">®</span>
          </Link>

          {/* Desktop. lg, not md: the burger below is lg:hidden, so an md
              breakpoint here rendered BOTH the full menu and the burger at
              every width from 768 to 1023. */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV.map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className={`label u-link transition-colors ${pathname === a.to ? '!text-gold' : 'opacity-60 hover:opacity-100'}`}
              >
                <Scramble text={a.label} />
              </Link>
            ))}
            <button
              onClick={goToContact}
              className="label-gold border border-gold/40 rounded-full px-5 py-2.5 hover:bg-gold hover:!text-[#17150F] transition-all duration-300"
            >
              LET'S TALK
            </button>
          </div>

          {/* Mobile burger */}
          {/* -mr-3 keeps the optical alignment while the padding grows the
              hit area to 44px, which is the minimum comfortable touch target */}
          <button
            className="lg:hidden flex flex-col justify-center items-end gap-1.5 p-3 -mr-3 min-w-[44px] min-h-[44px]"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            <span className={`block w-6 h-px bg-current transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`block w-6 h-px bg-current transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ background: 'var(--bg)' }}
            className="fixed inset-0 z-[890] flex flex-col justify-center px-8 gap-1 overflow-y-auto py-24 lg:hidden"
          >
            {NAV.map((a, i) => (
              <motion.div
                key={a.to}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                <Link
                  to={a.to}
                  onClick={() => setOpen(false)}
                  className="block text-left font-display text-3xl py-1.5"
                >
                  {a.label.charAt(0) + a.label.slice(1).toLowerCase()}
                </Link>
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + NAV.length * 0.06 }}
              onClick={goToContact}
              className="text-left font-display text-3xl text-gold py-1.5"
            >
              Let's talk
            </motion.button>
            {/* The campaign and film lists used to be repeated here in full.
                They live on /campaigns now, which is in NAV above, so this is
                just the outbound link. */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 border-t border-[var(--border)] pt-6">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block label-gold border border-gold/40 rounded-full px-5 py-2.5">
                LINKEDIN ↗
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}