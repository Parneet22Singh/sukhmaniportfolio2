import { useEffect, useRef } from 'react'

// ————————————————————————————————————————————————————————————
// A film edge for the media route: sprocket perforations down the left
// margin and a running SMPTE-style timecode that scrubs with the page.
//
// The timecode is written straight to the DOM node on a scroll listener
// rather than held in state — it changes on essentially every frame, and
// putting it through React would re-render the rail continuously for the
// sake of eight characters.
// ————————————————————————————————————————————————————————————

const RUNTIME_SECONDS = 4 * 60 + 12 // the notional length of the reel
const FPS = 24

function frame(total: number) {
  const seconds = Math.floor(total)
  const frames = Math.floor((total - seconds) * FPS)
  const hh = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  const ff = String(frames).padStart(2, '0')
  return `${hh}:${mm}:${ss}:${ff}`
}

export default function FilmRail() {
  const codeRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    let queued = false

    const paint = () => {
      queued = false
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0
      if (codeRef.current) codeRef.current.textContent = frame(progress * RUNTIME_SECONDS)
      if (barRef.current) barRef.current.style.transform = `scaleY(${progress})`
    }

    const onScroll = () => {
      if (queued) return
      queued = true
      raf = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className="hidden lg:flex fixed left-0 top-0 bottom-0 z-[500] w-16 flex-col items-center justify-between py-6 pointer-events-none"
      aria-hidden
    >
      {/* perforations - the strip edge */}
      <div className="absolute inset-y-0 left-[18px] w-[10px] flex flex-col justify-around">
        {Array.from({ length: 22 }).map((_, i) => (
          <span key={i} className="block h-[10px] w-[10px] rounded-[2px] bg-ink/10" />
        ))}
      </div>

      {/* progress, drawn down the strip */}
      <div className="absolute inset-y-6 left-[38px] w-px bg-ink/15">
        <div ref={barRef} className="absolute inset-0 origin-top bg-gold" style={{ transform: 'scaleY(0)' }} />
      </div>

      <span className="relative mt-1 font-mono text-[9px] tracking-[0.18em] text-ink/50 rotate-180 [writing-mode:vertical-rl]">
        REEL 01
      </span>
      <span
        ref={codeRef}
        className="relative font-mono text-[10px] tracking-[0.14em] text-gold rotate-180 [writing-mode:vertical-rl] tabular-nums"
      >
        00:00:00:00
      </span>
    </div>
  )
}
