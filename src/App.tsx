import { useState } from 'react'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import IntroStrip from './components/IntroStrip'
import BottleneckTrack from './components/BottleneckTrack'
import Media from './components/Media'
import ExploreCards from './components/ExploreCards'
import Contact from './components/Contact'

// The homepage is an introduction, not the whole portfolio: who she is, the
// problem she solves, and the doors into the detail. Everything that needs
// room — capabilities, method, case studies, background — has its own route.
export default function Home() {
  const [started, setStarted] = useState(false)

  return (
    <div>
      <Preloader onDone={() => setStarted(true)} />
      <Nav />
      <Hero started={started} />
      <IntroStrip />
      <BottleneckTrack />
      {/* the dismantling brain — moved here from /about */}
      <Media />
      <ExploreCards />
      <Contact />
    </div>
  )
}
