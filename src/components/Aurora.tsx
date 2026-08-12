import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// The backdrop, flattened — and the one place that decides which surface the
// document is on.
//
// This used to be a stack of blurred radial glows that re-tinted per route. It
// read as haze: every section sat on the same soft brown-black wash and nothing
// had an edge. Now it is a single flat fill, and the colour work is done by the
// sections themselves.
//
// The practice routes run on sand. The campaign routes stay dark — that work is
// image-led and the photography needs a black field — so the surface flips via
// a data attribute on <html> and the CSS variables invert underneath. Campaign
// pages therefore needed no changes at all.
//
// /media is NOT in this list. It ran dark briefly and read as a different
// website; the particle constellation was recoloured to ink-on-sand instead
// so the media route sits in the same room as the rest of the practice.
const DARK_ROUTES = ['/ooh-campaign', '/parking-ticket', '/mothers-day', '/raasta-royal']

export default function Aurora() {
  const { pathname } = useLocation()
  const dark = DARK_ROUTES.includes(pathname)

  useEffect(() => {
    document.documentElement.dataset.surface = dark ? 'dark' : 'light'
  }, [dark])

  return <div className="backdrop-root" aria-hidden />
}
