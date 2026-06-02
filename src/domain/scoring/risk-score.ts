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

function getOrbitCongestionValue(region: OrbitRegion) {
  const values: Record<OrbitRegion, number> = {
    GEO: 18,
    HEO: 12,
    LEO: 28,
    MEO: 14,
  };

  return values[region];
}

function getStatusValue(status: OrbitalObjectStatus) {
  const values: Record<OrbitalObjectStatus, number> = {
    active: 5,
    fragment: 22,
    inactive: 18,
    unknown: 16,
  };

  return values[status];
}

function getTypeValue(type: OrbitalObjectType) {
  const values: Record<OrbitalObjectType, number> = {
    debris: 20,
    rocket_body: 17,
    satellite: 8,
    unknown: 14,
  };

  return values[type];
}

function getMassValue(massKg?: number) {
  if (typeof massKg !== 'number') {
    return 5;
  }

  if (massKg >= 5000) {
    return 16;
  }

  if (massKg >= 1000) {
    return 12;
  }

  if (massKg >= 100) {
    return 7;
  }

  return 3;
}

function getPersistenceValue(object: OrbitalObject) {
  if (object.orbitRegion === 'LEO' && object.altitudeKm >= 700) {
    return 10;
  }

  if (object.orbitRegion === 'LEO') {
    return 6;
  }

  if (object.orbitRegion === 'GEO') {
    return 8;
  }

  return 5;
}

function getConfidenceValue(confidence: DataConfidence) {
  const values: Record<DataConfidence, number> = {
    confirmed: 0,
    estimated: 4,
    simulated: 8,
    unknown: 10,
  };

  return values[confidence];
}

function getRiskSummary(score: number, object: OrbitalObject) {
  if (score >= 70) {
    return `${object.name} needs high attention because orbit, status, mass, or uncertainty increase operational concern.`;
  }

  if (score >= 40) {
    return `${object.name} has moderate attention signals and should remain in the review queue.`;
  }

  return `${object.name} has low prototype risk in this simplified model.`;
}

export function calculateRiskScore(object: OrbitalObject): ScoreResult {
  const factors = [
    {
      description: `${object.orbitRegion} traffic and persistence signal.`,
      label: 'Orbit congestion',
      value: getOrbitCongestionValue(object.orbitRegion),
    },
    {
      description: `${object.status} objects can increase operational uncertainty.`,
      label: 'Object status',
      value: getStatusValue(object.status),
    },
    {
      description: `${object.type} classification affects expected behavior.`,
      label: 'Object type',
      value: getTypeValue(object.type),
    },
    {
      description: 'Larger objects can create larger consequences if involved in fragmentation.',
      label: 'Estimated mass',
      value: getMassValue(object.estimatedMassKg),
    },
    {
      description: 'Higher or long-lived orbits can keep debris relevant for longer.',
      label: 'Persistence',
      value: getPersistenceValue(object),
    },
    {
      description: `${object.dataConfidence} confidence adds uncertainty to the estimate.`,
      label: 'Data uncertainty',
      value: getConfidenceValue(object.dataConfidence),
    },
  ];
  const score = clampScore(factors.reduce((total, factor) => total + factor.value, 0));

  return {
    factors,
    level: getScoreLevel(score),
    score,
    summary: getRiskSummary(score, object),
  };
}
