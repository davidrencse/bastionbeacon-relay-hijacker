import { useMemo, useRef, useEffect } from 'react';
import type { ScenarioDefinition, SimulationEvent } from '../types';
import { formatTimestamp } from '../lib/formatters';
import { useUiStore } from '../store/useUiStore';

interface BeaconConsoleProps {
  scenario: ScenarioDefinition;
  events: SimulationEvent[];
}

function severityStyle(severity: string) {
  switch (severity) {
    case 'critical':
      return 'text-red-300 border-red-500/30 bg-red-500/10';
    case 'warn':
      return 'text-amber-300 border-amber-500/30 bg-amber-500/10';
    default:
      return 'text-cyan-200 border-cyan-500/20 bg-cyan-500/5';
  }
}

export default function BeaconConsole({ scenario, events }: BeaconConsoleProps) {
  const { filters, autoScroll } = useUiStore();
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const phaseMatch = filters.phaseId === 'all' || event.phaseId === filters.phaseId;
      const severityMatch = filters.severity === 'all' || event.severity === filters.severity;
      const directionMatch = filters.direction === 'all' || event.direction === filters.direction;
      const kindMatch = filters.kind === 'all' || event.kind === filters.kind;
      return phaseMatch && severityMatch && directionMatch && kindMatch;
    });
  }, [events, filters]);

  useEffect(() => {
    if (autoScroll && scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [filteredEvents, autoScroll]);

  return (
    <section className="panel p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="panel-title">Beacon Console</h2>
        <span className="text-xs text-slate-400">{filteredEvents.length} rendered events</span>
      </div>
      <div ref={scrollerRef} className="mt-4 max-h-[28rem] overflow-auto rounded-xl border border-slate-800 bg-slate-950/80 p-3 font-mono text-xs">
        {filteredEvents.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 p-5 text-center text-slate-500">
            No events match current filters or the simulation has not advanced yet.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((event) => {
              const phaseName = scenario.phases.find((phase) => phase.id === event.phaseId)?.name || event.phaseId;
              return (
                <div key={event.id} className={`rounded-xl border p-3 ${severityStyle(event.severity)}`}>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] opacity-80">
                    <span>{formatTimestamp(event.timestamp)}</span>
                    <span>{phaseName}</span>
                    <span>{event.direction}</span>
                    <span>{event.kind}</span>
                    <span>{event.severity}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">{event.summary}</p>
                  <p className="mt-1 text-slate-300">{event.details}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
