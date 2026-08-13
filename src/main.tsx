import { StrictMode, Suspense, lazy, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'

gsap.registerPlugin(ScrollTrigger)
import ScrollToTop from './components/ScrollToTop'
import CustomCursor from './components/CustomCursor'
import Atmosphere from './components/Atmosphere'
import Aurora from './components/Aurora'
import Home from './App.tsx'

const OOHCampaign = lazy(() => import('./pages/OOHCampaign'))
const ParkingTicket = lazy(() => import('./pages/ParkingTicket'))
const MothersDay = lazy(() => import('./pages/MothersDay'))
const RaastaRoyal = lazy(() => import('./pages/RaastaRoyal'))
const Capabilities = lazy(() => import('./pages/Capabilities'))
const Approach = lazy(() => import('./pages/Approach'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const MediaPage = lazy(() => import('./pages/MediaPage'))
const CampaignsPage = lazy(() => import('./pages/CampaignsPage'))


// Buttery inertia scroll (lerp 0.1), disabled for reduced-motion users.
function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1 })
    // drive Lenis from GSAP's ticker and keep ScrollTrigger in sync
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SmoothScroll />
      <ScrollToTop />
      <Aurora />
      <CustomCursor />
      <Atmosphere />
      <div className="relative z-10">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/capabilities" element={<Capabilities />} />
            <Route path="/approach" element={<Approach />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/ooh-campaign" element={<OOHCampaign />} />
            <Route path="/parking-ticket" element={<ParkingTicket />} />
            <Route path="/mothers-day" element={<MothersDay />} />
            <Route path="/raasta-royal" element={<RaastaRoyal />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
