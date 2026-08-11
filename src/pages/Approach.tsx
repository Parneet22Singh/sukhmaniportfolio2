import PageShell from '../components/PageShell'
import OperatingModel from '../components/OperatingModel'
import { operatingModel } from '../data/portfolio'

export default function Approach() {
  return (
    <PageShell
      kicker={operatingModel.label}
      title="Diagnose before"
      accent="prescribing."
      lede={operatingModel.body}
    >
      <OperatingModel bare />
    </PageShell>
  )
}
