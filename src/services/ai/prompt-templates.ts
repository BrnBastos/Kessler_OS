import {
  formatDataConfidenceLabel,
  formatObjectStatusLabel,
  formatObjectTypeLabel,
  formatReuseMaterialLabel,
  formatReusePotentialLabel,
} from '@/content/pt-br';
import { ReuseMaterialEstimate } from '@/domain/models';
import { MissionEstimate, ScoredOrbitalObject } from '@/domain/scoring';

export type DecisionReportContext = 'object-passport' | 'priority' | 'mission' | 'circular';

export type DecisionReportInput = {
  context: DecisionReportContext;
  materialEstimates?: ReuseMaterialEstimate[];
  missionEstimate?: MissionEstimate;
  object: ScoredOrbitalObject;
};

function formatContext(context: DecisionReportContext) {
  const labels: Record<DecisionReportContext, string> = {
    circular: 'reaproveitamento',
    mission: 'missão',
    'object-passport': 'ficha do objeto',
    priority: 'prioridade',
  };

  return labels[context];
}

function formatScoreLevel(level: string) {
  switch (level) {
    case 'high':
      return 'alto';
    case 'medium':
      return 'médio';
    case 'low':
      return 'baixo';
    default:
      return level;
  }
}

function formatMaterialEstimates(materialEstimates?: ReuseMaterialEstimate[]) {
  if (!materialEstimates || materialEstimates.length === 0) {
    return 'Nenhuma estimativa de material informada.';
  }

  return materialEstimates
    .map(
      (estimate) =>
        `${formatReuseMaterialLabel(estimate.material)}: ${estimate.estimatedSharePct}% de participação estimada, potencial ${formatReusePotentialLabel(estimate.potential).toLowerCase()}, confiança ${formatDataConfidenceLabel(estimate.dataConfidence).toLowerCase()}`
    )
    .join('\n');
}

export function buildDecisionReportPrompt(input: DecisionReportInput) {
  const { materialEstimates, missionEstimate, object } = input;

  return [
    'Escreva um relatório de decisão conciso do Kessler OS usando apenas os dados determinísticos fornecidos.',
    'Não afirme segurança operacional, conformidade legal, composição material exata ou viabilidade real de missão.',
    '',
    `Contexto: ${formatContext(input.context)}`,
    `Objeto: ${object.name}`,
    `Tipo/status/órbita: ${formatObjectTypeLabel(object.type)}, ${formatObjectStatusLabel(object.status)}, ${object.orbitRegion}`,
    `Confiança dos dados: ${formatDataConfidenceLabel(object.dataConfidence)}`,
    `Pontuação de risco: ${object.scores.risk.score} (${formatScoreLevel(object.scores.risk.level)})`,
    `Valor de reuso: ${object.scores.forgeValue.score} (${formatScoreLevel(object.scores.forgeValue.level)})`,
    `Pontuação de prioridade: ${object.scores.priority.score} (${formatScoreLevel(object.scores.priority.level)})`,
    `Decisão de prioridade: ${object.scores.priority.decision}`,
    missionEstimate
      ? `Missão: ${missionEstimate.missionTypeLabel}, viabilidade ${missionEstimate.feasibilityScore}, decisão ${missionEstimate.decision}`
      : 'Missão: nenhuma selecionada',
    'Estimativas de material:',
    formatMaterialEstimates(materialEstimates),
  ].join('\n');
}
