import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'

export interface LightboxItem {
  url: string
  caption?: string
}

// ————————————————————————————————————————————————————————————
// In-page image viewer.
//
// The campaign galleries used to link each card straight at its own file. A
// browser handed a bare .jpg either navigates away from the site or, for the
// .gif, offers to download it — either way the visitor is gone. This keeps
// them here: the image opens over the page with a back control, arrow keys
// and Escape, and the body is locked so the page behind cannot scroll.
// ————————————————————————————————————————————————————————————
export default function Lightbox({
  items, index, onClose, onIndex,
}: {
  items: LightboxItem[]
  /** null closes the viewer */
  index: number | null
  onClose: () => void
  onIndex: (i: number) => void
}) {
  const open = index !== null

  const step = useCallback(
    (delta: number) => {
      if (index === null) return
      onIndex((index + delta + items.length) % items.length)
    },
    [index, items.length, onIndex],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    // Lock the page behind the overlay. Restoring the previous value rather
    // than clearing it matters because Lenis also writes to body styles.
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, step])

  const current = index !== null ? items[index] : null

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[1000] flex flex-col bg-black/92 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={current.caption || 'Image viewer'}
        >
          <div className="flex items-center justify-between gap-4 px-4 md:px-8 py-4 shrink-0">
            <button
              type="button"
              onClick={onClose}
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-white/80 hover:text-white hover:border-white/50 text-xs md:text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span className="label !text-white/45 tabular-nums">
              {(index ?? 0) + 1} / {items.length}
            </span>
          </div>

          {/* clicking the backdrop closes; clicking the image itself must not */}
          <div className="flex-1 min-h-0 flex items-center justify-center px-4 pb-4" onClick={onClose}>
            <motion.img
              key={current.url}
              src={current.url}
              alt={current.caption || ''}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full object-contain"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="shrink-0 px-4 md:px-8 pb-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="grid place-items-center w-11 h-11 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {current.caption && (
              <p className="text-white/70 text-xs md:text-sm text-center max-w-[60ch]">{current.caption}</p>
            )}
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="grid place-items-center w-11 h-11 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
