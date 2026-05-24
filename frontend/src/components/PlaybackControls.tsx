import type { SimulationSession } from '../types';
import { useUiStore } from '../store/useUiStore';

interface PlaybackControlsProps {
  session: SimulationSession | null;
  loading: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  onRerun: (randomize: boolean) => void;
}

export default function PlaybackControls({
  session,
  loading,
  onPlay,
  onPause,
  onStep,
  onReset,
  onRerun,
}: PlaybackControlsProps) {
  const { speedMs, setSpeedMs, autoScroll, setAutoScroll } = useUiStore();

  return (
    <section className="panel p-5">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={onPlay} disabled={!session || loading} className="rounded-xl bg-cyan-500 px-4 py-2 font-medium text-slate-950 disabled:opacity-50">
          Play
        </button>
        <button type="button" onClick={onPause} disabled={!session || loading} className="rounded-xl border border-slate-700 px-4 py-2 text-slate-200 disabled:opacity-50">
          Pause
        </button>
        <button type="button" onClick={onStep} disabled={!session || loading} className="rounded-xl border border-slate-700 px-4 py-2 text-slate-200 disabled:opacity-50">
          Step
        </button>
        <button type="button" onClick={onReset} disabled={!session || loading} className="rounded-xl border border-slate-700 px-4 py-2 text-slate-200 disabled:opacity-50">
          Reset
        </button>
        <button type="button" onClick={() => onRerun(false)} disabled={!session || loading} className="rounded-xl border border-slate-700 px-4 py-2 text-slate-200 disabled:opacity-50">
          Deterministic rerun
        </button>
        <button type="button" onClick={() => onRerun(true)} disabled={!session || loading} className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-amber-200 disabled:opacity-50">
          Randomized rerun
        </button>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-300">
          Autoplay interval
          <select
            value={speedMs}
            onChange={(event) => setSpeedMs(Number(event.target.value))}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
          >
            <option value={700}>Fast</option>
            <option value={1400}>Balanced</option>
            <option value={2200}>Slow</option>
          </select>
        </label>
        <label className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">
          <input type="checkbox" checked={autoScroll} onChange={(event) => setAutoScroll(event.target.checked)} />
          Auto-scroll beacon console
        </label>
      </div>
    </section>
  );
}
