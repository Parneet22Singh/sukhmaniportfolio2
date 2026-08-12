import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { bottlenecks } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const

// ————————————————————————————————————————————————————————————
// The diagnosis, as a rolling track rather than a wall of text.
//
// A ball runs down a descending curve as you scroll. Each of the five
// bottlenecks sits on the curve as a node; it lights up when the ball
// reaches it. Keywords only — the full symptom → cause → fix write-up
// lives on the Capabilities page.
// ————————————————————————————————————————————————————————————

const VB = { w: 1000, h: 320 }
const CURVE =
  'M 40,72 C 180,42 250,150 390,146 C 520,142 570,214 700,206 C 830,198 900,252 960,262'
const NODE_AT = [0.1, 0.3, 0.5, 0.7, 0.9]

type Pt = { x: number; y: number }

export default function BottleneckTrack() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const ballRef = useRef<SVGGElement>(null)
  const trailRef = useRef<SVGPathElement>(null)

  const [nodes, setNodes] = useState<Pt[]>([])
  const [active, setActive] = useState(-1)

  // Roll the ball across the middle of the section's pass through the viewport.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 78%', 'end 55%'] })

  // measure node positions on the curve once it exists
  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const len = path.getTotalLength()
    setNodes(
      NODE_AT.map((f) => {
        const pt = path.getPointAtLength(f * len)
        return { x: pt.x, y: pt.y }
      }),
    )
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const path = pathRef.current
    if (!path) return
    const t = Math.min(Math.max(v, 0), 1)
    const pt = path.getPointAtLength(t * path.getTotalLength())
    ballRef.current?.setAttribute('transform', `translate(${pt.x} ${pt.y})`)
    trailRef.current?.setAttribute('stroke-dasharray', `${t} ${1 - t}`)

    // last node the ball has reached
    let i = -1
    for (let k = 0; k < NODE_AT.length; k++) if (t >= NODE_AT[k] - 0.02) i = k
    setActive(i)
  })

  return (
    <section ref={sectionRef} id="bottlenecks" className="relative py-[14vh] px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1300px] mx-auto">
        {/* short header — the detail lives on /capabilities */}
        <motion.div
          className="max-w-[760px] mb-[7vh]"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="label mb-5">The Diagnosis</p>
          <h2
            className="font-display font-semibold"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.6rem)', letterSpacing: '-0.035em', lineHeight: 1 }}
          >
            Where growth <span className="text-gold">gets stuck.</span>
          </h2>
        </motion.div>

        {/* ——— desktop: the rolling track ——— */}
        <div className="hidden md:block relative">
          <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="w-full h-auto overflow-visible" aria-hidden>
            {/* the track */}
            <path ref={pathRef} d={CURVE} fill="none" stroke="rgba(18,18,18,0.16)" strokeWidth="2" strokeLinecap="round" />
            {/* the travelled portion */}
            <path
              ref={trailRef}
              d={CURVE}
              fill="none"
              stroke="var(--violet)"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="0 1"
            />

            {/* nodes */}
            {nodes.map((n, i) => (
              <g key={i}>
                <circle
                  cx={n.x} cy={n.y} r={active >= i ? 13 : 9}
                  fill="none"
                  stroke={active >= i ? 'var(--violet)' : 'rgba(18,18,18,0.3)'}
                  strokeWidth="1.6"
                  style={{ transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)' }}
                />
                <circle cx={n.x} cy={n.y} r="2.6" fill={active >= i ? 'var(--violet)' : 'rgba(18,18,18,0.38)'}
                  style={{ transition: 'fill 0.45s ease' }} />
                {/* connector tick out to the label */}
                <line
                  x1={n.x} y1={n.y} x2={n.x} y2={i % 2 === 0 ? n.y - 44 : n.y + 44}
                  stroke={active >= i ? 'rgba(255,90,30,0.6)' : 'rgba(18,18,18,0.16)'}
                  strokeWidth="1"
                  style={{ transition: 'stroke 0.45s ease' }}
                />
              </g>
            ))}

            {/* the ball */}
            <g ref={ballRef} transform="translate(40 72)">
              <circle r="17" fill="none" stroke="var(--violet)" strokeWidth="1" opacity="0.5" />
              <circle r="9" fill="var(--violet)" />
            </g>
          </svg>

          {/* keyword labels, pinned to the measured node points */}
          {nodes.map((n, i) => {
            const above = i % 2 === 0
            const on = active >= i
            return (
              <div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  left: `${(n.x / VB.w) * 100}%`,
                  top: `${((n.y + (above ? -52 : 52)) / VB.h) * 100}%`,
                  transform: `translate(-50%, ${above ? '-100%' : '0'})`,
                }}
              >
                <motion.div
                  className="text-center whitespace-nowrap"
                  animate={{ opacity: on ? 1 : 0.22, y: on ? 0 : above ? 10 : -10 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <p className={`label !text-[9px] mb-1.5 ${on ? '!text-gold' : ''}`}>{bottlenecks[i].n}</p>
                  <p
                    className={`font-display font-semibold leading-none ${on ? 'text-ink' : 'text-ink/55'}`}
                    style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.45rem)', letterSpacing: '-0.02em' }}
                  >
                    {bottlenecks[i].keyword}
                  </p>
                  <p className="label !text-[8px] mt-2">{bottlenecks[i].note}</p>
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* ——— mobile: same idea, vertical rail ——— */}
        <div className="md:hidden relative pl-8">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-ink/15" aria-hidden />
          <motion.div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gold origin-top"
            style={{ scaleY: scrollYProgress }}
            aria-hidden
          />
          {bottlenecks.map((b, i) => (
            <motion.div
              key={b.n}
              className="relative py-5"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20% 0px' }}
              transition={{ duration: 0.55, delay: i * 0.05, ease }}
            >
              <span className="absolute left-[-26px] top-[26px] w-2.5 h-2.5 rounded-full bg-gold ring-4 ring-bone" aria-hidden />
              <p className="label !text-[9px] !text-gold mb-1.5">{b.n}</p>
              <p className="font-display font-semibold text-ink text-xl leading-none">{b.keyword}</p>
              <p className="label !text-[8px] mt-2">{b.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
