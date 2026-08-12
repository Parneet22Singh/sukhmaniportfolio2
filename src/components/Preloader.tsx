import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Title card: a one-line thesis holds briefly, then the screen parts like
// curtains and hands off to the scroll journey behind it. Kept short — the
// narrative lives in the hero now, not here.
const LINE = ['Find', 'the', 'constraint.']

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'quote' | 'part' | 'gone'>('quote')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('part'), 1500) // hold, then part curtains
    // Hand off while the curtains are still travelling, so the hero animates
    // *into* the opening gap rather than appearing after it and re-animating.
    const t2 = setTimeout(() => onDone(), 1700)
    const t3 = setTimeout(() => setPhase('gone'), 2700)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  const curtain = { duration: 1.1, ease: [0.76, 0, 0.24, 1] as const }

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden">
          {/* left curtain */}
          <motion.div
            className="absolute inset-y-0 left-0 w-[50.6%] bg-midnight"
            initial={{ x: 0 }}
            animate={{ x: phase === 'part' ? '-100%' : 0 }}
            transition={curtain}
          />
          {/* right curtain */}
          <motion.div
            className="absolute inset-y-0 right-0 w-[50.6%] bg-midnight"
            initial={{ x: 0 }}
            animate={{ x: phase === 'part' ? '100%' : 0 }}
            transition={curtain}
          />
          {/* seam glow that splits with the curtains */}
          <motion.div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px"
            style={{ background: '#FF5A1E' }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{
              opacity: phase === 'part' ? 0 : 1,
              scaleY: phase === 'part' ? 1 : 0.9,
            }}
            transition={{ duration: 0.6 }}
          />

          {/* title-card quote */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6"
            animate={{ opacity: phase === 'part' ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className="label !text-gold"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Sukhmani - Growth &amp; Marketing Leadership
            </motion.p>
            <h2 className="font-serif text-ivory text-center" style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: 1.05 }}>
              {LINE.map((w, i) => (
                <span key={w} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                  <motion.span
                    className={`inline-block ${w === 'constraint.' ? 'italic text-gold' : ''}`}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h2>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
