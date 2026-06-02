import { ScoreLevel, ScoreResult } from './score-types';

export type ResponsibleOrbitInput = {
  collisionAvoidancePlan: boolean;
  disposalPlan: boolean;
  passivationPlan: boolean;
  trackingPlan: boolean;
};

function getScoreLevel(score: number): ScoreLevel {
  if (score >= 70) {
    return 'high';
  }

  if (score >= 40) {
    return 'medium';
  }

  return 'low';
}

export function calculateResponsibleOrbitScore(input: ResponsibleOrbitInput): ScoreResult {
  const factors = [
    {
      description: 'End-of-life disposal planning reduces long-term debris creation.',
      label: 'Disposal plan',
      value: input.disposalPlan ? 30 : 0,
    },
    {
      description: 'Passivation reduces explosion and fragmentation risk after mission end.',
      label: 'Passivation',
      value: input.passivationPlan ? 25 : 0,
    },
    {
      description: 'Tracking and cataloging improves shared orbital awareness.',
      label: 'Tracking',
      value: input.trackingPlan ? 20 : 0,
    },
    {
      description: 'Collision-avoidance planning reduces operational risk during the mission.',
      label: 'Avoidance plan',
      value: input.collisionAvoidancePlan ? 25 : 0,
    },
  ];
  const score = factors.reduce((total, factor) => total + factor.value, 0);

  return {
    factors,
    level: getScoreLevel(score),
    score,
    summary:
      score >= 70
        ? 'This fictional mission shows strong prevention behavior in the simplified model.'
        : 'This fictional mission needs stronger prevention planning before it should be considered responsible.',
  };
}
