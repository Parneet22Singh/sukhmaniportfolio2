import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CampaignPage from '../components/CampaignPage'
import YouTube from '../components/YouTube'
import PhotoGallery from '../components/PhotoGallery'
import { mothersDay as data } from '../data/portfolio'

// rotating pastel gradients for the UGC cards (no post screenshots yet)
const CARD_GRADIENTS = [
  'linear-gradient(150deg,#FF8FA6,#B8A6F0)',
  'linear-gradient(150deg,#FFB48A,#FF8FA6)',
  'linear-gradient(150deg,#B8A6F0,#8FD0F0)',
  'linear-gradient(150deg,#7FE0C0,#8FD0F0)',
  'linear-gradient(150deg,#FFD873,#FFB48A)',
  'linear-gradient(150deg,#8FD0F0,#B8A6F0)',
]

const ROSE = '#FF6F91'
const ease = [0.22, 1, 0.36, 1] as const

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay, ease }}>
      {children}
    </motion.div>
  )
}

export default function MothersDay() {
  return (
    <CampaignPage currentSlug="mothers-day" accent={ROSE}>
      {/* ----- HERO ----- */}
      <section className="relative pt-36 pb-[10vh] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.14]" style={{ background: `radial-gradient(ellipse 60% 45% at 50% 12%, ${ROSE}, transparent 65%)` }} />
        <div className="relative max-w-[1100px] mx-auto px-6 md:px-12 text-center">
          <p className="label mb-8" style={{ color: ROSE }}>{data.brand} · {data.type}</p>
          <h1 className="font-serif text-ivory" style={{ fontSize: 'clamp(2.6rem, 7vw, 6.5rem)', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
            A first home, for the
            <br />
            <em style={{ color: ROSE }}>woman who gave you one.</em>
          </h1>
          <p className="mt-10 max-w-[620px] mx-auto text-fog leading-relaxed text-lg">{data.description}</p>
          <div className="mt-9 flex justify-center gap-3 flex-wrap">
            {data.hashtags.map((h) => (
              <span key={h} className="label rounded-full px-4 py-2 border" style={{ color: ROSE, borderColor: `${ROSE}44`, background: `${ROSE}0D` }}>
                {h}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ----- THE FILM ----- */}
      <section className="relative pb-[12vh] px-6 md:px-12">
        <div className="max-w-[980px] mx-auto">
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden shadow-soft border" style={{ borderColor: `${ROSE}33` }}>
              <YouTube id={data.videoId} title="Mother's Day campaign film" className="!rounded-none" />
            </div>
            <p className="label text-center mt-6">The campaign film - gifting the first home</p>
          </Reveal>
        </div>
      </section>

      {/* ----- SIX VOICES ----- */}
      <section className="relative py-[10vh] px-6 md:px-12 border-t border-ivory/10">
        <div className="max-w-[1300px] mx-auto">
          <Reveal className="text-center mb-6">
            <p className="label" style={{ color: ROSE }}>Employee Advocacy · UGC</p>
          </Reveal>
          <Reveal className="text-center mb-10" delay={0.1}>
            <h2 className="font-serif text-ivory" style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', lineHeight: 1.1 }}>
              Six voices. <em style={{ color: ROSE }}>One feeling.</em>
            </h2>
            <p className="mt-5 text-fog max-w-[480px] mx-auto">
              No media spend - just six colleagues telling their own mother's story, in their own words, on their own feeds.
            </p>
          </Reveal>

          {/* draggable UGC cards - gradient placeholders until post screenshots are added */}
          <PhotoGallery
            photos={data.posts.map((p, i) => ({
              label: p.name,
              sublabel: p.handle,
              link: p.url,
              gradient: CARD_GRADIENTS[i % CARD_GRADIENTS.length],
            }))}
          />
        </div>
      </section>
    </CampaignPage>
  )
}
