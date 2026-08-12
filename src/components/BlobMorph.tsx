import { useEffect, useRef } from 'react'

// ── procedural liquid ────────────────────────────────────────────────
// Generated per-frame from a single progress value p (0→1), so motion is
// smooth and organic. Two flows in ONE svg that scrolls away with the hero:
//   POOL    — rises from the bottom.
//   CURTAIN — drips DOWN from the top ("leaks down"). Both are clipped to the
//             hero and scroll out with it, so nothing bleeds over the next
//             section and there's no fixed overlay to cause a repaint.
//
// Progress is supplied by the caller as a MotionValue rather than being wired
// to its own ScrollTrigger. The hero already owns a precise scroll progress,
// and driving the melt from it is the only way to land the rise *while the
// closing beat is still on screen* instead of after it has faded out.

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeInOut = (p: number) =>
  p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
const gauss = (x: number, cx: number, w: number) => Math.exp(-Math.pow((x - cx) / w, 2))

// Smooth (Catmull-Rom → cubic) fill: a curve through `pts`, closed to the
// horizontal line at `closeY`.
function fill(pts: [number, number][], closeY: number) {
  const n = pts.length
  let d = `M ${pts[0][0].toFixed(1)},${closeY} L ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || pts[i + 1]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  d += ` L ${pts[n - 1][0].toFixed(1)},${closeY} Z`
  return d
}

// POOL surface — viewBox 1000×1000. `lag` trails a back layer.
function pool(p: number, lag = 0, ampBoost = 1) {
  const pl = clamp01(p - lag)
  const e = easeInOut(pl)

  // Final stretch floods past the top of the frame. Without this the surface
  // tops out around y≈210 and the upper fifth of the hero never gets covered,
  // so the closing beat and the masthead stay visible through the "melt".
  const flood = clamp01((pl - 0.7) / 0.3)
  const fe = flood * flood * (3 - 2 * flood) // smoothstep
  const calm = 1 - fe // surface flattens out as it floods to a solid fill

  const base = lerp(1160, 210, e) - 540 * fe
  const tendrils: [number, number][] = [[300, 250], [640, 320], [910, 200]]
  const pts: [number, number][] = []
  const N = 18
  for (let i = 0; i <= N; i++) {
    const x = -60 + (1120 / N) * i
    let y = base
    y -= (26 + 52 * pl) * ampBoost * calm * Math.sin(i * 0.9 + 0.3)
    y -= (12 + 26 * pl) * ampBoost * calm * Math.sin(i * 2.3 + 1.1)
    for (const [cx, h] of tendrils) y -= h * pl * ampBoost * calm * gauss(x, cx, 95)
    pts.push([x, y])
  }
  return fill(pts, 1160)
}

// CURTAIN edge — viewBox 1000×1000. Drips DOWN; narrow gaussians = tongues.
// The drips extend downward once (no retract) and then dissolve via opacity,
// so it reads as a genuine downward melt.
function curtain(p: number) {
  const g = clamp01(p / 0.42) // extend down, done by ~p0.42
  const e = easeInOut(g)
  const gd = Math.pow(Math.sin((g * Math.PI) / 2), 0.7) // drip length, front-loaded
  const base = lerp(-280, 150, e)
  const drips: [number, number][] = [[150, 420], [400, 600], [650, 460], [880, 610], [1010, 420]]
  const pts: [number, number][] = []
  const N = 26
  for (let i = 0; i <= N; i++) {
    const x = -60 + (1120 / N) * i
    let y = base + (14 + 22 * g) * Math.sin(i * 0.85)
    for (const [cx, h] of drips) y += h * gd * gauss(x, cx, 46)
    pts.push([x, y])
  }
  return fill(pts, -300)
}

// Driven from the trigger element's own geometry on a rAF loop rather than
// from a Framer MotionValue. Subscribing to a motion value proved unreliable
// here: derived values (useTransform) are only recomputed while bound to a
// motion element's `style`, and the melt sat frozen at its resting shape. The
// element's bounding box is the ground truth and costs one read per frame.
export default function BlobMorph({
  triggerRef, from = 0, to = 1,
}: {
  triggerRef: React.RefObject<HTMLElement | null>
  /** window, as a fraction of the trigger's sticky scroll range, over which the melt runs */
  from?: number
  to?: number
}) {
  const backRef = useRef<SVGPathElement>(null)
  const frontRef = useRef<SVGPathElement>(null)
  const curtainRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let prev = -1

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const el = triggerRef.current
      if (!el) return

      const range = el.offsetHeight - window.innerHeight
      if (range <= 0) return
      // -rect.top is how far we've scrolled into the sticky range
      const scrolled = -el.getBoundingClientRect().top
      const overall = clamp01(scrolled / range)
      const p = clamp01((overall - from) / (to - from))

      // Deliberately NOT skipping unchanged frames. React re-renders reset `d`
      // back to the resting value baked into the JSX; a "has p changed?" guard
      // latches after the first write and the melt then never recovers from
      // that clobber. Only a genuine rest state is worth skipping.
      if (p === 0 && prev === 0) return
      prev = p

      backRef.current?.setAttribute('d', pool(p, 0.08, 0.9))
      frontRef.current?.setAttribute('d', pool(p, 0, 1))
      // the curtain shape only changes while extending; after that it's static
      if (p < 0.45) curtainRef.current?.setAttribute('d', curtain(p))
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [triggerRef, from, to])

  return (
    // pool + curtain in one svg; clipped to the hero and scrolls away with it
    <div className="absolute inset-0 z-[60] pointer-events-none overflow-hidden" aria-hidden>
      {/* One flat orange for every flow. The gradient that used to run down the
          viewBox is gone: the pool and the curtain are the same material, and
          the only honest way to say that is to fill them with the same colour.
          The back layer is the same orange at lower alpha, which reads as a
          trailing edge without introducing a second hue. */}
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        {/* pool — rises from the bottom */}
        <path ref={backRef} d={pool(0, 0.08, 0.9)} fill="var(--violet)" opacity={0.4} />
        <path ref={frontRef} d={pool(0, 0, 1)} fill="var(--violet)" />
        {/* curtain — drips down from the top, same fill */}
        <path ref={curtainRef} d={curtain(0)} fill="var(--violet)" />
      </svg>
    </div>
  )
}
