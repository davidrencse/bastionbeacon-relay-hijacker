import { create } from 'zustand';
import { getHealth, getScenario, listScenarios } from '../api/scenarios';
import type { HealthResponse, ScenarioDefinition, ScenarioSummary } from '../types';

interface ScenarioStore {
  catalog: ScenarioSummary[];
  catalogLoading: boolean;
  catalogError: string | null;
  health: HealthResponse | null;
  healthLoading: boolean;
  healthError: string | null;
  activeScenario: ScenarioDefinition | null;
  activeScenarioLoading: boolean;
  activeScenarioError: string | null;
  fetchCatalog: () => Promise<void>;
  fetchHealth: () => Promise<void>;
  fetchScenario: (scenarioId: string) => Promise<ScenarioDefinition | null>;
  clearScenario: () => void;
}

export const useScenarioStore = create<ScenarioStore>((set) => ({
  catalog: [],
  catalogLoading: false,
  catalogError: null,
  health: null,
  healthLoading: false,
  healthError: null,
  activeScenario: null,
  activeScenarioLoading: false,
  activeScenarioError: null,
  fetchCatalog: async () => {
    set({ catalogLoading: true, catalogError: null });
    try {
      const response = await listScenarios();
      set({ catalog: response.scenarios, catalogLoading: false, catalogError: null });
    } catch (error) {
      set({
        catalogLoading: false,
        catalogError: error instanceof Error ? error.message : 'Failed to load scenarios',
      });
    }
  },
  fetchHealth: async () => {
    set({ healthLoading: true, healthError: null });
    try {
      const response = await getHealth();
      set({ health: response, healthLoading: false, healthError: null });
    } catch (error) {
      set({
        healthLoading: false,
        healthError: error instanceof Error ? error.message : 'Failed to load backend health',
      });
    }
  },
  fetchScenario: async (scenarioId: string) => {
    set({ activeScenarioLoading: true, activeScenarioError: null });
    try {
      const response = await getScenario(scenarioId);
      set({
        activeScenario: response.scenario,
        activeScenarioLoading: false,
        activeScenarioError: null,
      });
      return response.scenario;
    } catch (error) {
      set({
        activeScenario: null,
        activeScenarioLoading: false,
        activeScenarioError: error instanceof Error ? error.message : 'Failed to load scenario',
      });
      return null;
    }
  },
  clearScenario: () => set({ activeScenario: null, activeScenarioError: null, activeScenarioLoading: false }),
}));
