import { apiFetch } from './client';
import type { HealthResponse, ScenarioDefinition, ScenarioSummary } from '../types';

export function getHealth() {
  return apiFetch<HealthResponse>('/api/health');
}

export function listScenarios() {
  return apiFetch<{ scenarios: ScenarioSummary[] }>('/api/scenarios');
}

export function getScenario(scenarioId: string) {
  return apiFetch<{ scenario: ScenarioDefinition }>(`/api/scenarios/${scenarioId}`);
}
