import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ————————————————————————————————————————————————————————————
// A schematic of how a campaign is actually built: five channels
// carrying one narrative, resolved into a funnel that narrows toward
// pipeline. Replaces the abstract ambient clip that used to sit here —
// this says something about the work instead of just moving.
//
// Deliberately unnumbered. The bar widths describe the *shape* of a
// funnel, not a claimed result, so nothing here can be read as a stat.
// ————————————————————————————————————————————————————————————

const CHANNELS = ['SEARCH', 'SOCIAL', 'OOH', 'CREATOR', 'EVENTS']

// converge points: each channel box bottom → the narrative node
const BOX_W = 52
const BOX_X = [18, 76, 134, 192, 250]
const NODE = { x: 160, y: 150 }

const STAGES = [
  { label: 'REACH', w: 280 },
  { label: 'ENGAGED', w: 196 },
  { label: 'QUALIFIED', w: 118 },
  { label: 'PIPELINE', w: 62 },
]

const EASE = [0.22, 1, 0.36, 1] as const

export default function MarketingFlow() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden bg-midnight"
      aria-hidden
    >
      <svg viewBox="0 0 320 440" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full">
        {/* faint measurement grid */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`g${i}`}
            x1="0" x2="320"
            y1={44 * (i + 1)} y2={44 * (i + 1)}
            stroke="rgba(245,240,234,0.045)" strokeWidth="1"
          />
        ))}

        {/* --- signal in --- */}
        <text x="18" y="28" fill="#9a9088" fontSize="8" letterSpacing="2.4" fontFamily="inherit">
          SIGNAL IN
        </text>

        {CHANNELS.map((c, i) => (
          <motion.g
            key={c}
            initial={{ opacity: 0, y: -8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: EASE }}
          >
            <rect
              x={BOX_X[i]} y="58" width={BOX_W} height="22" rx="11"
              fill="rgba(255,255,255,0.03)" stroke="rgba(245,240,234,0.16)"
            />
            <text
              x={BOX_X[i] + BOX_W / 2} y="72"
              fill="#f5f0ea" fontSize="7" letterSpacing="1.1"
              textAnchor="middle" fontFamily="inherit"
            >
              {c}
            </text>
          </motion.g>
        ))}

        {/* --- channels converge on one narrative --- */}
        {BOX_X.map((x, i) => {
          const sx = x + BOX_W / 2
          const d = `M ${sx},80 C ${sx},112 ${NODE.x},116 ${NODE.x},${NODE.y - 16}`
          return (
            <g key={`c${i}`}>
              <motion.path
                d={d} fill="none" stroke="rgba(245,240,234,0.20)" strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : undefined}
                transition={{ duration: 0.8, delay: 0.35 + i * 0.07, ease: 'easeInOut' }}
              />
              {/* signal travelling down the wire */}
              <circle r="1.8" fill="var(--violet)">
                <animateMotion dur="2.6s" begin={`${i * 0.34}s`} repeatCount="indefinite" path={d} />
                <animate attributeName="opacity" values="0;1;1;0" dur="2.6s" begin={`${i * 0.34}s`} repeatCount="indefinite" />
              </circle>
            </g>
          )
        })}

        {/* --- the narrative node --- */}
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
          style={{ transformOrigin: `${NODE.x}px ${NODE.y}px` }}
        >
          <rect
            x={NODE.x - 62} y={NODE.y - 16} width="124" height="32" rx="16"
            fill="var(--violet)" stroke="none"
          />
          <text
            x={NODE.x} y={NODE.y + 4}
            fill="#121212" fontSize="8.5" letterSpacing="1.8"
            textAnchor="middle" fontFamily="inherit"
          >
            ONE NARRATIVE
          </text>
        </motion.g>

        {/* --- out into the funnel --- */}
        <motion.path
          d={`M ${NODE.x},${NODE.y + 16} L ${NODE.x},214`}
          stroke="rgba(245,240,234,0.20)" strokeWidth="1" fill="none"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.4, delay: 1.15 }}
        />

        <text x="18" y="208" fill="#9a9088" fontSize="8" letterSpacing="2.4" fontFamily="inherit">
          REVENUE OUT
        </text>

        {/* --- funnel stages --- */}
        {STAGES.map((s, i) => {
          const y = 232 + i * 44
          return (
            <g key={s.label}>
              <text x="20" y={y} fill="#9a9088" fontSize="7.5" letterSpacing="1.6" fontFamily="inherit">
                {s.label}
              </text>
              <rect x="20" y={y + 8} width="280" height="6" rx="3" fill="rgba(245,240,234,0.07)" />
              <motion.rect
                x="20" y={y + 8} height="6" rx="3" fill="var(--violet)"
                initial={{ width: 0 }}
                animate={inView ? { width: s.w } : undefined}
                transition={{ duration: 0.9, delay: 1.3 + i * 0.15, ease: EASE }}
              />
            </g>
          )
        })}

        <motion.text
          x="20" y="424" fill="rgba(245,240,234,0.42)" fontSize="7.5" letterSpacing="0.6" fontFamily="inherit"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.7, delay: 2 }}
        >
          Built backwards from the pipeline target.
        </motion.text>
      </svg>
    </div>
  )
}
