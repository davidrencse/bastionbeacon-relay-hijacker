import { create } from 'zustand';
import {
  advanceSimulation,
  createSimulation,
  getIncidentBrief,
  getSimulation,
  rerunSimulation,
  resetSimulation,
  triggerTakeover,
  updatePlayback,
} from '../api/simulations';
import type { IncidentBrief, PlaybackStatus, SimulationSession } from '../types';

interface SimulationStore {
  session: SimulationSession | null;
  sessionLoading: boolean;
  sessionError: string | null;
  actionLoading: boolean;
  actionError: string | null;
  brief: IncidentBrief | null;
  briefLoading: boolean;
  briefError: string | null;
  createSession: (scenarioId: string, randomize?: boolean) => Promise<SimulationSession | null>;
  refreshSession: (sessionId: string) => Promise<void>;
  advance: (steps?: number) => Promise<void>;
  setPlayback: (playbackStatus: PlaybackStatus) => Promise<void>;
  takeover: () => Promise<void>;
  reset: () => Promise<void>;
  rerun: (randomize: boolean) => Promise<void>;
  loadBrief: () => Promise<void>;
  clear: () => void;
}

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  session: null,
  sessionLoading: false,
  sessionError: null,
  actionLoading: false,
  actionError: null,
  brief: null,
  briefLoading: false,
  briefError: null,
  createSession: async (scenarioId, randomize = false) => {
    set({ sessionLoading: true, sessionError: null, brief: null, briefError: null });
    try {
      const response = await createSimulation(scenarioId, randomize);
      set({ session: response.session, sessionLoading: false, sessionError: null });
      return response.session;
    } catch (error) {
      set({
        session: null,
        sessionLoading: false,
        sessionError: error instanceof Error ? error.message : 'Failed to create simulation',
      });
      return null;
    }
  },
  refreshSession: async (sessionId) => {
    set({ sessionLoading: true, sessionError: null });
    try {
      const response = await getSimulation(sessionId);
      set({ session: response.session, sessionLoading: false, sessionError: null });
    } catch (error) {
      set({
        sessionLoading: false,
        sessionError: error instanceof Error ? error.message : 'Failed to refresh simulation',
      });
    }
  },
  advance: async (steps = 1) => {
    const session = get().session;
    if (!session) return;
    set({ actionLoading: true, actionError: null });
    try {
      const response = await advanceSimulation(session.sessionId, steps);
      set({ session: response.session, actionLoading: false, actionError: null });
    } catch (error) {
      set({
        actionLoading: false,
        actionError: error instanceof Error ? error.message : 'Failed to advance simulation',
      });
    }
  },
  setPlayback: async (playbackStatus) => {
    const session = get().session;
    if (!session) return;
    set({ actionLoading: true, actionError: null });
    try {
      const response = await updatePlayback(session.sessionId, playbackStatus);
      set({ session: { ...get().session!, ...response.session }, actionLoading: false, actionError: null });
    } catch (error) {
      set({
        actionLoading: false,
        actionError: error instanceof Error ? error.message : 'Failed to update playback',
      });
    }
  },
  takeover: async () => {
    const session = get().session;
    if (!session) return;
    set({ actionLoading: true, actionError: null });
    try {
      const response = await triggerTakeover(session.sessionId);
      const mergedEvents = [...(get().session?.events || []), response.takeoverEvent];
      set({
        session: { ...response.session, events: mergedEvents },
        actionLoading: false,
        actionError: null,
      });
    } catch (error) {
      set({
        actionLoading: false,
        actionError: error instanceof Error ? error.message : 'Failed to trigger takeover',
      });
    }
  },
  reset: async () => {
    const session = get().session;
    if (!session) return;
    set({ actionLoading: true, actionError: null, brief: null, briefError: null });
    try {
      const response = await resetSimulation(session.sessionId);
      set({ session: response.session, actionLoading: false, actionError: null });
    } catch (error) {
      set({
        actionLoading: false,
        actionError: error instanceof Error ? error.message : 'Failed to reset simulation',
      });
    }
  },
  rerun: async (randomize) => {
    const session = get().session;
    if (!session) return;
    set({ actionLoading: true, actionError: null, brief: null, briefError: null });
    try {
      const response = await rerunSimulation(session.sessionId, randomize);
      set({ session: response.session, actionLoading: false, actionError: null });
    } catch (error) {
      set({
        actionLoading: false,
        actionError: error instanceof Error ? error.message : 'Failed to rerun simulation',
      });
    }
  },
  loadBrief: async () => {
    const session = get().session;
    if (!session) return;
    set({ briefLoading: true, briefError: null });
    try {
      const response = await getIncidentBrief(session.sessionId);
      set({ brief: response.brief, briefLoading: false, briefError: null });
    } catch (error) {
      set({
        briefLoading: false,
        briefError: error instanceof Error ? error.message : 'Failed to load incident brief',
      });
    }
  },
  clear: () =>
    set({
      session: null,
      sessionLoading: false,
      sessionError: null,
      actionLoading: false,
      actionError: null,
      brief: null,
      briefLoading: false,
      briefError: null,
    }),
}));
