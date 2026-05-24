import { downloadFile } from '../lib/exporters';
import { formatTimestamp } from '../lib/formatters';
import type { IncidentBrief } from '../types';

export default function IncidentBriefPanel({ brief }: { brief: IncidentBrief }) {
  const exportJson = () => downloadFile(`${brief.sessionId}-incident-brief.json`, JSON.stringify(brief, null, 2), 'application/json');

  const exportText = () => {
    const content = [
      `${brief.title}`,
      `Generated: ${formatTimestamp(brief.generatedAt)}`,
      `Simulation Only: ${brief.simulationOnly ? 'Yes' : 'No'}`,
      '',
      'Executive Summary',
      brief.executiveSummary,
      '',
      'Timeline',
      ...brief.timeline.map((item) => `- ${item.phase}: ${item.summary}`),
      '',
      'Findings',
      ...brief.findings.map((item) => `- [${item.severity.toUpperCase()}] ${item.title}: ${item.description}`),
      '',
      `Final Risk Score: ${brief.finalRiskScore}`,
      `Takeover State: ${brief.routeOutcome.takeoverState}`,
      `Rerouted Path: ${brief.routeOutcome.reroutedPath.join(' -> ') || 'None'}`,
    ].join('\n');

    downloadFile(`${brief.sessionId}-incident-brief.txt`, content, 'text/plain;charset=utf-8');
  };

  return (
    <section className="panel p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="panel-title">Incident Brief</h2>
          <h3 className="mt-2 text-xl font-semibold text-white">{brief.title}</h3>
          <p className="mt-1 text-sm text-slate-400">Generated {formatTimestamp(brief.generatedAt)}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={exportJson} className="rounded-xl bg-cyan-500 px-4 py-2 font-medium text-slate-950">
            Export JSON
          </button>
          <button type="button" onClick={exportText} className="rounded-xl border border-slate-700 px-4 py-2 text-slate-200">
            Export text
          </button>
        </div>
      </div>
      <div className="mt-5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-sm text-cyan-100">
        This brief summarizes a simulation against synthetic assets only.
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Executive Summary</h4>
          <p className="mt-2 text-sm leading-6 text-slate-400">{brief.executiveSummary}</p>
          <h4 className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Findings</h4>
          <div className="mt-3 space-y-3">
            {brief.findings.map((finding) => (
              <div key={finding.id} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h5 className="font-semibold text-white">{finding.title}</h5>
                  <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs uppercase text-red-300">{finding.severity}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{finding.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Timeline</h4>
          <div className="mt-3 space-y-3">
            {brief.timeline.map((item, index) => (
              <div key={`${item.phase}-${index}`} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <p className="text-sm font-semibold text-white">{item.phase}</p>
                <p className="mt-1 text-sm text-slate-400">{item.summary}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <p className="text-sm text-slate-300">Final risk score</p>
            <p className="mt-2 text-3xl font-bold text-white">{brief.finalRiskScore}</p>
            <p className="mt-4 text-sm text-slate-300">Route outcome</p>
            <p className="mt-1 text-sm text-slate-400">State: {brief.routeOutcome.takeoverState}</p>
            <p className="mt-1 text-sm text-slate-400">Path: {brief.routeOutcome.reroutedPath.join(' → ') || 'No reroute recorded'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
