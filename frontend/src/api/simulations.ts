import { apiFetch } from './client';
import type { IncidentBrief, PlaybackStatus, SimulationEvent, SimulationSession } from '../types';

export function createSimulation(scenarioId: string, randomize = false) {
  return apiFetch<{ session: SimulationSession }>('/api/simulations', {
    method: 'POST',
    body: JSON.stringify({ scenarioId, randomize }),
  });
}

export function getSimulation(sessionId: string) {
  return apiFetch<{ session: SimulationSession }>(`/api/simulations/${sessionId}`);
}

export function advanceSimulation(sessionId: string, steps = 1) {
  return apiFetch<{ session: SimulationSession; newEvents: SimulationEvent[] }>(
    `/api/simulations/${sessionId}/advance`,
    {
      method: 'POST',
      body: JSON.stringify({ steps }),
    },
  );
}

export function updatePlayback(sessionId: string, playbackStatus: PlaybackStatus) {
  return apiFetch<{ session: SimulationSession }>(`/api/simulations/${sessionId}/playback`, {
    method: 'POST',
    body: JSON.stringify({ playbackStatus }),
  });
}

export function triggerTakeover(sessionId: string) {
  return apiFetch<{ session: SimulationSession; takeoverEvent: SimulationEvent }>(
    `/api/simulations/${sessionId}/takeover`,
    {
      method: 'POST',
      body: JSON.stringify({ confirmSimulationOnly: true }),
    },
  );
}

export function resetSimulation(sessionId: string) {
  return apiFetch<{ session: SimulationSession }>(`/api/simulations/${sessionId}/reset`, {
    method: 'POST',
    body: JSON.stringify({}),
  });
}

export function rerunSimulation(sessionId: string, randomize: boolean) {
  return apiFetch<{ session: SimulationSession }>(`/api/simulations/${sessionId}/rerun`, {
    method: 'POST',
    body: JSON.stringify({ randomize }),
  });
}

export function getIncidentBrief(sessionId: string) {
  return apiFetch<{ brief: IncidentBrief }>(`/api/simulations/${sessionId}/brief`);
}
