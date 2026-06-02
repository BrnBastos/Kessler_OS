import { DataConfidence, OrbitalObject, OrbitalObjectStatus, OrbitalObjectType, OrbitRegion } from '@/domain/models';

import { ScoreLevel, ScoreResult } from './score-types';

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

function getMassValue(massKg?: number) {
  if (typeof massKg !== 'number') {
    return 8;
  }

  if (massKg >= 5000) {
    return 26;
  }

  if (massKg >= 1000) {
    return 22;
  }

  if (massKg >= 100) {
    return 14;
  }

  return 6;
}

function getTypeUtilityValue(type: OrbitalObjectType) {
  const values: Record<OrbitalObjectType, number> = {
    debris: 8,
    rocket_body: 18,
    satellite: 20,
    unknown: 5,
  };

  return values[type];
}

function getOrbitAccessibilityValue(region: OrbitRegion) {
  const values: Record<OrbitRegion, number> = {
    GEO: 8,
    HEO: 10,
    LEO: 20,
    MEO: 12,
  };

  return values[region];
}

function getRecoveryStatusValue(status: OrbitalObjectStatus) {
  const values: Record<OrbitalObjectStatus, number> = {
    active: 2,
    fragment: 5,
    inactive: 18,
    unknown: 8,
  };

  return values[status];
}

function getConfidenceValue(confidence: DataConfidence) {
  const values: Record<DataConfidence, number> = {
    confirmed: 14,
    estimated: 11,
    simulated: 7,
    unknown: 3,
  };

  return values[confidence];
}

function getHandlingPenalty(object: OrbitalObject) {
  if (object.status === 'active') {
    return 12;
  }

  if (object.status === 'fragment') {
    return 9;
  }

  if (object.dataConfidence === 'unknown') {
    return 7;
  }

  return 3;
}

function getForgeSummary(score: number, object: OrbitalObject) {
  if (score >= 70) {
    return `${object.name} has strong simulated reuse potential, but material assumptions still need validation.`;
  }

  if (score >= 40) {
    return `${object.name} may have reuse value if inspection confirms mass, structure, and handling feasibility.`;
  }

  return `${object.name} has limited reuse signal in this simplified model and may be better suited for monitoring or disposal.`;
}

export function calculateForgeValueScore(object: OrbitalObject): ScoreResult {
  const handlingPenalty = getHandlingPenalty(object);
  const factors = [
    {
      description: 'Higher estimated mass can increase recoverable material potential.',
      label: 'Estimated mass',
      value: getMassValue(object.estimatedMassKg),
    },
    {
      description: `${object.type} objects have different likely material and component utility.`,
      label: 'Object utility',
      value: getTypeUtilityValue(object.type),
    },
    {
      description: `${object.orbitRegion} access affects practical recovery assumptions.`,
      label: 'Orbit accessibility',
      value: getOrbitAccessibilityValue(object.orbitRegion),
    },
    {
      description: `${object.status} status affects whether reuse can be considered.`,
      label: 'Recovery status',
      value: getRecoveryStatusValue(object.status),
    },
    {
      description: `${object.dataConfidence} confidence changes how much trust to place in reuse estimates.`,
      label: 'Data confidence',
      value: getConfidenceValue(object.dataConfidence),
    },
    {
      description: 'Handling risk reduces value when capture or inspection is uncertain.',
      label: 'Handling penalty',
      value: -handlingPenalty,
    },
  ];
  const score = clampScore(factors.reduce((total, factor) => total + factor.value, 0));

  return {
    factors,
    level: getScoreLevel(score),
    score,
    summary: getForgeSummary(score, object),
  };
}
