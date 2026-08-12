import { Fragment, type ReactNode } from 'react'

// ————————————————————————————————————————————————————————————
// Quiet emphasis, applied from the copy rather than by hand.
//
// The two things this portfolio needs a reader to retain are the market she is
// moving to and the business she runs growth for. Hand-wrapping those words at
// every call site would guarantee they drift apart; this walks the string and
// marks them wherever they appear, so the treatment stays identical and new
// copy inherits it for free.
//
// Ordered longest-first so "Square Yards Australia" is matched whole instead of
// being torn into a company and a country by the shorter patterns.
// ————————————————————————————————————————————————————————————

const PHRASES = [
  'Square Yards Australia',
  'SQY Australia',
  'Square Yards',
  'Australia',
  'Sydney',
]

const PATTERN = new RegExp(`(${PHRASES.join('|')})`, 'g')

export default function Marked({ children }: { children: string }): ReactNode {
  const parts = children.split(PATTERN)
  return parts.map((part, i) =>
    // split() with one capture group puts the matches at every odd index
    i % 2 === 1 ? (
      <span key={i} className="mark">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}
