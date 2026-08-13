import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Resets scroll position on every route change — except when the link carried
// a hash, in which case it scrolls to that section instead. Without the second
// branch, deep links like /media#film land at the top of the page and the
// visitor has to go looking for what they clicked.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  // Browsers restore the previous scroll offset on reload. That is normally
  // helpful, but this homepage opens on a 420vh pinned journey — reloading
  // three screens in dropped the visitor into the middle of it with the name
  // already shrunk and a beat half typed, looking broken. Opt out once, on
  // mount, before any paint.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    if (!window.location.hash) window.scrollTo(0, 0)
  }, [])

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
