import PageShell from '../components/PageShell'
import About from '../components/About'
import Experience from '../components/Experience'
import Skills from '../components/Skills'

export default function AboutPage() {
  return (
    <PageShell
      kicker="The Background"
      title="Nine years,"
      accent="three mandates."
      lede="Not advising from the outside - owning the number, the budget and the teams, across India, the Middle East, Canada and Australia."
    >
      <About />
      <Experience />
      <Skills />
    </PageShell>
  )
}
