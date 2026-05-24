import type { ScenarioDefinition } from '../types';

export default function ChallengeAnalyzer({ scenario }: { scenario: ScenarioDefinition }) {
  return (
    <section className="panel p-5">
      <h2 className="panel-title">Challenge-Response Analyzer</h2>
      <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="text-sm text-slate-300">Mode: <span className="font-semibold text-white">{scenario.challengeProfile.mode}</span></p>
        <p className="mt-3 text-sm leading-6 text-slate-400">{scenario.challengeProfile.explanation}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {scenario.challengeProfile.weakChecks.map((check) => (
            <span key={check} className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-200">
              {check}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
