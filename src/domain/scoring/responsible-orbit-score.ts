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
      description: 'Planejar descarte no fim da vida útil reduz a criação de detritos de longo prazo.',
      label: 'Plano de descarte',
      value: input.disposalPlan ? 30 : 0,
    },
    {
      description: 'Passivação reduz risco de explosão e fragmentação após o fim da missão.',
      label: 'Passivação',
      value: input.passivationPlan ? 25 : 0,
    },
    {
      description: 'Rastreamento e catalogação melhoram a consciência orbital compartilhada.',
      label: 'Rastreamento',
      value: input.trackingPlan ? 20 : 0,
    },
    {
      description: 'Planejamento de desvio reduz risco operacional durante a missão.',
      label: 'Plano de desvio',
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
        ? 'Esta missão fictícia mostra bom comportamento de prevenção no modelo simplificado.'
        : 'Esta missão fictícia precisa de planejamento preventivo mais forte antes de ser considerada responsável.',
  };
}
