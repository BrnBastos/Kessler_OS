import { MissionScenario } from '@/domain/models';

export const mockMissions: MissionScenario[] = [
  {
    dataConfidence: 'simulated',
    estimatedDeltaVMps: 120,
    estimatedDurationDays: 18,
    id: 'mission-inspect-envisat',
    name: 'ENVISAT inspection pass',
    objective: 'Inspect attitude, tumble state and potential capture points before any removal plan.',
    riskLevel: 'medium',
    targetObjectId: 'obj-envisat',
    type: 'inspection',
  },
  {
    dataConfidence: 'simulated',
    estimatedDeltaVMps: 260,
    estimatedDurationDays: 42,
    id: 'mission-deorbit-cosmos-frag',
    name: 'Fragment deorbit trial',
    objective: 'Model a small-object removal mission for a high-attention LEO fragment.',
    riskLevel: 'high',
    targetObjectId: 'obj-cosmos-2251-frag',
    type: 'deorbit',
  },
  {
    dataConfidence: 'simulated',
    estimatedDeltaVMps: 80,
    estimatedDurationDays: 9,
    id: 'mission-avoidance-hubble',
    name: 'Operational avoidance check',
    objective: 'Compare a low-disruption avoidance decision against maintaining mission operations.',
    riskLevel: 'low',
    targetObjectId: 'obj-hubble',
    type: 'avoidance',
  },
];
