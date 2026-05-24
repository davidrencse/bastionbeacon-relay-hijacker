import { useState } from 'react';
import type { SimulationSession } from '../types';

interface TakeoverControlProps {
  session: SimulationSession | null;
  loading: boolean;
  error: string | null;
  onTakeover: () => void;
}

export default function TakeoverControl({ session, loading, error, onTakeover }: TakeoverControlProps) {
  const [confirmed, setConfirmed] = useState(false);
  const disabled = !session || session.takeoverState === 'active' || !confirmed || loading;

  return (
    <section className="panel p-5">
      <h2 className="panel-title">Takeover Control</h2>
      <p className="mt-4 text-sm leading-6 text-slate-400">
        This action requests a deterministic backend session transition that marks the synthetic relay path as hijacked within the simulation only.
      </p>
      <label className="mt-4 flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(event) => setConfirmed(event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-500"
        />
        <span>I understand this triggers a simulation-only reroute and does not affect any real network path.</span>
      </label>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          disabled={disabled}
          onClick={onTakeover}
          className="rounded-xl bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Applying takeover...' : session?.takeoverState === 'active' ? 'Takeover active' : 'Trigger synthetic hijack'}
        </button>
        <span className="text-xs text-slate-500">State: {session?.takeoverState || 'not_started'}</span>
      </div>
      {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
    </section>
  );
}
