import { useEffect } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { useUiStore } from '../store/useUiStore';

export function useSimulationPlayback() {
  const { session, advance } = useSimulationStore();
  const speedMs = useUiStore((state) => state.speedMs);

  useEffect(() => {
    if (!session || session.playbackStatus !== 'playing') return;

    const timer = window.setTimeout(() => {
      void advance(1);
    }, speedMs);

    return () => window.clearTimeout(timer);
  }, [session, speedMs, advance]);
}
