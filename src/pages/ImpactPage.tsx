import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import PageShell from '../components/PageShell'
import {
  impactHeadline, cplByMarket, roasByMarket, leadSources,
  reach, reputation, reviewVolume, contentOutput, geoGrowth, searchMoves,
} from '../data/impact'

const ease = [0.22, 1, 0.36, 1] as const

// `surface` is the whole answer to the page reading as one unbroken sheet of
// cream: a data page needs blocks you can tell apart at a glance, so each one
// declares sand, ink or orange and the eye gets a rhythm to scroll down.
function Block({
  kicker, title, lede, surface = 'sand', children,
}: {
  kicker: string
  title: string
  lede?: string
  surface?: 'sand' | 'ink' | 'orange'
  children: ReactNode
}) {
  const skin =
    surface === 'ink'
      ? 'block-dark'
      : surface === 'orange'
        ? 'block-orange'
        : 'border-t border-ink/15'

  return (
    <section className={`relative px-6 md:px-12 py-[11vh] ${skin}`}>
      <div className="max-w-[1300px] mx-auto">
        <motion.div
          className="max-w-[680px] mb-12"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="label-gold !text-[11px] mb-4">{kicker}</p>
          <h2
            className="font-display font-semibold"
            style={{ fontSize: 'clamp(1.8rem, 3.6vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.04 }}
          >
            {title}
          </h2>
          {lede && <p className="mt-5 leading-relaxed opacity-65">{lede}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  )
}

// A plain matrix. Scrolls inside its own container so a wide table never widens
// the page — the one thing a data page must not do on a phone.
function Matrix({ columns, rows }: { columns: string[]; rows: { metric: string; values: string[] }[] }) {
  return (
    <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
      <table className="w-full min-w-[560px] border-collapse">
        <thead>
          <tr className="border-b border-ink/20">
            <th className="text-left label !text-[9px] pb-3 pr-4">Metric</th>
            {columns.map((c) => (
              <th key={c} className="text-right label !text-[9px] pb-3 pl-4 whitespace-nowrap">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.metric} className="border-b border-ink/10">
              <td className="py-4 pr-4 text-ink text-sm md:text-base">{r.metric}</td>
              {r.values.map((v, i) => (
                <td key={i} className="py-4 pl-4 text-right font-display font-medium text-ink tabular-nums whitespace-nowrap">
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Before → after as a physical move along a track, which reads faster than two
// numbers side by side.
function Movement() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })

  return (
    <div ref={ref} className="grid gap-px bg-bone/15">
      {reputation.map((r, i) => {
        const pct = (v: number) => (v / 5) * 100
        return (
          <div key={r.channel} className="bg-ink px-5 py-6 md:px-7">
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <span className="font-display font-medium text-bone">{r.channel}</span>
              <span className="label !text-[9px] !text-gold">{r.yoy}</span>
            </div>
            {/* h-12, not h-9: the landing value sits under the marker, and at
                36px tall the label and the dot occupied the same pixels */}
            <div className="relative h-12">
              {/* the 0-5 track */}
              <div className="absolute left-0 right-0 top-1/2 h-px bg-bone/20" />
              {/* the distance travelled */}
              <motion.div
                className="absolute top-1/2 h-[3px] -translate-y-1/2 bg-gold"
                style={{ left: `${pct(r.before)}%` }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${pct(r.after) - pct(r.before)}%` } : {}}
                transition={{ duration: 1, delay: 0.15 + i * 0.08, ease }}
              />
              {/* where it started */}
              <span
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border border-bone/50 bg-ink"
                style={{ left: `${pct(r.before)}%` }}
              />
              <span
                className="absolute top-0 -translate-x-1/2 font-mono text-[10px] text-bone/45 tabular-nums"
                style={{ left: `${pct(r.before)}%` }}
              >
                {r.before}
              </span>
              {/* where it landed */}
              <motion.span
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-gold"
                style={{ left: `${pct(r.after)}%` }}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.08, ease }}
              />
              <motion.span
                className="absolute bottom-0 -translate-x-1/2 font-display font-semibold text-bone text-base tabular-nums"
                style={{ left: `${pct(r.after)}%` }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 1 + i * 0.08 }}
              >
                {r.after}
              </motion.span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ROAS as a 270-degree dial rather than another horizontal bar. Five bars in a
// row read as one more table; five dials read as instruments, and the arc makes
// "eleven times" feel like a distance travelled rather than a digit.
function Gauge({ market, roas, max, i }: { market: string; roas: number; max: number; i: number }) {
  const R = 52
  const CIRC = 2 * Math.PI * R
  // 270 degrees of the circle are in play, opened at the bottom
  const SWEEP = 0.75
  const frac = (roas / max) * SWEEP

  return (
    <motion.div
      className="bg-bone px-4 py-8 flex flex-col items-center gap-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.6, delay: i * 0.06, ease }}
    >
      <div className="relative w-[132px] h-[132px]">
        <svg viewBox="0 0 132 132" className="w-full h-full -rotate-[225deg]">
          <circle
            cx="66" cy="66" r={R} fill="none"
            stroke="rgba(23,21,15,0.09)" strokeWidth="9" strokeLinecap="round"
            strokeDasharray={`${CIRC * SWEEP} ${CIRC}`}
          />
          <motion.circle
            cx="66" cy="66" r={R} fill="none"
            stroke="var(--violet)" strokeWidth="9" strokeLinecap="round"
            strokeDasharray={`${CIRC * frac} ${CIRC}`}
            initial={{ strokeDasharray: `0 ${CIRC}` }}
            whileInView={{ strokeDasharray: `${CIRC * frac} ${CIRC}` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.15 + i * 0.08, ease }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center">
          <span className="font-display font-bold text-ink leading-none" style={{ fontSize: 'clamp(1.7rem, 2.6vw, 2.3rem)' }}>
            {roas}×
          </span>
        </span>
      </div>
      <span className="label !text-[9px] text-center leading-tight">{market}</span>
    </motion.div>
  )
}

export default function ImpactPage() {
  const maxLeads = Math.max(...leadSources.map((s) => s.leads))
  const maxRoas = Math.max(...roasByMarket.map((r) => r.roas))

  return (
    <PageShell
      kicker="The Numbers"
      title="What the year"
      accent="actually did."
      lede="FY 2025-26, across six business lines and nine markets. Ratios and volumes rather than budgets - the figures below are the ones that belong to the work, not to the balance sheet."
    >
      {/* --- headline --- */}
      <section className="relative px-6 md:px-12 pb-[4vh]">
        <div className="max-w-[1300px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink/15">
          {impactHeadline.map((h, i) => {
            // ink, orange, then the page's own background for the last two. The
            // two figures that matter most get the loud surfaces; the other two
            // sit flat on the page and are separated by the hairline grid alone.
            const skin = [
              'bg-ink text-bone',
              'bg-gold text-ink',
              'bg-bone text-ink',
              'bg-bone text-ink',
            ][i % 4]
            // Caption opacity has to be set per surface, not once for the row.
            // Ink-on-orange at 45% measured 2.29:1 - legible on the pale tiles,
            // washed out on the loud one. These land every caption above 4:1.
            const [labelOp, noteOp] = [
              [0.8, 0.6],
              [0.92, 0.82],
              [0.8, 0.68],
              [0.8, 0.68],
            ][i % 4]
            const figure = i === 0 ? 'text-gold' : ''
            return (
              <motion.div
                key={h.label}
                className={`${skin} px-5 py-10 md:px-7 md:py-14 flex flex-col justify-between gap-8`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.06, ease }}
              >
                <p className={`font-display font-bold leading-[0.9] ${figure}`} style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.6rem)' }}>
                  {h.value}
                </p>
                <span>
                  <p className="label !text-[9px] leading-tight" style={{ color: 'inherit', opacity: labelOp }}>{h.label}</p>
                  {h.note && <p className="label !text-[8px] leading-tight mt-1" style={{ color: 'inherit', opacity: noteOp }}>{h.note}</p>}
                </span>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* --- cost per lead --- */}
      <Block
        kicker="Demand & pipeline"
        title="Cost per lead, market by market."
        lede="April 2025 against February 2026. The direction is the point: eight markets moving the same way is a method, not a fluke."
        surface="ink"
      >
        <div className="grid gap-px bg-bone/15 md:grid-cols-2">
          {cplByMarket.map((m, i) => (
            <motion.div
              key={m.market}
              className="bg-ink px-5 py-7 md:px-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.06, ease }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-display font-medium text-bone">{m.market}</span>
                <span className="font-display font-bold text-gold tabular-nums text-lg">-{m.drop}%</span>
              </div>
              <div className="mt-4 relative h-1.5 bg-bone/15">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gold"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${m.drop}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1, ease }}
                />
              </div>
              <p className="mt-3 font-mono text-[10px] text-bone/50 tabular-nums">
                ₹{m.from.toLocaleString('en-IN')} → ₹{m.to.toLocaleString('en-IN')} per lead
              </p>
            </motion.div>
          ))}
        </div>
      </Block>

      {/* --- ROAS --- */}
      <Block
        kicker="Return"
        title="Return on ad spend, by portfolio."
        lede="Each dial is drawn against the best performer, so the gap between a GCC rupee and a Canadian one is the thing you see first."
      >
        <div className="grid gap-px bg-ink/15 grid-cols-2 lg:grid-cols-5 [&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
          {roasByMarket.map((r, i) => (
            <Gauge key={r.market} market={r.market} roas={r.roas} max={maxRoas} i={i} />
          ))}
        </div>
      </Block>

      {/* --- lead sources --- */}
      <Block
        kicker="Acquisition"
        title="Where the leads came from."
        lede="Paid is the largest single channel, but it is not the whole engine - and knowing the split is what stops a budget conversation becoming a guess."
      >
        <div>
          {leadSources.map((s, i) => (
            <motion.div
              key={s.source}
              className="border-t border-ink/15 last:border-b py-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="flex items-baseline justify-between gap-4 mb-2.5">
                <span className="text-ink">{s.source}</span>
                <span className="font-display font-semibold text-ink tabular-nums">
                  {s.leads.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="relative h-1.5 bg-ink/[0.07]">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gold"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(s.leads / maxLeads) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.06, ease }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Block>

      {/* --- reputation --- */}
      <Block
        kicker="Reputation & risk"
        title="What they say when you are not in the room."
        lede="Review platforms, start of year against end. TrustPilot went from a score that costs you deals to one that wins them."
        surface="ink"
      >
        <Movement />
        <div className="mt-4 grid gap-px bg-bone/15 sm:grid-cols-2">
          {reviewVolume.map((r) => (
            <div key={r.label} className="bg-ink px-5 py-6">
              <p className="font-display font-bold text-gold text-2xl md:text-3xl leading-none tabular-nums">{r.value}</p>
              <p className="label mt-3 !text-[8px]">{r.label}</p>
              <p className="label mt-1 !text-[8px] opacity-60">{r.note}</p>
            </div>
          ))}
        </div>
      </Block>

      {/* --- audience --- */}
      <Block
        kicker="Brand & narrative"
        title="Audience and reach."
        lede="Four brands, one narrative. The multiples on YouTube are year-on-year."
      >
        <Matrix columns={reach.columns} rows={reach.rows} />
      </Block>

      {/* --- content --- */}
      <Block kicker="Output" title="Content and PR volume." lede={contentOutput.total}>
        <Matrix columns={contentOutput.columns} rows={contentOutput.rows} />
      </Block>

      {/* --- search + GEO --- */}
      <Block
        kicker="Measurement & decisions"
        title="Search, and the channel that did not exist last year."
        lede="Generative-engine optimisation was a standing start. It is now the steepest curve on the board."
        surface="orange"
      >
        <Matrix
          columns={['SQY', 'INCO', 'UM']}
          rows={geoGrowth.map((g) => ({ metric: g.metric, values: [g.sqy, g.inco, g.um] }))}
        />

        <div className="mt-10 grid gap-px bg-ink/25 sm:grid-cols-2 lg:grid-cols-3">
          {searchMoves.map((s, i) => (
            <motion.div
              key={s.metric}
              className="bg-gold px-5 py-7"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease }}
            >
              <p className="font-display font-bold text-ink text-3xl leading-none tabular-nums">{s.value}</p>
              <p className="label mt-3 !text-[8px] leading-tight">{s.metric}</p>
            </motion.div>
          ))}
        </div>
      </Block>
    </PageShell>
  )
}
