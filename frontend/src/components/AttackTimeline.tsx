import type { ScenarioDefinition, SimulationSession } from '../types';

interface AttackTimelineProps {
  scenario: ScenarioDefinition;
  session: SimulationSession | null;
}

export default function AttackTimeline({ scenario, session }: AttackTimelineProps) {
  return (
    <section className="panel p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="panel-title">Attack Chain Timeline</h2>
        <span className="text-xs text-slate-400">Current phase: {session?.currentPhaseId || 'pending'}</span>
      </div>
      <div className="mt-5 space-y-4">
        {scenario.phases
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((phase, index) => {
            const isCurrent = session?.currentPhaseId === phase.id;
            const currentOrder = scenario.phases.find((item) => item.id === session?.currentPhaseId)?.order ?? -1;
            const isCompleted = currentOrder > phase.order;
            return (
              <div key={phase.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${
                      isCurrent
                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                        : isCompleted
                          ? 'border-lime-400 bg-lime-500/20 text-lime-200'
                          : 'border-slate-700 bg-slate-800 text-slate-400'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < scenario.phases.length - 1 ? <div className="mt-2 h-full w-px bg-slate-800" /> : null}
                </div>
                <div className="pb-4">
                  <h3 className="text-sm font-semibold text-white">{phase.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{phase.description}</p>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
