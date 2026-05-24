import { Link, useParams } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import IncidentBriefPanel from '../components/IncidentBriefPanel';
import { useIncidentBrief } from '../hooks/useIncidentBrief';
import { useSimulationStore } from '../store/useSimulationStore';

export default function BriefPage() {
  const { scenarioId } = useParams();
  const session = useSimulationStore((state) => state.session);
  const { brief, briefLoading, briefError, retry } = useIncidentBrief(Boolean(session));

  if (!session) {
    return (
      <ErrorState
        title="No active simulation session"
        message="Open a scenario first so the frontend can request its incident brief from the backend."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Incident Brief Export</h1>
          <p className="mt-2 text-sm text-slate-400">Scenario: {scenarioId} · Session: {session.sessionId}</p>
        </div>
        <Link to={`/scenarios/${scenarioId}`} className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200">
          Back to simulation
        </Link>
      </div>

      {briefLoading ? <div className="panel p-8 text-center text-slate-400">Generating incident brief from backend session state...</div> : null}
      {briefError ? <ErrorState title="Failed to load incident brief" message={briefError} onRetry={() => void retry()} /> : null}
      {brief ? <IncidentBriefPanel brief={brief} /> : null}
      {!briefLoading && !briefError && !brief ? (
        <div className="panel p-8 text-center">
          <h2 className="text-lg font-semibold text-white">No brief returned yet</h2>
          <p className="mt-2 text-sm text-slate-400">The backend did not provide a brief for this session. Retry after progressing or resetting the simulation.</p>
          <button type="button" onClick={() => void retry()} className="mt-4 rounded-xl bg-cyan-500 px-4 py-2 font-medium text-slate-950">
            Retry brief generation
          </button>
        </div>
      ) : null}
    </div>
  );
}
