import type { ScenarioDefinition, SimulationSession } from '../types';

export default function MetricChipRow({ scenario, session }: { scenario: ScenarioDefinition; session: SimulationSession | null }) {
  const exposedCount = scenario.endpoints.filter((endpoint) => endpoint.exposed).length;
  const weakChecks = scenario.challengeProfile.weakChecks.length;
  const routeOwner = session?.takeoverState === 'active' ? 'Broker' : 'Relay';

  const metrics = [
    { label: 'Exposed endpoints', value: exposedCount },
    { label: 'Weak checks', value: weakChecks },
    { label: 'Event cursor', value: session?.eventCursor ?? 0 },
    { label: 'Route owner', value: routeOwner },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="panel p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{metric.label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}
