import { create } from 'zustand';

export interface EventFilters {
  phaseId: string;
  severity: string;
  direction: string;
  kind: string;
}

interface UiStore {
  speedMs: number;
  autoScroll: boolean;
  filters: EventFilters;
  setSpeedMs: (value: number) => void;
  setAutoScroll: (value: boolean) => void;
  setFilters: (filters: Partial<EventFilters>) => void;
  resetFilters: () => void;
}

const defaultFilters: EventFilters = {
  phaseId: 'all',
  severity: 'all',
  direction: 'all',
  kind: 'all',
};

export const useUiStore = create<UiStore>((set) => ({
  speedMs: 1400,
  autoScroll: true,
  filters: defaultFilters,
  setSpeedMs: (value) => set({ speedMs: value }),
  setAutoScroll: (value) => set({ autoScroll: value }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: defaultFilters }),
}));
