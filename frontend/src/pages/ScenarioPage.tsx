import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AttackTimeline from '../components/AttackTimeline';
import BeaconConsole from '../components/BeaconConsole';
import ChallengeAnalyzer from '../components/ChallengeAnalyzer';
import ErrorState from '../components/ErrorState';
import EventFilterBar from '../components/EventFilterBar';
import MetricChipRow from '../components/MetricChipRow';
import PlaybackControls from '../components/PlaybackControls';
import RelayMap from '../components/RelayMap';
import RiskPanel from '../components/RiskPanel';
import SimulationStatusBadge from '../components/SimulationStatusBadge';
import TakeoverControl from '../components/TakeoverControl';
import { useScenarioDefinition } from '../hooks/useScenarioLoader';
import { useSimulationPlayback } from '../hooks/useSimulationPlayback';
import { useSimulationStore } from '../store/useSimulationStore';

export default function ScenarioPage() {
  const { scenarioId } = useParams();
  const { activeScenario, activeScenarioLoading, activeScenarioError, retry } = useScenarioDefinition(scenarioId);
  const {
    session,
    sessionLoading,
    sessionError,
    actionLoading,
    actionError,
    createSession,
    setPlayback,
    advance,
    reset,
    rerun,
    takeover,
    clear,
  } = useSimulationStore();

  useSimulationPlayback();

  useEffect(() => {
    if (!scenarioId) return;
    void (async () => {
      const created = await createSession(scenarioId, false);
      if (created?.sessionId) {
        await useSimulationStore.getState().refreshSession(created.sessionId);
      }
    })();

    return () => clear();
  }, [scenarioId, createSession, clear]);

  if (!scenarioId) {
    return <ErrorState title="Missing scenario id" message="The requested scenario route is invalid." />;
  }

  if (activeScenarioLoading || sessionLoading) {
    return <div className="panel p-8 text-center text-slate-400">Preparing simulation workspace...</div>;
  }

  if (activeScenarioError) {
    return <ErrorState title="Failed to load scenario" message={activeScenarioError} onRetry={() => void retry()} />;
  }

  if (sessionError) {
    return <ErrorState title="Failed to create simulation session" message={sessionError} onRetry={() => void createSession(scenarioId, false)} />;
  }

  if (!activeScenario) {
    return <ErrorState title="Scenario not found" message="The backend did not return a scenario definition for this id." onRetry={() => void retry()} />;
  }

  const events = session?.events || [];

  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{activeScenario.difficulty}</p>
              <SimulationStatusBadge session={session} />
            </div>
            <h1 className="mt-3 text-3xl font-bold text-white">{activeScenario.title}</h1>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400">{activeScenario.summary}</p>
            <p className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-sm text-cyan-100">{activeScenario.safeScope}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to={`/scenarios/${scenarioId}/brief`} className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200">
              View incident brief
            </Link>
            <Link to="/" className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200">
              Back to gallery
            </Link>
          </div>
        </div>
      </section>

      <MetricChipRow scenario={activeScenario} session={session} />

      <PlaybackControls
        session={session}
        loading={actionLoading}
        onPlay={() => void setPlayback('playing')}
        onPause={() => void setPlayback('paused')}
        onStep={() => void advance(1)}
        onReset={() => void reset()}
        onRerun={(randomize) => void rerun(randomize)}
      />

      {actionError ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">{actionError}</div> : null}

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <AttackTimeline scenario={activeScenario} session={session} />
        <RiskPanel scenario={activeScenario} session={session} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <RelayMap scenario={activeScenario} session={session} />
        <div className="space-y-6">
          <ChallengeAnalyzer scenario={activeScenario} />
          <TakeoverControl session={session} loading={actionLoading} error={actionError} onTakeover={() => void takeover()} />
        </div>
      </div>

      <EventFilterBar scenario={activeScenario} events={events} />
      <BeaconConsole scenario={activeScenario} events={events} />
    </div>
  );
}
