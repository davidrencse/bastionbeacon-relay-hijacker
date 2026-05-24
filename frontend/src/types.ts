export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type EndpointRole = 'bastion' | 'relay' | 'broker' | 'observer';
export type EventDirection = 'inbound' | 'outbound' | 'internal';
export type EventSeverity = 'info' | 'warn' | 'critical';
export type PlaybackStatus = 'idle' | 'playing' | 'paused' | 'completed';
export type TakeoverState = 'not_started' | 'available' | 'active' | 'reset';

export interface ApiErrorShape {
  code: string;
  message: string;
  details?: unknown;
}

export interface ScenarioSummary {
  id: string;
  title: string;
  summary: string;
  difficulty: Difficulty | string;
  tags: string[];
  previewRiskScore: number;
  phaseCount: number;
  endpointCount: number;
}

export interface ScenarioPhase {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface SyntheticEndpoint {
  id: string;
  label: string;
  role: EndpointRole;
  exposed: boolean;
  misconfigurations: string[];
}

export interface ChallengeProfile {
  mode: string;
  weakChecks: string[];
  explanation: string;
}

export interface EventTemplateItem {
  id: string;
  phaseId: string;
  direction: EventDirection;
  kind: string;
  summary: string;
}

export interface RiskFactor {
  id: string;
  label: string;
  weight: number;
  active: boolean;
}

export interface ScenarioDefinition {
  id: string;
  title: string;
  summary: string;
  difficulty: string;
  safeScope: string;
  phases: ScenarioPhase[];
  endpoints: SyntheticEndpoint[];
  challengeProfile: ChallengeProfile;
  eventTemplate: EventTemplateItem[];
  initialRiskFactors: RiskFactor[];
}

export interface SimulationEvent {
  id: string;
  timestamp: string;
  phaseId: string;
  direction: string;
  kind: string;
  severity: EventSeverity;
  summary: string;
  details: string;
}

export interface SimulationSession {
  sessionId: string;
  scenarioId: string;
  currentPhaseId: string;
  playbackStatus: PlaybackStatus;
  eventCursor: number;
  riskScore: number;
  takeoverState: TakeoverState;
  simulationOnly?: boolean;
  reroutedPath?: string[];
  events?: SimulationEvent[];
}

export interface IncidentBriefFinding {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
}

export interface IncidentBriefTimelineEntry {
  phase: string;
  summary: string;
}

export interface IncidentBrief {
  scenarioId: string;
  sessionId: string;
  title: string;
  generatedAt: string;
  simulationOnly: true;
  executiveSummary: string;
  timeline: IncidentBriefTimelineEntry[];
  findings: IncidentBriefFinding[];
  finalRiskScore: number;
  routeOutcome: {
    takeoverState: string;
    reroutedPath: string[];
  };
}

export interface HealthResponse {
  status: 'ok';
  service: string;
  simulationOnly: true;
  version: string;
}
