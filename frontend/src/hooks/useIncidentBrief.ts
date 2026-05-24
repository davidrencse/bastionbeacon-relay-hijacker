import { useEffect } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';

export function useIncidentBrief(enabled: boolean) {
  const { brief, briefLoading, briefError, loadBrief } = useSimulationStore();

  useEffect(() => {
    if (enabled) {
      void loadBrief();
    }
  }, [enabled, loadBrief]);

  return { brief, briefLoading, briefError, retry: loadBrief };
}
