import { DataConfidence } from './orbital-object';

export type MissionType =
  | 'monitor'
  | 'inspect'
  | 'avoid'
  | 'deorbit'
  | 'move_to_safer_orbit'
  | 'capture'
  | 'recycle';
export type MissionRiskLevel = 'low' | 'medium' | 'high';

export interface MissionScenario {
  dataConfidence: DataConfidence;
  estimatedDeltaVMps?: number;
  estimatedDurationDays: number;
  id: string;
  name: string;
  objective: string;
  riskLevel: MissionRiskLevel;
  targetObjectId: string;
  type: MissionType;
}
