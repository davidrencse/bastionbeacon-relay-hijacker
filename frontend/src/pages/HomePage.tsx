import { Link } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import ScenarioCardGrid from '../components/ScenarioCardGrid';
import { useScenarioCatalog } from '../hooks/useScenarioLoader';

export default function HomePage() {
  const { catalog, catalogLoading, catalogError, health, healthLoading, healthError, retry } = useScenarioCatalog();

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="panel p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Offensive-security simulation</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">Replay synthetic relay takeover narratives from a real backend API.</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
            Browse scenario catalog entries, launch isolated sessions, step through discovery and probing phases, inspect beacon traffic, and export incident briefs generated from backend state.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-slate-700 px-4 py-2">Scenario gallery</span>
            <span className="rounded-full border border-slate-700 px-4 py-2">Packet-style event console</span>
            <span className="rounded-full border border-slate-700 px-4 py-2">Risk scoring</span>
            <span className="rounded-full border border-slate-700 px-4 py-2">Incident brief export</span>
          </div>
        </div>
        <div className="panel p-6">
          <h2 className="panel-title">Backend Status</h2>
          {healthLoading ? <p className="mt-4 text-sm text-slate-400">Checking API health...</p> : null}
          {healthError ? <p className="mt-4 text-sm text-red-300">{healthError}</p> : null}
          {health ? (
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div className="flex justify-between gap-3"><span>Service</span><span className="text-white">{health.service}</span></div>
              <div className="flex justify-between gap-3"><span>Status</span><span className="text-lime-300">{health.status}</span></div>
              <div className="flex justify-between gap-3"><span>Simulation only</span><span className="text-cyan-300">{String(health.simulationOnly)}</span></div>
              <div className="flex justify-between gap-3"><span>Version</span><span className="text-white">{health.version}</span></div>
            </div>
          ) : null}
          <p className="mt-5 text-xs text-slate-500">If the backend is offline, scenario loading and playback actions will remain unavailable until retry succeeds.</p>
        </div>
      </section>

      <section className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Scenario Gallery</h2>
          <p className="mt-1 text-sm text-slate-400">Launch any synthetic relay case from the backend catalog.</p>
        </div>
        <Link to="/" onClick={() => void retry()} className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200">
          Refresh catalog
        </Link>
      </section>

      {catalogLoading ? (
        <div className="panel p-8 text-center text-slate-400">Loading available scenarios...</div>
      ) : catalogError ? (
        <ErrorState title="Scenario catalog unavailable" message={catalogError} onRetry={() => void retry()} />
      ) : catalog.length === 0 ? (
        <div className="panel p-8 text-center">
          <h3 className="text-lg font-semibold text-white">No scenarios available</h3>
          <p className="mt-2 text-sm text-slate-400">The backend responded successfully but did not return any scenario records.</p>
          <button type="button" onClick={() => void retry()} className="mt-4 rounded-xl bg-cyan-500 px-4 py-2 font-medium text-slate-950">
            Retry load
          </button>
        </div>
      ) : (
        <ScenarioCardGrid scenarios={catalog} />
      )}
    </div>
  );
}
