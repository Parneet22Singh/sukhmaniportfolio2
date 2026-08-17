// ============================================================
// IMPACT — FY 2025-26 performance, curated for publication
//
// Source: the internal FY25-26 marketing dashboard.
//
// DELIBERATELY EXCLUDED: absolute spend per team, marketing revenue, and
// revenue share. Those are the employer's financials, not hers to publish, and
// the ratios carry the same argument — "11x ROAS" says what the rupee figure
// says without handing a competitor the budget.
// ============================================================

export const impactHeadline = [
  { value: '36%', label: 'Average CPL reduction', note: 'across nine markets' },
  { value: '404K', label: 'Paid leads generated', note: 'six business lines' },
  { value: '27%', label: 'Average CPC reduction', note: 'same period' },
  { value: '11×', label: 'Peak return on ad spend', note: 'GCC portfolio' },
]

// The homepage chart. Sorted by the size of the drop, because the story is that
// it moved everywhere and not just in one lucky market.
export const cplByMarket = [
  { market: 'Hyderabad', from: 3016, to: 802, drop: 73 },
  { market: 'Noida', from: 735, to: 237, drop: 68 },
  { market: 'Mumbai', from: 1457, to: 597, drop: 59 },
  { market: 'Chennai', from: 4001, to: 1697, drop: 58 },
  { market: 'Dubai', from: 3695, to: 1665, drop: 55 },
  { market: 'Pune', from: 1420, to: 828, drop: 42 },
  { market: 'Abu Dhabi', from: 3540, to: 2453, drop: 31 },
  { market: 'Bangalore', from: 1341, to: 1092, drop: 19 },
]

export const roasByMarket = [
  { market: 'INCO · GCC', roas: 11 },
  { market: 'INCO · India', roas: 7 },
  { market: 'IPM', roas: 4 },
  { market: 'Australia', roas: 3 },
  { market: 'Canada', roas: 2 },
]

// Paid lead volume by acquisition source, all lines combined.
export const leadSources = [
  { source: 'Paid', leads: 404132 },
  { source: 'Direct / walk-in', leads: 141007 },
  { source: 'Calling data', leads: 134677 },
  { source: 'Organic + website', leads: 83016 },
  { source: 'Referral / partner', leads: 1386 },
  { source: 'Social', leads: 342 },
]

export const reach = {
  columns: ['SQY', 'INCO', 'UM', 'SQY UAE'],
  rows: [
    { metric: 'LinkedIn impressions', values: ['5.1M', '441K', '1.12M', '443K'] },
    { metric: 'LinkedIn followers', values: ['405K', '59K', '55K', '22K'] },
    { metric: 'Facebook views', values: ['38.5M', '186.2M', '873.9K', '227.3K'] },
    { metric: 'Instagram reach', values: ['6.5M', '22.8M', '354K', '39.2K'] },
    { metric: 'YouTube views', values: ['2.4M (17×)', '4M (23×)', '-', '-'] },
    { metric: 'Videos past 100K', values: ['91', '26', '1', '4'] },
  ],
}

// Reputation is the clearest before/after on the whole sheet, so it is shown as
// a movement rather than a single number.
export const reputation = [
  { channel: 'TrustPilot', before: 1.4, after: 4.7, yoy: '+236%' },
  { channel: 'MouthShut', before: 2.1, after: 4.5, yoy: '+114%' },
  { channel: 'Glassdoor', before: 3.3, after: 3.6, yoy: '+9%' },
  { channel: 'Google · SQY', before: 4.01, after: 4.21, yoy: '+4.8%' },
  { channel: 'Google · INCO', before: 4.52, after: 4.58, yoy: '+1.3%' },
]

export const reviewVolume = [
  { label: 'Customer reviews', value: '18,611', note: 'FY 25-26' },
  { label: 'Employee reviews', value: '6,191', note: 'from 721 · +88%' },
]

export const contentOutput = {
  columns: ['SQY', 'UM', 'INCO'],
  rows: [
    { metric: 'Articles published', values: ['1,954', '591', '2,559'] },
    { metric: 'Media mentions', values: ['1,355', '413', '-'] },
    { metric: 'PR pieces', values: ['598', '326', '-'] },
    { metric: 'Research reports', values: ['7', '3', '-'] },
    { metric: 'Videos produced', values: ['322', '305', '363'] },
  ],
  total: '1,143 videos · 8,366 pieces of content and PR',
}

// Generative-engine optimisation: the newest channel on the sheet and the one
// with the steepest curve, which is why it gets its own block.
export const geoGrowth = [
  { metric: 'GEO sessions', sqy: '+976%', inco: '+1,701%', um: '+737%' },
  { metric: 'GEO leads', sqy: '+1,818%', inco: '-', um: '+88%' },
  { metric: 'Answer visibility', sqy: '+97%', inco: '+3,264%', um: '+2,193%' },
]

export const searchMoves = [
  { metric: 'Organic impressions · UM', value: '+184%' },
  { metric: 'Organic clicks · UM', value: '+111%' },
  { metric: 'Keywords in top 10 · INCO', value: '+52%' },
  { metric: 'Keywords in top 10 · UM', value: '+28%' },
  { metric: 'Organic leads · INCO', value: '+27%' },
  { metric: 'Organic leads · UM', value: '+16%' },
]
