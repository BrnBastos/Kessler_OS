import { DataConfidence, OrbitalObject, OrbitalObjectStatus, OrbitRegion } from '@/domain/models';

import { PriorityScoreResult, ScoreLevel, ScoreResult } from './score-types';

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getScoreLevel(score: number): ScoreLevel {
  if (score >= 70) {
    return 'high';
  }

  if (score >= 40) {
    return 'medium';
  }

  return 'low';
}

function getOrbitFeasibilityValue(region: OrbitRegion) {
  const values: Record<OrbitRegion, number> = {
    GEO: 38,
    HEO: 44,
    LEO: 78,
    MEO: 52,
  };

  return values[region];
}

function getStatusFeasibilityAdjustment(status: OrbitalObjectStatus) {
  const values: Record<OrbitalObjectStatus, number> = {
    active: -20,
    fragment: -6,
    inactive: 10,
    unknown: -5,
  };

  return values[status];
}

function getConfidenceFeasibilityAdjustment(confidence: DataConfidence) {
  const values: Record<DataConfidence, number> = {
    confirmed: 6,
    estimated: 2,
    simulated: -3,
    unknown: -8,
  };

  return values[confidence];
}

function getFeasibilityScore(object: OrbitalObject) {
  return clampScore(
    getOrbitFeasibilityValue(object.orbitRegion) +
      getStatusFeasibilityAdjustment(object.status) +
      getConfidenceFeasibilityAdjustment(object.dataConfidence)
  );
}

function getDecision(object: OrbitalObject, riskScore: number, forgeValueScore: number) {
  if (object.dataConfidence === 'unknown') {
    return 'Insufficient data';
  }

  if (riskScore >= 76 && forgeValueScore >= 60) {
    return 'Inspect before removal';
  }

  if (riskScore >= 76) {
    return 'Prioritize removal';
  }

  if (forgeValueScore >= 66) {
    return 'Evaluate reuse';
  }

  if (riskScore >= 48) {
    return 'Monitor';
  }

  return 'Low priority';
}

function getPrioritySummary(score: number, decision: string, object: OrbitalObject) {
  if (score >= 70) {
    return `${object.name} is high priority in this prototype. Recommended decision: ${decision}.`;
  }

  if (score >= 40) {
    return `${object.name} should remain visible in the queue. Recommended decision: ${decision}.`;
  }

  return `${object.name} is low priority for now. Recommended decision: ${decision}.`;
}

export function calculatePriorityScore(
  object: OrbitalObject,
  risk: ScoreResult,
  forgeValue: ScoreResult
): PriorityScoreResult {
  const feasibilityScore = getFeasibilityScore(object);
  const score = clampScore(risk.score * 0.58 + forgeValue.score * 0.24 + feasibilityScore * 0.18);
  const decision = getDecision(object, risk.score, forgeValue.score);

  return {
    decision,
    factors: [
      {
        description: 'Risk carries the highest weight because safety and congestion come first.',
        label: 'Risk score',
        value: Math.round(risk.score * 0.58),
      },
      {
        description: 'Reuse value adds priority when recovery could create future material value.',
        label: 'Forge value',
        value: Math.round(forgeValue.score * 0.24),
      },
      {
        description: 'Feasibility reflects orbit accessibility, status, and data confidence.',
        label: 'Mission feasibility',
        value: Math.round(feasibilityScore * 0.18),
      },
    ],
    level: getScoreLevel(score),
    score,
    summary: getPrioritySummary(score, decision, object),
  };
}
