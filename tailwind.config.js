/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // NOTE: token names kept stable across palette revisions so
        // components never need touching — only the hex values move.
        //
        // The palette is deliberately three flat colours: black, orange, bone.
        // No gradient ramps, no in-between tints — a section is one of the three
        // and the type on it is one of the other two.
        //   midnight/charcoal/warmdark = dark surfaces (bg → cards)
        //   bone/ink = the LIGHT surface and the type that sits on it
        //   ivory = light text · fog = muted text · gold = primary accent
        midnight: '#0F0E0C', // warm flat black — the dark blocks & campaign base
        charcoal: '#161412', // one step up — alt dark sections
        warmdark: '#1D1A17', // flat dark card surface
        bone: '#E8E0D2', // warm sand — the practice-side base surface
        sand: '#DED5C4', // one step down from bone — hairline fills, alt bands
        ink: '#17150F', // warm near-black — type on sand and on orange
        ivory: '#F5F0EA', // off-white — primary text on the dark blocks
        fog: '#8E8880', // muted — secondary text on the dark blocks
        gold: {
          DEFAULT: '#FF5A1E', // vivid orange — primary/dominant accent
          light: '#FF7A3D', // one step up — hover only, never a gradient stop
        },
        // legacy accent tokens, kept so campaign pages keep compiling
        lavender: '#FF5A1E',
        mint: '#12B8A6',
        peach: '#FF5A1E',
        sky: '#4C8DFF',
        coral: '#FF3D6E',
        sunny: '#FFB020',
      },
      fontFamily: {
        display: ['"Clash Display"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Satoshi"', '"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Consolas', 'monospace'],
      },
      letterSpacing: { widest: '0.25em' },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        breathe: { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.01)' } },
        'float-slow': { '0%, 100%': { transform: 'translateY(-10px)' }, '50%': { transform: 'translateY(10px)' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'blob-drift': {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(4%, -6%) scale(1.08)' },
          '66%': { transform: 'translate(-5%, 4%) scale(0.95)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease forwards',
        marquee: 'marquee 40s linear infinite',
        breathe: 'breathe 8s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
        'blob-drift': 'blob-drift 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
