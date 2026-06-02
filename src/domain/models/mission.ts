import { DataConfidence } from './orbital-object';

export type MissionType = 'avoidance' | 'inspection' | 'deorbit' | 'recovery';
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
