import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Resets scroll position on every route change — except when the link carried
// a hash, in which case it scrolls to that section instead. Without the second
// branch, deep links like /media#film land at the top of the page and the
// visitor has to go looking for what they clicked.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      return
    }
    // The target belongs to a lazily-loaded route, so it does not exist on the
    // first frame after navigation. Retry across a few frames, then give up.
    let tries = 0
    let raf = 0
    const find = () => {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (tries++ < 40) raf = requestAnimationFrame(find)
    }
    raf = requestAnimationFrame(find)
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])

  return null
}
