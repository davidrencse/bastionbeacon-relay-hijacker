import type { ScenarioDefinition, SimulationEvent } from '../types';
import { useUiStore } from '../store/useUiStore';

export default function EventFilterBar({ scenario, events }: { scenario: ScenarioDefinition; events: SimulationEvent[] }) {
  const { filters, setFilters, resetFilters } = useUiStore();
  const uniqueKinds = Array.from(new Set(events.map((event) => event.kind)));

  return (
    <section className="panel p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-end">
        <label className="flex-1 text-sm text-slate-300">
          Phase
          <select value={filters.phaseId} onChange={(e) => setFilters({ phaseId: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2">
            <option value="all">All phases</option>
            {scenario.phases.map((phase) => (
              <option key={phase.id} value={phase.id}>{phase.name}</option>
            ))}
          </select>
        </label>
        <label className="flex-1 text-sm text-slate-300">
          Severity
          <select value={filters.severity} onChange={(e) => setFilters({ severity: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2">
            <option value="all">All severities</option>
            <option value="info">Info</option>
            <option value="warn">Warn</option>
            <option value="critical">Critical</option>
          </select>
        </label>
        <label className="flex-1 text-sm text-slate-300">
          Direction
          <select value={filters.direction} onChange={(e) => setFilters({ direction: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2">
            <option value="all">All directions</option>
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
            <option value="internal">Internal</option>
          </select>
        </label>
        <label className="flex-1 text-sm text-slate-300">
          Kind
          <select value={filters.kind} onChange={(e) => setFilters({ kind: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2">
            <option value="all">All kinds</option>
            {uniqueKinds.map((kind) => (
              <option key={kind} value={kind}>{kind}</option>
            ))}
          </select>
        </label>
        <button type="button" onClick={resetFilters} className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200">
          Clear filters
        </button>
      </div>
    </section>
  );
}
