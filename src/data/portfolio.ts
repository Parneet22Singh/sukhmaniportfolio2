// ============================================================
// SUKHMANI — PORTFOLIO CONTENT
// Single source of truth for all site copy & media.
// ============================================================

export const profile = {
  name: 'Sukhmani',
  title: 'Associate Vice President – Marketing',
  discipline: 'Growth & Marketing Leadership',
  email: 'sukhmanibaghla@outlook.com',
  phone: '+91 9910853014',
  linkedin: 'https://www.linkedin.com/in/sukhmani-baghla/',
  location: 'Gurugram, India',
  relocating: 'Relocating to Sydney, Australia · Aug 2026',
  tagline: 'I find what is holding the business back — and fix it.',
  positioning:
    'Nine years running growth for a business that scaled across five markets. Marketing is where I started; the constraint is what I actually solve for.',
  statusBadge: 'Open to senior roles in Australia, from Aug 2026',
  specialisms: ['Growth Strategy', 'Brand & Narrative', 'Demand Generation', 'Operating Structure'],
}

export const stats = [
  { value: '9+', label: 'Years leading growth' },
  { value: '5', label: 'Markets operated in' },
  { value: '3', label: 'Teams built and run' },
  { value: 'MBA', label: 'Advanced · Wollongong' },
]

export const bio = {
  paragraphs: [
    'I spent nine years inside a business that grew across India and the Middle East — not advising from the outside, but owning the number, the budget and the teams. That means I have made the calls, lived with the consequences, and learned where growth actually breaks.',
    'It rarely breaks where people think. The brief says "we need better campaigns." The real problem is usually a positioning nobody agrees on, a funnel that leaks after the click, or a sales and marketing pair working from two different definitions of a good lead.',
    "I am completing an MBA (Advanced) at the University of Wollongong's Sydney Campus, and moving to Australia in 2026 to do this work for businesses there.",
  ],
  pullQuote:
    'Most businesses do not have a marketing problem. They have a problem that marketing was asked to hide.',
}

// ============================================================
// THE CONSULTING SPINE
// Bottlenecks → capabilities → how an engagement actually runs.
// ============================================================

// The opening scroll journey. Each beat is one stage of the pinned hero.
export const heroJourney = [
  {
    kicker: 'The brief you are given',
    line: 'We need better marketing.',
    sub: 'It is almost never the real problem.',
  },
  {
    kicker: 'The problem underneath',
    line: 'Something upstream is broken.',
    sub: 'Positioning nobody agrees on. A funnel that leaks. Two teams optimising against each other.',
  },
  {
    kicker: 'What I actually do',
    line: 'Find the constraint. Fix it.',
    sub: 'Then leave behind a team and a system that can run without me.',
  },
]

// Where businesses get stuck. The diagnostic core of the site.
export const bottlenecks = [
  {
    n: '01',
    keyword: 'Leaky funnel',
    note: 'Spend up. Pipeline flat.',
    symptom: 'Spend keeps going up. Pipeline does not.',
    signals: ['Rising cost per lead', 'Flat conversion', 'Sales says the leads are junk'],
    reality:
      'The budget is buying attention the rest of the business cannot convert. More spend on a leaking funnel just makes the leak more expensive.',
    fix: 'Rebuild the path from first touch to closed deal, find the stage that actually drops, and move money to it before adding a rupee of new spend.',
  },
  {
    n: '02',
    keyword: 'Brand drift',
    note: 'Three teams. Three brands.',
    symptom: 'Three teams. Three different versions of the brand.',
    signals: ['Inconsistent messaging', 'Every region freelancing', 'Agencies pulling in three directions'],
    reality:
      'Without governance, brand becomes whoever shouted loudest in the last review. Recall never compounds because nothing repeats.',
    fix: 'One positioning, one messaging framework, and a governance model with enough teeth to hold across markets, agencies and channels.',
  },
  {
    n: '03',
    keyword: 'Lead mismatch',
    note: 'Sales and marketing disagree.',
    symptom: 'Marketing and sales cannot agree on what a good lead is.',
    signals: ['MQL/SQL arguments', 'CRM data nobody trusts', 'Handoffs going cold'],
    reality:
      'Two functions optimising different scoreboards. Marketing hits its target, sales misses theirs, and both are telling the truth.',
    fix: 'A shared definition, a shared dashboard, and one number both teams are measured on. Usually the fastest win available.',
  },
  {
    n: '04',
    keyword: 'No attribution',
    note: 'It worked. Unprovable.',
    symptom: 'The campaign worked. Nobody can prove it.',
    signals: ['Reporting that stops at reach', 'No attribution', 'Budget defended on vibes'],
    reality:
      'Work that cannot be measured cannot be defended, repeated, or funded. Good marketing quietly dies in budget review.',
    fix: 'Attribution wired to pipeline, live dashboards leadership actually reads, and a reporting rhythm that survives the next planning cycle.',
  },
  {
    n: '05',
    keyword: 'Copy-paste expansion',
    note: 'New market. Old playbook.',
    symptom: 'A new market, run on the last market’s playbook.',
    signals: ['Flat launch', 'Creative that does not land', 'Local team going quiet'],
    reality:
      'What worked in one market is a hypothesis in the next, not a plan. Copy-paste expansion burns the launch window.',
    fix: 'Consumer intelligence first, then a localised go-to-market that keeps the brand intact and throws away everything else that does not travel.',
  },
]

// Capability areas — deliberately wider than "marketing".
export const capabilities = [
  {
    n: '01',
    area: 'Growth & Go-to-Market',
    lede: 'Where the growth actually comes from',
    body: 'Diagnosing the real constraint on growth, sizing the opportunities worth chasing, and building the go-to-market plan that gets there — including the parts that are not marketing.',
    tags: ['Growth diagnosis', 'GTM strategy', 'Market entry', 'Pricing input'],
  },
  {
    n: '02',
    area: 'Brand & Narrative',
    lede: 'One story, told the same way everywhere',
    body: 'Positioning built from consumer intelligence rather than opinion, a messaging framework the whole company can use, and governance that holds it together across markets, agencies and channels.',
    tags: ['Positioning', 'Messaging frameworks', 'Brand governance', 'Thought leadership'],
  },
  {
    n: '03',
    area: 'Demand & Pipeline',
    lede: 'Attention that converts into revenue',
    body: 'Integrated campaigns across digital, OOH, influencer, social and events — built backwards from a pipeline target rather than forwards from a creative idea.',
    tags: ['Integrated campaigns', 'SEO / SEM', 'Performance', 'Lead generation'],
  },
  {
    n: '04',
    area: 'Teams & Operating Structure',
    lede: 'The org chart is part of the problem',
    body: 'Structuring in-house teams and agency ecosystems so work ships: who owns what, which capability belongs inside, what to buy, and how the handoffs between marketing, sales and CRM actually work.',
    tags: ['Team design', 'Agency management', 'Vendor selection', 'Sales alignment'],
  },
  {
    n: '05',
    area: 'Measurement & Decisions',
    lede: 'Numbers leadership can act on',
    body: 'Attribution wired to pipeline, MIS reporting and dashboards that get read, and a decision rhythm where the next quarter’s budget follows evidence instead of the loudest advocate.',
    tags: ['Attribution', 'Dashboards & MIS', 'ROI analysis', 'Testing'],
  },
  {
    n: '06',
    area: 'Reputation & Risk',
    lede: 'What people say when you are not in the room',
    body: 'Online reputation management as an operating discipline — monitoring, response protocols, and the escalation paths that keep a bad week from becoming a bad year.',
    tags: ['ORM', 'Crisis response', 'Review ecosystems', 'Community'],
  },
]

// How an engagement runs, start to finish.
export const operatingModel = {
  label: 'How I work',
  heading: 'Diagnose before prescribing.',
  body: 'Most engagements fail because someone started building before they understood what was broken. Mine run in four movements, and the first one is not optional.',
  steps: [
    {
      n: '01',
      title: 'Diagnose',
      duration: 'Weeks 1–2',
      body: 'Data, CRM, spend history, and honest conversations with the people doing the work. The goal is one sentence: here is the constraint.',
    },
    {
      n: '02',
      title: 'Prioritise',
      duration: 'Week 3',
      body: 'Not a list of twenty recommendations. The two or three moves with the largest effect on the constraint, sequenced, costed, and argued for in front of leadership.',
    },
    {
      n: '03',
      title: 'Build',
      duration: 'Ongoing',
      body: 'Executed with the team, not beside it. Campaigns go live, frameworks get used, dashboards get wired. I stay accountable to the number, not the deck.',
    },
    {
      n: '04',
      title: 'Hand over',
      duration: 'Close',
      body: 'A team that can run it, documentation they will actually open, and reporting that survives after I leave. The engagement should make itself unnecessary.',
    },
  ],
}

// Proof, framed as consulting cases rather than creative showcases.
export const caseStudies = [
  {
    slug: 'parking-ticket',
    name: 'Find The Right Space For You',
    context: 'Square Yards · Delhi-NCR, Mumbai, Bengaluru · 2026',
    problem:
      'Property advertising in India is interchangeable. Every competitor was buying the same channels to say the same thing, and awareness spend was not converting into consideration.',
    diagnosis:
      'The category was competing on inventory and price — rational messages nobody remembers. Nobody had claimed the emotional problem the customer actually lives with: shrinking urban space.',
    intervention:
      'A hyperlocal guerrilla activation placing branded mock parking tickets across high-footfall locations in three cities, paired with creator-led digital storytelling to carry it beyond the street.',
    outcome: [
      { value: '3,00,000+', label: 'Consumer interactions' },
      { value: '3 cities', label: 'Activated in 3 days' },
      { value: '3 outlets', label: 'Earned national press' },
    ],
    accent: '#FF7A1A',
  },
  {
    slug: 'ooh-campaign',
    name: 'OOH & DOOH Campaign',
    context: 'Square Yards · India · 2021–2022',
    problem:
      'Low unaided recall in a hyper-competitive housing market where every brand was buying the same outdoor corridors.',
    diagnosis:
      'Media placement was not the constraint — creative interchangeability was. The brand was paying premium rates for sites that delivered impressions without memory.',
    intervention:
      'Bold double-entendre outdoor creative built for talkability, placed in high-visibility corridors and extended into social so a static site kept earning after the drive-by.',
    outcome: [
      { value: '11', label: 'Creative placements' },
      { value: 'OOH + DOOH', label: 'Extended into social' },
      { value: 'Recall', label: 'From impressions to memory' },
    ],
    accent: '#F5C518',
  },
  {
    slug: 'mothers-day',
    name: 'The #FirstHome Campaign',
    context: 'Square Yards · Social-first · Employee advocacy',
    problem:
      'Paid social costs were climbing while organic reach fell. Brand-account content was being ignored by the audience that mattered.',
    diagnosis:
      'The most credible channel the business owned was sitting unused: its own people. Employee posts outperform brand posts on reach and trust, and cost nothing in media.',
    intervention:
      'A social-first campaign built around gifting a first home to your mother, activated through six employee voices on LinkedIn under a single #FirstHome narrative.',
    outcome: [
      { value: '6 voices', label: 'Employee advocates activated' },
      { value: 'Organic', label: 'Reach without media spend' },
      { value: 'UGC', label: 'Repeatable advocacy model' },
    ],
    accent: '#FF6F91',
  },
  {
    slug: 'raasta-royal',
    name: 'Raasta bhi Royal',
    context: 'Square Yards · Brand film · Integrated',
    problem:
      'The brand was known for transactions, not for meaning anything. Performance marketing was carrying a brand with no emotional floor beneath it.',
    diagnosis:
      'Nothing in the funnel was building preference. Every rupee had to buy its own conversion because no prior affinity existed to draw on.',
    intervention:
      'A brand film making the road to owning a home feel as grand as the destination, cut for social and digital and wired into the wider campaign calendar.',
    outcome: [
      { value: 'Brand film', label: 'Aspiration-led positioning' },
      { value: 'Multi-format', label: 'Video · social · digital' },
      { value: 'Affinity', label: 'A floor under performance' },
    ],
    accent: '#E7C873',
  },
]

export const education = [
  {
    degree: 'MBA Advanced',
    institution: 'University of Wollongong',
    location: 'Sydney Campus, Australia',
    period: 'August 2026 – Present',
    note: 'Starting Aug 2026 · Student Visa (Subclass 500)',
    highlighted: true,
  },
  {
    degree: 'Master of Arts – English',
    institution: 'Panjab University',
    location: 'Chandigarh, India',
    period: '2015 – 2017',
    highlighted: false,
  },
  {
    degree: 'Bachelor of Arts (Hons) – English',
    institution: 'University of Delhi',
    location: 'India',
    period: '2012 – 2015',
    highlighted: false,
  },
]

export const experience = [
  {
    role: 'Associate Vice President – Marketing',
    company: 'Square Yards',
    location: 'Gurugram, India',
    period: 'June 2025 - July 2026',
    tag: 'Current',
    teams: ['ORM', 'Branding', 'Social Media'],
    mandate:
      'Own the brand and demand engine across markets — and make it answer to pipeline, not impressions.',
    points: [
      'Led three specialised teams — ORM, Branding, and Social Media — driving a unified brand voice across digital and offline channels.',
      'Directed end-to-end brand and content strategy across multiple markets, integrating digital, OOH, influencer, and event-driven campaigns into cohesive, high-impact programmes.',
      'Conceptualised and hosted a branded podcast, building thought leadership and extending audience engagement beyond traditional marketing channels.',
      'Partnered with agencies and vendors to deliver campaigns aligned with brand strategy, ensuring consistency and quality across all touchpoints.',
      'Collaborated with Sales and CRM teams to align marketing activity with lead conversion and customer acquisition outcomes.',
      'Drove data-led performance improvement through campaign reporting, dashboards, and ROI analysis.',
    ],
  },
  {
    role: 'Associate General Manager – Marketing',
    company: 'Square Yards',
    location: 'Gurugram, India',
    period: 'Feb 2020 – Apr 2025',
    tag: '5 Years',
    teams: [],
    mandate:
      'Scale marketing across India and the Middle East without losing the brand in translation.',
    points: [
      'Directed integrated marketing campaigns across India and the Middle East, managing multi-channel budgets and cross-functional teams to deliver against growth targets.',
      'Built brand visibility and recall in competitive markets through targeted regional initiatives and consistent brand governance.',
      'Managed agency and vendor ecosystems, ensuring cost-effective, on-brand execution of advertising and promotional activity.',
      'Delivered actionable competitive and consumer intelligence that directly shaped marketing strategy and messaging frameworks.',
      'Aligned marketing planning with Sales, CRM, and Planning stakeholders to ensure campaigns drove measurable pipeline contribution.',
    ],
  },
  {
    role: 'Process Specialist – Digital Marketing',
    company: 'Cognizant Technology Solutions',
    location: 'Gurugram, India · On-site: Google AdWords',
    period: 'Jul 2017 – Jan 2020',
    tag: '2.5 Years',
    teams: [],
    mandate:
      'Learn the machinery — platform-level digital execution for global clients, on-site at Google.',
    points: [
      'Delivered tailored digital marketing solutions for global clients, maintaining high standards of campaign performance and client satisfaction.',
      'Led training and quality assurance for digital content teams, lifting capability and output consistency across the group.',
      'Developed hands-on expertise across digital advertising platforms, content optimisation, and client-facing campaign strategy.',
    ],
  },
]

export const skills = [
  'Growth Diagnosis',
  'Go-to-Market Strategy',
  'Brand Positioning',
  'P&L-Led Budgeting',
  'Team & Org Design',
  'Sales & Marketing Alignment',
  'Market Entry',
  'Attribution & ROI',
  'Agency & Vendor Governance',
  'Consumer Intelligence',
  'Dashboards & MIS',
  'Reputation Management',
  'Stakeholder Negotiation',
  'C-Suite Advisory',
]

// --- Media grid (personal reels) ---
export const mediaReels = [
  { type: 'youtube' as const, id: 'Tr-0REgn62k', title: 'Brand Campaign Showreel' },
  { type: 'youtube' as const, id: 'iSle_QKhovo', title: 'Campaign Highlights' },
  { type: 'youtube' as const, id: 'MPi2jnUAnuA', title: 'Marketing Series' },
  { type: 'instagram' as const, url: 'https://www.instagram.com/reel/DO5a3ynEnl6/', title: 'Instagram — ORM' },
  { type: 'instagram' as const, url: 'https://www.instagram.com/reel/DQyTj4QkpB3/', title: 'Instagram — Branding' },
  { type: 'instagram' as const, url: 'https://www.instagram.com/reel/DTzmsPziCFH/', title: 'Instagram — Social' },
]

// --- Campaign index (used by nav dropdown + campaign cards) ---
// `accent` is a hex color that themes each campaign's bespoke page.
export const campaignIndex = [
  {
    slug: 'ooh-campaign',
    title: 'OOH Campaign',
    kicker: 'Billboard · DOOH',
    blurb: 'Bold, unconventional outdoor campaign that cut through a hyper-competitive housing market.',
    period: '2021–2022',
    accent: '#F5C518', // billboard amber
  },
  {
    slug: 'parking-ticket',
    title: 'Find The Right Space For You',
    kicker: 'Guerrilla · Hyperlocal',
    blurb: 'Branded mock parking tickets turned everyday frustration into a citywide conversation.',
    period: 'May 2026',
    accent: '#FF7A1A', // citation orange
  },
  {
    slug: 'mothers-day',
    title: "Mother's Day",
    kicker: 'Social-first · UGC',
    blurb: 'A heartfelt campaign about gifting a first home to your mother, powered by employee voices.',
    period: 'Social',
    accent: '#FF6F91', // warm rose
  },
  {
    slug: 'raasta-royal',
    title: 'Raasta bhi Royal',
    kicker: 'Brand Film',
    blurb: 'Making the road to owning a home feel as grand as the destination itself.',
    period: 'Film',
    accent: '#E7C873', // royal gold
  },
]

// ============================================================
// CAMPAIGN DETAIL DATA
// ============================================================

export const oohCampaign = {
  slug: 'ooh-campaign',
  name: 'OOH Campaign',
  type: 'Billboard · DOOH (Digital Out-of-Home)',
  brand: 'Square Yards',
  period: '2021–2022',
  theme:
    'Bold, unconventional outdoor campaign using double-entendre humour and high-visibility placements to cut through a hyper-competitive housing market.',
  tags: ['Brand Awareness', 'OOH & DOOH', 'Integrated Campaign'],
  images: [
    { url: '/img/campaigns/ooh/banner_design.jpg', caption: 'OOH Banner Design — Square Yards' },
    { url: '/img/campaigns/ooh/img.09.jpg', caption: 'Campaign Execution' },
    { url: '/img/campaigns/ooh/img.03.jpg', caption: 'Billboard Creative' },
    { url: '/img/campaigns/ooh/img.08.gif', caption: 'Dynamic DOOH Animation' },
    { url: '/img/campaigns/ooh/img.10.jpg', caption: 'High-Traffic Placement' },
    { url: '/img/campaigns/ooh/traffic.01.jpg', caption: 'Threesome on your bucket list? — Double Meaning Humour' },
    { url: '/img/campaigns/ooh/traffic.02.jpg', caption: 'Theka kitni dur hai? — Traffic & Engagement' },
    { url: '/img/campaigns/ooh/traffic.03.jpg', caption: 'Size Does Matter — Inappropriate Humour' },
    { url: '/img/campaigns/ooh/traffic.04.jpg', caption: 'Can we take your wife on a date? — Cringe Content' },
    { url: '/img/campaigns/ooh/social.media.jpg', caption: 'Social Media Campaign Extension' },
    { url: '/img/campaigns/ooh/social.media.gif', caption: 'Social Media Animation' },
  ],
}

export const parkingTicket = {
  slug: 'parking-ticket',
  officialName: 'Find The Right Space For You',
  brand: 'Square Yards',
  type: 'Guerrilla / Hyperlocal activation',
  dates: 'May 27–29, 2026',
  cities: ['Delhi-NCR', 'Mumbai', 'Bengaluru'],
  executedBy: 'Natter Digital Solutions',
  stats: [
    { value: '3,00,000+', label: 'Consumer Interactions' },
    { value: '3', label: 'Cities Activated' },
    { value: '3 Days', label: 'Activation Window' },
    { value: 'May 2026', label: 'Campaign Month' },
  ],
  description:
    'Hyperlocal brand activation placing branded mock parking tickets across high-footfall locations in three cities — turning the everyday frustration of finding parking into a citywide conversation about shrinking urban space. Paired with creator-led digital storytelling. Generated over 3,00,000 consumer interactions across on-ground and digital platforms.',
  videoId: 'q2s19vlX0UA',
  press: [
    {
      tag: 'Campaign Coverage',
      outlet: 'Impact On Net',
      url: 'https://www.impactonnet.com/more-from-impact/square-yards-new-campaign-turns-parking-frustration-into-a-conversation-on-urban-space-14840.html',
      title:
        "Square Yards' New Campaign Turns Parking Frustration into a Conversation on Urban Space",
    },
    {
      tag: 'Media & Marketing',
      outlet: 'MediaBrief',
      url: 'https://mediabrief.com/square-yards-drops-mock-parking-tickets/',
      title:
        'Square Yards Drops Mock Parking Tickets to Spark Urban Space Constraints Dialogue',
    },
    {
      tag: 'Advertising',
      outlet: 'AdGully',
      url: 'https://www.adgully.com/post/16812/square-yards-sparks-urban-space-conversation-with-parking-campaign',
      title:
        'Square Yards Sparks Urban Space Conversation with Parking Campaign',
    },
  ],
  quotes: [
    {
      name: 'Tanuj Shori',
      role: 'Founder & CEO, Square Yards',
      quote:
        'Space has become one of the most defining challenges of urban living. Whether it is housing, parking, or movement within cities, people are constantly adapting to constraints. With this campaign, we wanted to reflect that lived reality in a way that is immediate, relatable, and grounded in everyday experience.',
    },
    {
      name: 'Divya Krishnan',
      role: 'Head of Marketing, Square Yards',
      quote:
        'Space constraints are something urban consumers encounter every day, whether at home, on the road or in public spaces. We wanted to create a campaign that felt immediate, relatable and capable of starting meaningful conversations.',
    },
  ],
}

export const mothersDay = {
  slug: 'mothers-day',
  brand: 'Square Yards',
  type: 'Social-first · LinkedIn Employee Advocacy · UGC',
  theme: 'Gifting a first home to your mother',
  hashtags: ['#SquareYards', '#MothersDay', '#FirstHome'],
  description:
    'A heartfelt social-first campaign celebrating the idea of gifting a first home to your mother — activating employee voices across LinkedIn and driving organic brand love for Square Yards through the #FirstHome narrative. The campaign activated 6 employee voices across LinkedIn, generating organic reach through authentic, personal posts.',
  videoId: 'iSle_QKhovo',
  posts: [
    { name: 'Sonali Singh', handle: '@sonalisingh2274', url: 'https://www.linkedin.com/posts/sonalisingh2274_squareyards-mothersday-firsthome-ugcPost-7459175169996279809-O4cB' },
    { name: 'Kartik Rai', handle: '@kartik-raii', url: 'https://www.linkedin.com/posts/kartik-raii_squareyards-mothersday-firsthome-ugcPost-7459086750552989696-eueS' },
    { name: 'Unnati Mishra', handle: '@unnatimishra07', url: 'https://www.linkedin.com/posts/unnatimishra07_mothersday-squareyards-home-ugcPost-7459451845195902976-63zG' },
    { name: 'Barsha Rani', handle: '@barsharani', url: 'https://www.linkedin.com/posts/barsharani_squareyards-mothersday-firsthome-ugcPost-7459492731829002240-smQq' },
    { name: 'Gagan Yadav', handle: '@gaganyadavs', url: 'https://www.linkedin.com/posts/gaganyadavs_squareyards-mothersday-firsthome-activity-7459507858905370624-d7R0' },
    { name: 'Pratishtha Agrawal', handle: '@pratishthaagrawal', url: 'https://www.linkedin.com/posts/pratishthaagrawal_campaigns-squareyards-mothersday-ugcPost-7459231162033520640-06SC' },
  ],
}

export const raastaRoyal = {
  slug: 'raasta-royal',
  name: 'Raasta bhi Royal',
  brand: 'Square Yards',
  type: 'Brand Film · Integrated Campaign',
  theme: 'Aspiration & home ownership — "every road to home deserves to feel royal"',
  format: 'Video · Social · Digital',
  description:
    "A brand film celebrating the aspiration behind every homebuyer's journey — making the road to owning a home feel as grand as the destination itself.",
  videoId: 'MPi2jnUAnuA',
  videoStart: 3,
  filmQuote: 'Every road to home deserves to feel royal.',
  brief: [
    { label: 'Campaign Type', value: 'Brand Film / Integrated' },
    { label: 'Brand', value: 'Square Yards' },
    { label: 'Theme', value: 'Aspiration & Home Ownership' },
    { label: 'Format', value: 'Video · Social · Digital' },
  ],
  reelSlots: ['Behind the Scenes', 'Campaign Cut 2', 'Campaign Cut 3'],
  // Media coverage. Seeded with the one publicly-verifiable reference —
  // add real article URLs here as they publish.
  press: [
    {
      tag: 'LinkedIn',
      outlet: 'Square Yards',
      url: 'https://www.linkedin.com/posts/sakshi-joshi-3982a6246_rasta-bhi-royal-by-square-yards-csr-initiative-activity-7433137748926033922-JgSu',
      title: "‘Raasta bhi Royal’ — Square Yards’ brand initiative featured across social.",
    },
  ] as { tag: string; outlet: string; url: string; title: string }[],
}

// Ambient background videos (abstract) used for premium hero / section texture.
export const ambientVideos = {
  hero: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4',
  featured:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4',
  philosophy:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4',
  service1:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
  service2:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
}

// ============================================================
// HOMEPAGE NARRATIVE SECTIONS
// (Featured Video · Strategy × Story · What I Do)
// ============================================================

export const featured = {
  video: ambientVideos.featured,
  label: 'My Approach',
  body: "Every brand has a story worth telling. I start with the audience, find the human truth, and turn it into integrated campaigns that build visibility, generate leads, and earn relationships that last.",
  cta: 'Explore the work',
}

export const philosophy = {
  video: ambientVideos.philosophy,
  headingA: 'Strategy',
  headingB: 'Story',
  blocks: [
    {
      label: 'Where it begins',
      body: 'Every meaningful breakthrough begins at the intersection of disciplined strategy and remarkable creative vision. I operate at that crossroads — turning bold thinking into campaigns that move people and reshape how brands are seen.',
    },
    {
      label: 'What it becomes',
      body: 'The best work emerges when curiosity meets conviction. My process is built to uncover hidden opportunities and translate them into brand experiences that resonate long after the first impression.',
    },
  ],
}

export const services = [
  {
    video: ambientVideos.service1,
    tag: 'Strategy',
    title: 'Brand & Content Strategy',
    desc: 'A unified brand voice across digital and offline — from positioning and messaging frameworks to thought leadership, branded podcasts, and always-on content.',
  },
  {
    video: ambientVideos.service2,
    tag: 'Craft',
    title: 'Integrated Campaigns',
    desc: 'End-to-end campaigns spanning digital, OOH, influencer, and events — conceived, executed, and measured against real pipeline and growth targets.',
  },
]

// Selected-work highlights for the homepage masonry (real campaign visuals).
export const selectedWork = [
  { url: '/img/campaigns/ooh/banner_design.jpg', caption: 'OOH · Square Yards Billboard', slug: 'ooh-campaign' },
  { url: '/img/campaigns/ooh/traffic.01.jpg', caption: 'OOH · Double-Meaning Humour', slug: 'ooh-campaign' },
  { url: '/img/campaigns/ooh/img.03.jpg', caption: 'OOH · Billboard Creative', slug: 'ooh-campaign' },
  { url: '/img/campaigns/ooh/traffic.03.jpg', caption: 'OOH · Size Does Matter', slug: 'ooh-campaign' },
  { url: '/img/campaigns/ooh/img.10.jpg', caption: 'OOH · High-Traffic Placement', slug: 'ooh-campaign' },
  { url: '/img/campaigns/ooh/social.media.jpg', caption: 'Social · Campaign Extension', slug: 'ooh-campaign' },
  { url: '/img/campaigns/ooh/img.09.jpg', caption: 'OOH · Campaign Execution', slug: 'ooh-campaign' },
  { url: '/img/campaigns/ooh/traffic.04.jpg', caption: 'OOH · Cheeky Copy', slug: 'ooh-campaign' },
]

