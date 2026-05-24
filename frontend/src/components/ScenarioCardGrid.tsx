import type { ScenarioSummary } from '../types';
import ScenarioCard from './ScenarioCard';

interface ScenarioCardGridProps {
  scenarios: ScenarioSummary[];
}

export default function ScenarioCardGrid({ scenarios }: ScenarioCardGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {scenarios.map((scenario) => (
        <ScenarioCard key={scenario.id} scenario={scenario} />
      ))}
    </div>
  );
}
