import { ArrowDownRight } from 'lucide-react'

// Rotating circular-text sticker — a hand-crafted, playful award-site touch.
export default function SpinningBadge({
  text = 'OPEN TO OPPORTUNITIES · SYDNEY 2026 · ',
  size = 128,
}: {
  text?: string
  size?: number
}) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="badge-spin w-full h-full">
        <defs>
          <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-white/70" fontSize="7.4" letterSpacing="1.2" fontFamily="'JetBrains Mono', monospace">
          <textPath href="#badge-circle" startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="flex items-center justify-center rounded-full text-black"
          style={{ width: size * 0.34, height: size * 0.34, background: '#FF5A1E' }}
        >
          <ArrowDownRight className="w-4 h-4" strokeWidth={2.2} />
        </span>
      </div>
    </div>
  )
}
