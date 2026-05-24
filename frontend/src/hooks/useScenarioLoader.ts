import { useEffect } from 'react';
import { useScenarioStore } from '../store/useScenarioStore';

export function useScenarioCatalog() {
  const { catalog, catalogLoading, catalogError, fetchCatalog, health, healthLoading, healthError, fetchHealth } =
    useScenarioStore();

  useEffect(() => {
    void fetchHealth();
    void fetchCatalog();
  }, [fetchCatalog, fetchHealth]);

  return { catalog, catalogLoading, catalogError, health, healthLoading, healthError, retry: fetchCatalog };
}

export function useScenarioDefinition(scenarioId?: string) {
  const { activeScenario, activeScenarioLoading, activeScenarioError, fetchScenario, clearScenario } = useScenarioStore();

  useEffect(() => {
    if (!scenarioId) return;
    void fetchScenario(scenarioId);
    return () => clearScenario();
  }, [scenarioId, fetchScenario, clearScenario]);

  return {
    activeScenario,
    activeScenarioLoading,
    activeScenarioError,
    retry: () => (scenarioId ? fetchScenario(scenarioId) : Promise.resolve(null)),
  };
}
