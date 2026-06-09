import { OrbitalObject } from '@/domain/models';

import { calculateForgeValueScore } from './forge-value-score';
import { calculatePriorityScore } from './priority-score';
import { calculateRiskScore } from './risk-score';

export * from './forge-value-score';
export * from './mission-estimator';
export * from './priority-score';
export * from './risk-score';
export * from './score-types';

export function calculateObjectScores(object: OrbitalObject) {
  const risk = calculateRiskScore(object);
  const forgeValue = calculateForgeValueScore(object);
  const priority = calculatePriorityScore(object, risk, forgeValue);

  return {
    forgeValue,
    priority,
    risk,
  };
}
