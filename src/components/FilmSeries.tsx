import { useState } from 'react'
import { motion } from 'framer-motion'
import { filmSeries } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const

// ————————————————————————————————————————————————————————————
// Long-form video: the TVC reel and the branded series.
//
// Both are YouTube *playlists*, so the facade is a flat orange poster rather
// than a thumbnail — a playlist has no single canonical still, and pulling
// one would mean guessing at a video id. Clicking swaps in the embed, which
// plays the whole playlist in place. Nobody leaves the site to watch this.
// ————————————————————————————————————————————————————————————

function Film({ f, i, featured = false }: { f: (typeof filmSeries)[number]; i: number; featured?: boolean }) {
  const [playing, setPlaying] = useState(false)

  // A playlist with a named opening film starts there; one without just runs
  // the series from the top.
  const src = f.videoId
    ? `https://www.youtube.com/embed/${f.videoId}?list=${f.playlistId}&rel=0&modestbranding=1&autoplay=1`
    : `https://www.youtube.com/embed/videoseries?list=${f.playlistId}&rel=0&modestbranding=1&autoplay=1`

  return (
    <motion.div
      id={f.id}
      className="scroll-mt-28"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.75, delay: i * 0.08, ease }}
    >
      {/* A real still, not a typographic placeholder. A playlist has no
          thumbnail of its own, so each entry names the video whose frame stands
          for it and the poster pulls that frame from ytimg. */}
      <div className={`relative w-full overflow-hidden bg-ink ${featured ? 'aspect-[16/9] md:aspect-[2/1]' : 'aspect-video'}`}>
        {playing ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={src}
            title={f.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            data-cursor="hover"
            aria-label={`Play ${f.title}`}
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 w-full h-full text-left"
          >
            <img
              src={`https://i.ytimg.com/vi/${f.videoId}/maxresdefault.jpg`}
              srcSet={`https://i.ytimg.com/vi/${f.videoId}/hqdefault.jpg 480w, https://i.ytimg.com/vi/${f.videoId}/maxresdefault.jpg 1280w`}
              sizes={featured ? '(max-width: 768px) 100vw, 1300px' : '(max-width: 768px) 100vw, 640px'}
              alt={f.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            {/* the scrim is what keeps the type legible over an arbitrary frame */}
            <span className="absolute inset-0 bg-ink/55 transition-colors duration-300 group-hover:bg-ink/45" />

            <span className="absolute inset-0 p-7 md:p-9 flex flex-col justify-between text-bone">
              <span className="flex items-baseline justify-between gap-4">
                <span className="label !text-[9px] !text-bone/75">{f.kicker}</span>
                <span className="label !text-[9px] !text-bone/75">{f.meta}</span>
              </span>

              <span className="block">
                <span
                  className="block font-display font-semibold"
                  style={{
                    fontSize: featured ? 'clamp(1.8rem, 4.2vw, 3.6rem)' : 'clamp(1.4rem, 2.6vw, 2.2rem)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.03,
                  }}
                >
                  {f.title}
                </span>
                <span className="mt-3 block max-w-[46ch] text-sm leading-relaxed text-bone/75">{f.blurb}</span>
                <span className="mt-6 inline-flex items-center gap-3 label !text-[9px] !text-bone">
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-gold text-ink">
                    <span className="ml-[3px] block h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-current" />
                  </span>
                  Play here
                </span>
              </span>
            </span>
          </button>
        )}
      </div>
    </motion.div>
  )
}

// The first entry gets the full width and the big type; the rest sit beside a
// short note. On a page that is only about the film work, a flat grid of equal
// tiles gave no sense of which body of work is the headline.
export default function FilmSeries() {
  const [lead, ...rest] = filmSeries

  return (
    <section id="film" className="relative px-6 md:px-12 py-[16vh]">
      <div className="max-w-[1300px] mx-auto">
        <motion.div
          className="max-w-[760px] mb-[8vh]"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="label mb-5">Film</p>
          <h2
            className="font-display font-semibold text-ink"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.6rem)', letterSpacing: '-0.035em', lineHeight: 1 }}
          >
            TVCs and the <span className="text-gold">series.</span>
          </h2>
          <p className="mt-8 max-w-[560px] text-ink/65 leading-relaxed">
            Both play here. Neither sends you anywhere else.
          </p>
        </motion.div>

        <Film f={lead} i={0} featured />

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {rest.map((f, i) => (
            <Film key={f.playlistId} f={f} i={i + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
