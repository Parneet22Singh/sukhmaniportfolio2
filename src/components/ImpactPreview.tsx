import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { impactHeadline, cplByMarket } from '../data/impact'

const ease = [0.22, 1, 0.36, 1] as const

// ————————————————————————————————————————————————————————————
// Cost per lead as a SLOPE CHART.
//
// A bar chart of "% reduction" throws away the two things that matter: what a
// lead actually cost, and how far apart the markets were to begin with. A slope
// chart keeps both — two dated axes, one line per market, and the eye reads the
// gradient as the result. Chennai starting at ₹4,001 and landing under Pune is
// a story; "58%" is a number.
//
// The scale is logarithmic because the data spans an order of magnitude
// (₹237 to ₹4,001). On a linear axis the four cheapest markets collapse into
// one indistinguishable band at the bottom. The gridlines are labelled with
// their actual rupee values so the compression is visible rather than hidden.
// ————————————————————————————————————————————————————————————

const VB = { w: 1000, h: 520 }
const AXIS = { left: 208, right: 736, top: 46, bottom: 462 }
const TICKS = [250, 500, 1000, 2000, 4000]
const LO = 200
const HI = 4600

const yOf = (v: number) => {
  const t = (Math.log(v) - Math.log(LO)) / (Math.log(HI) - Math.log(LO))
  return AXIS.bottom - t * (AXIS.bottom - AXIS.top)
}

// Labels sitting at their true y would overlap wherever markets cluster. This
// nudges them apart by the minimum legible gap, keeping their order intact, so
// a label never covers its neighbour.
function declash(values: number[], minGap: number) {
  const order = values.map((y, i) => ({ y, i })).sort((a, b) => a.y - b.y)
  for (let k = 1; k < order.length; k++) {
    if (order[k].y - order[k - 1].y < minGap) order[k].y = order[k - 1].y + minGap
  }
  const overflow = order[order.length - 1].y - AXIS.bottom
  if (overflow > 0) for (const o of order) o.y -= overflow
  const out = new Array<number>(values.length)
  for (const o of order) out[o.i] = o.y
  return out
}

export default function ImpactPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [hot, setHot] = useState<number | null>(null)

  const fromLabels = declash(cplByMarket.map((m) => yOf(m.from)), 26)
  const toLabels = declash(cplByMarket.map((m) => yOf(m.to)), 26)

  return (
    <section className="relative px-6 md:px-12 py-[14vh]">
      <div className="max-w-[1300px] mx-auto">
        <motion.div
          className="max-w-[760px] mb-[7vh]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="label mb-5">Measured outcomes · FY 2025-26</p>
          <h2
            className="font-display font-semibold text-ink"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.6rem)', letterSpacing: '-0.035em', lineHeight: 1 }}
          >
            Every line points <span className="text-gold">down.</span>
          </h2>
          <p className="mt-8 max-w-[560px] text-ink/65 leading-relaxed">
            Cost per lead in eight markets, April 2025 against February 2026. One line each. The
            gradient is the result - and the fact that none of them go the other way is the method.
          </p>
        </motion.div>

        <div ref={ref} className="grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16 lg:items-center">
          {/* --- the slope chart --- */}
          <div
            className="relative -mx-2 md:mx-0"
            onMouseLeave={() => setHot(null)}
          >
            <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="w-full h-auto overflow-visible" role="img"
                 aria-label="Cost per lead fell in all eight markets between April 2025 and February 2026">
              {/* gridlines, labelled in rupees so the log scale is legible */}
              {TICKS.map((t) => (
                <g key={t}>
                  <line
                    x1={AXIS.left} x2={AXIS.right} y1={yOf(t)} y2={yOf(t)}
                    stroke="rgba(23,21,15,0.08)" strokeWidth="1"
                  />
                  <text
                    x={AXIS.left - 12} y={yOf(t) + 3.5} textAnchor="end"
                    fill="rgba(23,21,15,0.32)" fontSize="11" fontFamily="ui-monospace, monospace"
                  >
                    ₹{t.toLocaleString('en-IN')}
                  </text>
                </g>
              ))}

              {/* the two dated axes */}
              {[AXIS.left, AXIS.right].map((x, i) => (
                <g key={x}>
                  <line x1={x} x2={x} y1={AXIS.top} y2={AXIS.bottom} stroke="rgba(23,21,15,0.22)" strokeWidth="1" />
                  <text
                    x={x} y={AXIS.top - 18} textAnchor="middle"
                    fill="rgba(23,21,15,0.55)" fontSize="12" letterSpacing="2.2"
                    fontFamily="ui-monospace, monospace"
                  >
                    {i === 0 ? 'APR 2025' : 'FEB 2026'}
                  </text>
                </g>
              ))}

              {cplByMarket.map((m, i) => {
                const y1 = yOf(m.from)
                const y2 = yOf(m.to)
                const dim = hot !== null && hot !== i
                return (
                  <g
                    key={m.market}
                    onMouseEnter={() => setHot(i)}
                    style={{ cursor: 'pointer', opacity: dim ? 0.18 : 1, transition: 'opacity .3s ease' }}
                  >
                    {/* a fat transparent hit line, so hovering does not require
                        landing on a 2px stroke */}
                    <line x1={AXIS.left} y1={y1} x2={AXIS.right} y2={y2} stroke="transparent" strokeWidth="22" />

                    <motion.line
                      x1={AXIS.left} y1={y1} x2={AXIS.right} y2={y2}
                      stroke="var(--violet)"
                      strokeWidth={hot === i ? 3.4 : 1.8}
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : {}}
                      transition={{ duration: 1.1, delay: 0.2 + i * 0.09, ease }}
                    />

                    <circle cx={AXIS.left} cy={y1} r={hot === i ? 6 : 4} fill="none" stroke="var(--violet)" strokeWidth="1.6" />
                    <motion.circle
                      cx={AXIS.right} cy={y2} r={hot === i ? 7 : 5} fill="var(--violet)"
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 1.1 + i * 0.09, ease }}
                      style={{ transformOrigin: `${AXIS.right}px ${y2}px` }}
                    />

                    {/* market name + opening cost, left of the first axis */}
                    <text
                      x={AXIS.left - 58} y={fromLabels[i] + 4} textAnchor="end"
                      fill="#17150F" fontSize="15" fontWeight={hot === i ? 700 : 500}
                    >
                      {m.market}
                    </text>
                    {/* closing cost, right of the second axis */}
                    <text
                      x={AXIS.right + 16} y={toLabels[i] + 4}
                      fill="#17150F" fontSize="15" fontWeight={hot === i ? 700 : 500}
                      fontFamily="ui-monospace, monospace"
                    >
                      ₹{m.to.toLocaleString('en-IN')}
                    </text>
                    <text
                      x={AXIS.right + 100} y={toLabels[i] + 4}
                      fill="var(--accent-text)" fontSize="14" fontWeight="700"
                      fontFamily="ui-monospace, monospace"
                    >
                      -{m.drop}%
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* --- the headline figures --- */}
          <div>
            <div className="grid grid-cols-2 gap-px bg-ink/15">
              {impactHeadline.map((h, i) => (
                <motion.div
                  key={h.label}
                  className={i === 0 ? 'bg-ink text-bone px-5 py-7' : 'bg-bone px-5 py-7'}
                  initial={{ opacity: 0, y: 22 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.07, ease }}
                >
                  <p
                    className={`font-display font-bold leading-none ${i === 0 ? 'text-gold' : 'text-ink'}`}
                    style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)' }}
                  >
                    {h.value}
                  </p>
                  <p className={`label mt-3 !text-[8px] leading-tight ${i === 0 ? '!text-bone/80' : ''}`}>{h.label}</p>
                  {h.note && (
                    <p className={`label mt-1 !text-[8px] leading-tight ${i === 0 ? '!text-bone/60' : 'opacity-70'}`}>
                      {h.note}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Link to="/impact" data-cursor="hover" className="group inline-flex items-center gap-3 label !text-gold">
                See the full numbers
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
