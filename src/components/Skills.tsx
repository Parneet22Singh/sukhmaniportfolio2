import { skills } from '../data/portfolio'

// Twin gold marquees, opposite directions — a palate cleanser between sections.
export default function Skills() {
  const row = (items: string[], reverse = false) => (
    <div className="flex overflow-hidden border-t border-ivory/10 py-6 select-none" aria-hidden={reverse}>
      <div
        className="flex shrink-0 gap-12 pr-12 animate-marquee items-baseline"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {[...items, ...items].map((s, i) => (
          <span key={`${s}-${i}`} className="flex items-baseline gap-12 whitespace-nowrap">
            <span className="font-display text-2xl md:text-3xl text-ivory/70 hover:text-gold transition-colors" style={{ letterSpacing: '-0.02em' }}>
              {s}
            </span>
            <span className="text-gold/60 text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  )

  return (
    <section className="relative py-[10vh]">
      <p className="label text-center mb-12">What I bring to the table</p>
      {row(skills.slice(0, 7))}
      {row(skills.slice(7), true)}
      <div className="border-t border-ivory/10" />
    </section>
  )
}
