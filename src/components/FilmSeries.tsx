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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.75, delay: i * 0.08, ease }}
    >
      {/* The poster is type, not a still, so it is sized by its content - an
          aspect-video box is far too short for it at narrow widths and clips
          the play affordance clean off. The player gets the video ratio. */}
      <div
        className={`relative w-full overflow-hidden bg-gold ${
          playing
            ? 'aspect-video'
            : featured
              ? 'min-h-[420px] md:min-h-[560px]'
              : 'min-h-[340px] md:min-h-[400px]'
        }`}
      >
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
            className="group absolute inset-0 w-full h-full text-left p-7 md:p-9 flex flex-col justify-between transition-colors duration-300 hover:bg-ink"
          >
            <div className="flex items-baseline justify-between gap-4 text-ink group-hover:text-bone transition-colors">
              <span className="label !text-[9px] !text-ink/70 group-hover:!text-bone/70 transition-colors">{f.kicker}</span>
              <span className="label !text-[9px] !text-ink/70 group-hover:!text-bone/70 transition-colors">{f.meta}</span>
            </div>

            <div className="text-ink group-hover:text-bone transition-colors">
              <h3
                className="font-display font-semibold"
                style={{
                  fontSize: featured ? 'clamp(2rem, 4.6vw, 4rem)' : 'clamp(1.6rem, 3vw, 2.6rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.03,
                }}
              >
                {f.title}
              </h3>
              <p className="mt-3 max-w-[46ch] text-sm leading-relaxed opacity-75">{f.blurb}</p>
              <span className="mt-6 inline-flex items-center gap-3 label !text-[9px] !text-ink group-hover:!text-bone transition-colors">
                <span className="grid place-items-center w-8 h-8 rounded-full border border-current">
                  <span className="ml-[3px] block h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-current" />
                </span>
                Play here
              </span>
            </div>
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
          <p className="label mb-5">Chapter 02 - Film</p>
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
