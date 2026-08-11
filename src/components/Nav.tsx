import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { campaignIndex, profile } from '../data/portfolio'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ·—'

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
const NAV = [
  { label: 'CAPABILITIES', to: '/capabilities' },
  { label: 'APPROACH', to: '/approach' },
  { label: 'ABOUT', to: '/about' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  // Dropdown open/close with a small close delay so moving the cursor
  // from the trigger to the menu never snaps it shut.
  const dropTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const openDrop = () => { if (dropTimer.current) clearTimeout(dropTimer.current); setDrop(true) }
  const closeDrop = () => { dropTimer.current = setTimeout(() => setDrop(false), 160) }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Contact is the footer of every page, so this never needs to change route.
  const goToContact = () => {
    setOpen(false)
    setDrop(false)
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 border-b ${
          scrolled
            ? 'bg-midnight/70 backdrop-blur-xl border-ivory/10'
            : 'bg-transparent border-transparent'
        }`}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
          <Link to="/" className="flex items-baseline gap-1 font-display font-semibold text-ivory tracking-tight text-lg">
            Sukhmani<span className="text-gold">®</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {/* Campaigns dropdown */}
            <div className="relative" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
              <button onClick={() => setDrop((v) => !v)} className="label u-link !text-ivory/60 hover:!text-ivory transition-colors">
                <Scramble text="CAMPAIGNS" /> <span className="text-gold">↓</span>
              </button>
              <AnimatePresence>
                {drop && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.25 }}
                    /* pt-4 is a hover *bridge*: it belongs to this element (a
                       child of the wrapper), so crossing it never fires mouseleave */
                    className="absolute top-full right-0 pt-4 w-72"
                  >
                    <div className="liquid-glass-strong border border-ivory/10 rounded-xl p-2 shadow-soft">
                      {campaignIndex.map((c) => (
                        <Link
                          key={c.slug}
                          to={`/${c.slug}`}
                          onClick={() => setDrop(false)}
                          className="group flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gold/5 transition-colors"
                        >
                          <span>
                            <span className="block text-sm text-ivory group-hover:text-gold transition-colors">{c.title}</span>
                            <span className="label !text-[9px]">{c.kicker}</span>
                          </span>
                          <span className="text-fog group-hover:text-gold transition-colors">→</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {NAV.map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className={`label u-link transition-colors ${pathname === a.to ? '!text-gold' : '!text-ivory/60 hover:!text-ivory'}`}
              >
                <Scramble text={a.label} />
              </Link>
            ))}
            <button
              onClick={goToContact}
              className="label-gold border border-gold/40 rounded-full px-5 py-2.5 hover:bg-gold hover:!text-midnight transition-all duration-300"
            >
              LET'S TALK
            </button>
          </div>

          {/* Mobile burger */}
          <button className="lg:hidden flex flex-col gap-1.5 p-2" aria-label="Menu" onClick={() => setOpen(!open)}>
            <span className={`block w-6 h-px bg-ivory transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`block w-6 h-px bg-ivory transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
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
            className="fixed inset-0 z-[890] bg-midnight/97 backdrop-blur-2xl flex flex-col justify-center px-8 gap-1 overflow-y-auto py-24 lg:hidden"
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
                  className="block text-left font-display text-3xl text-ivory py-1.5"
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 border-t border-ivory/10 pt-6">
              <p className="label-gold mb-3">Campaigns</p>
              {campaignIndex.map((c) => (
                <Link key={c.slug} to={`/${c.slug}`} onClick={() => setOpen(false)} className="block text-fog py-1.5 text-lg">
                  {c.title}
                </Link>
              ))}
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block label-gold border border-gold/40 rounded-full px-5 py-2.5">
                LINKEDIN ↗
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}