import type { ScenarioDefinition, SimulationSession } from '../types';
import { getRiskBand } from '../lib/riskPresentation';

export default function RiskPanel({ scenario, session }: { scenario: ScenarioDefinition; session: SimulationSession | null }) {
  const score = session?.riskScore ?? 0;
  const band = getRiskBand(score);
  const activeFactors = scenario.initialRiskFactors.filter((factor) => factor.active);

  return (
    <section className="panel p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="panel-title">Risk Scoring</h2>
        <div className={`rounded-full border px-3 py-1 text-xs font-semibold ${band.bg} ${band.color}`}>{band.label}</div>
      </div>
      <div className="mt-4 flex items-end gap-3">
        <div className="text-5xl font-bold text-white">{score}</div>
        <div className="pb-2 text-sm text-slate-400">dynamic score from backend session state</div>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full rounded-full bg-gradient-to-r from-lime-400 via-amber-400 to-red-500" style={{ width: `${Math.min(score, 100)}%` }} />
      </div>
      <div className="mt-5 space-y-3">
        {activeFactors.length === 0 ? (
          <p className="text-sm text-slate-500">No initial factors were provided for this scenario.</p>
        ) : (
          activeFactors.map((factor) => (
            <div key={factor.id} className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-slate-200">{factor.label}</span>
                <span className="text-xs text-cyan-300">+{factor.weight}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
