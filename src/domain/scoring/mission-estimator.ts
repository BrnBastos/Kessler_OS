import { MissionRiskLevel, MissionType, OrbitRegion } from '@/domain/models';

import { ScoredOrbitalObject, ScoreFactor, ScoreLevel } from './score-types';

export type MissionEstimate = {
  circularValueScore: number;
  confidenceScore: number;
  decision: string;
  estimatedDeltaVMps: number;
  estimatedDurationDays: number;
  explanation: string;
  factors: ScoreFactor[];
  feasibilityLevel: ScoreLevel;
  feasibilityScore: number;
  missionType: MissionType;
  missionTypeLabel: string;
  operationalRiskLevel: MissionRiskLevel;
  riskReductionScore: number;
  targetObjectId: string;
};

type MissionProfile = {
  baseDeltaVMps: number;
  baseDurationDays: number;
  circularValueWeight: number;
  complexity: number;
  label: string;
  objective: string;
  riskReductionBase: number;
};

export const missionProfiles: Record<MissionType, MissionProfile> = {
  avoid: {
    baseDeltaVMps: 70,
    baseDurationDays: 4,
    circularValueWeight: 0,
    complexity: 30,
    label: 'Avoid',
    objective: 'Plan an avoidance maneuver or decision window for a conjunction scenario.',
    riskReductionBase: 46,
  },
  capture: {
    baseDeltaVMps: 260,
    baseDurationDays: 95,
    circularValueWeight: 48,
    complexity: 82,
    label: 'Capture',
    objective: 'Estimate whether a servicing mission could capture or stabilize the object.',
    riskReductionBase: 72,
  },
  deorbit: {
    baseDeltaVMps: 180,
    baseDurationDays: 75,
    circularValueWeight: 12,
    complexity: 70,
    label: 'Deorbit',
    objective: 'Estimate a disposal response that removes the object from long-term orbit.',
    riskReductionBase: 78,
  },
  inspect: {
    baseDeltaVMps: 95,
    baseDurationDays: 21,
    circularValueWeight: 30,
    complexity: 36,
    label: 'Inspect',
    objective: 'Collect close-range data before committing to capture, reuse or disposal.',
    riskReductionBase: 34,
  },
  monitor: {
    baseDeltaVMps: 0,
    baseDurationDays: 14,
    circularValueWeight: 8,
    complexity: 14,
    label: 'Monitor',
    objective: 'Keep the object visible in the catalog and watch risk signals over time.',
    riskReductionBase: 18,
  },
  move_to_safer_orbit: {
    baseDeltaVMps: 240,
    baseDurationDays: 60,
    circularValueWeight: 18,
    complexity: 62,
    label: 'Move to safer orbit',
    objective: 'Model a relocation action that reduces pressure on crowded operational regions.',
    riskReductionBase: 66,
  },
  recycle: {
    baseDeltaVMps: 310,
    baseDurationDays: 130,
    circularValueWeight: 78,
    complexity: 88,
    label: 'Recycle',
    objective: 'Explore whether object recovery could support a circular orbital economy.',
    riskReductionBase: 64,
  },
};

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

function getOrbitAccessibility(region: OrbitRegion) {
  const values: Record<OrbitRegion, number> = {
    GEO: 4,
    HEO: 0,
    LEO: 22,
    MEO: 10,
  };

  return values[region];
}

function getOrbitDeltaV(region: OrbitRegion) {
  const values: Record<OrbitRegion, number> = {
    GEO: 620,
    HEO: 760,
    LEO: 90,
    MEO: 480,
  };

  return values[region];
}

function getOrbitDuration(region: OrbitRegion) {
  const values: Record<OrbitRegion, number> = {
    GEO: 34,
    HEO: 42,
    LEO: 8,
    MEO: 26,
  };

  return values[region];
}

function getStatusFit(object: ScoredOrbitalObject, missionType: MissionType) {
  if (missionType === 'avoid') {
    return object.status === 'active' ? 14 : object.status === 'fragment' ? -12 : 4;
  }

  if (missionType === 'deorbit') {
    return object.status === 'inactive' || object.status === 'fragment' ? 14 : -18;
  }

  if (missionType === 'capture' || missionType === 'recycle') {
    if (object.status === 'active') {
      return -18;
    }

    return object.status === 'inactive' ? 12 : -8;
  }

  if (missionType === 'inspect') {
    return object.dataConfidence === 'unknown' ? 12 : 6;
  }

  return object.dataConfidence === 'unknown' ? 10 : 4;
}

function getConfidenceFit(object: ScoredOrbitalObject) {
  switch (object.dataConfidence) {
    case 'confirmed':
      return 10;
    case 'estimated':
      return 5;
    case 'simulated':
      return -2;
    case 'unknown':
      return -10;
  }
}

function getMassComplexity(object: ScoredOrbitalObject) {
  if (typeof object.estimatedMassKg !== 'number') {
    return 8;
  }

  if (object.estimatedMassKg >= 5000) {
    return 18;
  }

  if (object.estimatedMassKg >= 1000) {
    return 12;
  }

  if (object.estimatedMassKg >= 100) {
    return 6;
  }

  return 2;
}

function getMissionFit(object: ScoredOrbitalObject, missionType: MissionType) {
  switch (missionType) {
    case 'avoid':
      return object.status === 'active' ? 12 : object.scores.risk.score >= 70 ? 8 : 0;
    case 'capture':
      return object.scores.forgeValue.score >= 60 ? 14 : object.type === 'debris' ? -8 : 4;
    case 'deorbit':
      return object.orbitRegion === 'LEO' ? 12 : object.orbitRegion === 'GEO' ? -18 : 2;
    case 'inspect':
      return object.scores.priority.score >= 60 ? 12 : 5;
    case 'monitor':
      return object.scores.priority.decision === 'Insufficient data' ? 12 : 4;
    case 'move_to_safer_orbit':
      return object.orbitRegion === 'GEO' ? 10 : object.orbitRegion === 'LEO' ? 6 : 2;
    case 'recycle':
      return object.scores.forgeValue.score >= 70 ? 22 : object.scores.forgeValue.score >= 40 ? 10 : -4;
  }
}

function getOperationalRiskLevel(score: number): MissionRiskLevel {
  if (score >= 70) {
    return 'high';
  }

  if (score >= 40) {
    return 'medium';
  }

  return 'low';
}

function getDecision(result: {
  circularValueScore: number;
  feasibilityScore: number;
  missionType: MissionType;
  riskReductionScore: number;
}) {
  if (result.feasibilityScore >= 70 && result.riskReductionScore >= 65) {
    return 'Recommended prototype response';
  }

  if (
    result.missionType === 'recycle' &&
    result.circularValueScore >= 70 &&
    result.feasibilityScore >= 50
  ) {
    return 'Investigate circular recovery';
  }

  if (result.feasibilityScore >= 48) {
    return 'Run detailed planning review';
  }

  return 'Start with monitoring and better data';
}

function getExplanation(object: ScoredOrbitalObject, estimate: MissionEstimate) {
  if (estimate.feasibilityScore >= 70) {
    return `${estimate.missionTypeLabel} is a strong prototype option for ${object.name} because orbit access, object status and data confidence support the modeled response.`;
  }

  if (estimate.feasibilityScore >= 40) {
    return `${estimate.missionTypeLabel} may be useful for ${object.name}, but the model shows tradeoffs that need more planning before commitment.`;
  }

  return `${estimate.missionTypeLabel} is weak for ${object.name} in this prototype. Monitoring, inspection or better data should come first.`;
}

export function estimateMission(
  object: ScoredOrbitalObject,
  missionType: MissionType
): MissionEstimate {
  const profile = missionProfiles[missionType];
  const orbitAccessibility = getOrbitAccessibility(object.orbitRegion);
  const statusFit = getStatusFit(object, missionType);
  const confidenceFit = getConfidenceFit(object);
  const massPenalty = getMassComplexity(object);
  const missionFit = getMissionFit(object, missionType);
  const feasibilityScore = clampScore(
    72 + orbitAccessibility + statusFit + confidenceFit + missionFit - profile.complexity * 0.55 - massPenalty
  );
  const riskReductionScore = clampScore(
    profile.riskReductionBase + object.scores.risk.score * 0.32 + missionFit * 0.4
  );
  const circularValueScore = clampScore(
    object.scores.forgeValue.score * 0.58 + profile.circularValueWeight * 0.42
  );
  const confidenceScore = clampScore(68 + confidenceFit * 2 - profile.complexity * 0.16);
  const estimatedDeltaVMps =
    missionType === 'monitor'
      ? 0
      : Math.round(profile.baseDeltaVMps + getOrbitDeltaV(object.orbitRegion) + massPenalty * 4);
  const estimatedDurationDays = Math.round(
    profile.baseDurationDays + getOrbitDuration(object.orbitRegion) + profile.complexity * 0.22
  );
  const operationalRiskScore = clampScore(
    profile.complexity * 0.72 + object.scores.risk.score * 0.3 - confidenceFit
  );
  const decision = getDecision({
    circularValueScore,
    feasibilityScore,
    missionType,
    riskReductionScore,
  });
  const estimate: MissionEstimate = {
    circularValueScore,
    confidenceScore,
    decision,
    estimatedDeltaVMps,
    estimatedDurationDays,
    explanation: '',
    factors: [
      {
        description: `${object.orbitRegion} access changes transfer effort and timeline.`,
        label: 'Orbit access',
        value: orbitAccessibility,
      },
      {
        description: `${object.status} status changes whether this response is appropriate.`,
        label: 'Object status fit',
        value: statusFit,
      },
      {
        description: `${object.dataConfidence} confidence changes how much the estimate can be trusted.`,
        label: 'Data confidence',
        value: confidenceFit,
      },
      {
        description: `${profile.label} has a modeled complexity cost.`,
        label: 'Mission complexity',
        value: -Math.round(profile.complexity * 0.55),
      },
      {
        description: 'Larger or unknown mass increases handling difficulty.',
        label: 'Mass handling',
        value: -massPenalty,
      },
      {
        description: profile.objective,
        label: 'Mission fit',
        value: missionFit,
      },
    ],
    feasibilityLevel: getScoreLevel(feasibilityScore),
    feasibilityScore,
    missionType,
    missionTypeLabel: profile.label,
    operationalRiskLevel: getOperationalRiskLevel(operationalRiskScore),
    riskReductionScore,
    targetObjectId: object.id,
  };

  return {
    ...estimate,
    explanation: getExplanation(object, estimate),
  };
}
