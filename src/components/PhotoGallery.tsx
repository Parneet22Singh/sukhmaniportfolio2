import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export interface GalleryPhoto {
  src?: string
  label?: string
  sublabel?: string
  link?: string
  gradient?: string
}

type Direction = 'left' | 'right'

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

// Hover-tilt photo card. Falls back to a labelled pastel card when no image
// src is supplied (e.g. UGC posts without screenshots yet).
//
// The drag is gone. It never moved anything — dragConstraints pinned all four
// edges to 0, so a card snapped straight back to its origin — and the
// touchAction: 'none' it needed swallowed vertical scroll over every card on a
// phone. The cards are links; they now behave like links.
function Photo({ photo, direction, size }: { photo: GalleryPhoto; direction: Direction; size: number }) {
  const [rotation, setRotation] = useState(0)
  useEffect(() => {
    setRotation(rand(1, 4) * (direction === 'left' ? -1 : 1))
  }, [direction])

  const inner = photo.src ? (
    <img src={photo.src} alt={photo.label || 'photo'} className="w-full h-full object-cover rounded-3xl" draggable={false} loading="lazy" />
  ) : (
    <div className="w-full h-full rounded-3xl flex flex-col items-center justify-center text-center px-4" style={{ background: photo.gradient || '#FF5A1E' }}>
      <span className="text-white text-2xl mb-2">♥</span>
      {photo.label && <p className="font-display font-semibold text-white leading-tight">{photo.label}</p>}
      {photo.sublabel && <p className="text-white/80 text-[10px] uppercase tracking-[0.15em] mt-1.5">{photo.sublabel}</p>}
    </div>
  )

  const card = (
    <motion.div
      whileTap={{ scale: 1.04, zIndex: 9999 }}
      whileHover={{ scale: 1.08, rotateZ: 2 * (direction === 'left' ? -1 : 1), zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{ width: size, height: size, WebkitUserSelect: 'none', userSelect: 'none' }}
      className="relative shrink-0"
      draggable={false}
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-soft ring-1 ring-white/50">{inner}</div>
    </motion.div>
  )

  return photo.link ? (
    <a href={photo.link} target="_blank" rel="noopener noreferrer" data-cursor="hover">{card}</a>
  ) : (
    card
  )
}

export default function PhotoGallery({
  photos,
  eyebrow,
  title,
  animationDelay = 0.3,
}: {
  photos: GalleryPhoto[]
  eyebrow?: string
  title?: React.ReactNode
  animationDelay?: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setIsVisible(true), animationDelay * 1000)
    const t2 = setTimeout(() => setIsLoaded(true), (animationDelay + 0.4) * 1000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [animationDelay])

  const n = photos.length
  const gap = 160
  const positions = photos.map((_, i) => {
    const offset = (i - (n - 1) / 2) * gap
    return { x: `${offset}px`, y: `${(Math.abs(i - (n - 1) / 2) * 14).toFixed(0)}px`, zIndex: 50 - Math.abs(i - (n - 1) / 2) * 5 }
  })

  return (
    <div className="relative">
      {eyebrow && <p className="label text-center mb-3">{eyebrow}</p>}
      {title && (
        <h3 className="mx-auto max-w-2xl text-center font-display font-semibold text-ivory text-4xl md:text-6xl mb-4" style={{ letterSpacing: '-0.03em' }}>
          {title}
        </h3>
      )}
      <div className="relative mb-8 h-[340px] w-full flex items-center justify-center">
        <motion.div
          className="relative mx-auto flex w-full max-w-6xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="relative h-[220px] w-[220px]">
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                className="absolute left-0 top-0"
                style={{ zIndex: positions[i].zIndex }}
                initial={{ x: 0, y: 0, scale: 1 }}
                animate={isLoaded ? { x: positions[i].x, y: positions[i].y, scale: 1 } : { x: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 70, damping: 12, delay: i * 0.12 }}
              >
                <Photo photo={photo} direction={i % 2 === 0 ? 'left' : 'right'} size={220} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <p className="text-center label !text-[10px] text-fog">Click a card to open the post</p>
    </div>
  )
}
