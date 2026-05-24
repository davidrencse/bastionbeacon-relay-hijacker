import type { ScenarioDefinition, SimulationSession, SyntheticEndpoint } from '../types';

function roleStyles(role: SyntheticEndpoint['role']) {
  switch (role) {
    case 'bastion':
      return 'border-cyan-400/40 bg-cyan-500/10 text-cyan-200';
    case 'relay':
      return 'border-amber-400/40 bg-amber-500/10 text-amber-200';
    case 'broker':
      return 'border-red-400/40 bg-red-500/10 text-red-200';
    default:
      return 'border-slate-600 bg-slate-800 text-slate-300';
  }
}

export default function RelayMap({ scenario, session }: { scenario: ScenarioDefinition; session: SimulationSession | null }) {
  const rerouted = session?.reroutedPath || [];

  return (
    <section className="panel p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="panel-title">Relay Topology</h2>
        <span className="text-xs text-slate-400">Route owner: {session?.takeoverState === 'active' ? 'attacker-controlled broker path' : 'original synthetic relay'}</span>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          {scenario.endpoints.map((endpoint) => (
            <div key={endpoint.id} className={`rounded-xl border p-4 ${roleStyles(endpoint.role)}`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{endpoint.label}</h3>
                  <p className="text-xs uppercase tracking-[0.2em] opacity-80">{endpoint.role}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs ${endpoint.exposed ? 'bg-red-500/20 text-red-200' : 'bg-slate-800 text-slate-300'}`}>
                  {endpoint.exposed ? 'Exposed' : 'Internal'}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {endpoint.misconfigurations.length ? (
                  endpoint.misconfigurations.map((item) => (
                    <span key={item} className="rounded-full bg-slate-950/40 px-2 py-1">
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-300">No listed misconfigurations</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="text-sm text-slate-300">Synthetic route path</div>
          <div className="mt-4 space-y-3">
            {(rerouted.length ? rerouted : scenario.endpoints.map((endpoint) => endpoint.label)).map((node, index, arr) => (
              <div key={`${node}-${index}`} className="flex items-center gap-3">
                <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200">{node}</div>
                {index < arr.length - 1 ? <div className="h-px flex-1 bg-gradient-to-r from-cyan-400 to-slate-700" /> : null}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-400">
            The visualization updates only from backend session state. No actual traffic, sockets, or tunnel routing are created.
          </p>
        </div>
      </div>
    </section>
  );
}
