import type { SimulationSession } from '../types';

export default function SimulationStatusBadge({ session }: { session: SimulationSession | null }) {
  const isActive = session?.takeoverState === 'active';
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${isActive ? 'border-red-500/30 bg-red-500/10 text-red-300' : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300'}`}>
      <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-red-400' : 'bg-cyan-400'}`} />
      <span>
        {session ? `${session.playbackStatus} · ${session.takeoverState}` : 'session pending'}
      </span>
    </div>
  );
}
