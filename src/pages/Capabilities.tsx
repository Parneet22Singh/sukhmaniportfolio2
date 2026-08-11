import PageShell from '../components/PageShell'
import Services from '../components/Services'
import Bottlenecks from '../components/Bottlenecks'

export default function Capabilities() {
  return (
    <PageShell
      kicker="The Practice"
      title="Three things,"
      accent="in this order."
      lede="Skipping the first one is how businesses end up with excellent campaigns and a flat pipeline."
    >
      <Services />
      <Bottlenecks />
    </PageShell>
  )
}
