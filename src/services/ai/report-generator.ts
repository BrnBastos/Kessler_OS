import {
  formatDataConfidenceLabel,
  formatObjectStatusLabel,
  formatReuseMaterialLabel,
} from '@/content/pt-br';
import { DataConfidence, ReuseMaterialEstimate } from '@/domain/models';
import { MissionEstimate, ScoreFactor, ScoreLevel, ScoredOrbitalObject } from '@/domain/scoring';

import {
  buildDecisionReportPrompt,
  DecisionReportContext,
  DecisionReportInput,
} from './prompt-templates';

export type { DecisionReportContext } from './prompt-templates';

export type DecisionReportSection = {
  body: string;
  title: string;
};

export type DecisionReport = {
  assumptions: string[];
  confidenceLabel: string;
  context: DecisionReportContext;
  modelLabel: string;
  nextActions: string[];
  promptPreview: string;
  sections: DecisionReportSection[];
  summary: string;
  title: string;
};

function formatDataConfidence(confidence: DataConfidence) {
  return formatDataConfidenceLabel(confidence).toLowerCase();
}

function formatScoreLevel(level: ScoreLevel) {
  switch (level) {
    case 'high':
      return 'alta';
    case 'medium':
      return 'moderada';
    case 'low':
      return 'baixa';
  }
}

function getMassPhrase(object: ScoredOrbitalObject) {
  if (typeof object.estimatedMassKg !== 'number') {
    return 'massa desconhecida';
  }

  if (object.estimatedMassKg >= 5000) {
    return 'massa estimada muito alta';
  }

  if (object.estimatedMassKg >= 1000) {
    return 'massa estimada grande';
  }

  if (object.estimatedMassKg >= 100) {
    return 'massa estimada moderada';
  }

  return 'massa estimada baixa';
}

function getTopFactors(factors: ScoreFactor[], limit = 2) {
  return [...factors]
    .sort((left, right) => Math.abs(right.value) - Math.abs(left.value))
    .slice(0, limit);
}

function getPrioritySummary(object: ScoredOrbitalObject) {
  const topFactors = getTopFactors(object.scores.priority.factors)
    .map((factor) => factor.label.toLowerCase())
    .join(' e ');

  return `${object.name} recebe prioridade ${formatScoreLevel(
    object.scores.priority.level
  )} porque sua órbita ${object.orbitRegion}, status ${formatObjectStatusLabel(
    object.status
  )}, ${getMassPhrase(object)} e ${topFactors || 'combinação de pontuações'} aumentam a atenção no modelo do protótipo.`;
}

function getScoreSection(object: ScoredOrbitalObject): DecisionReportSection {
  return {
    body: [
      `Risco é ${object.scores.risk.score}, valor de reuso é ${object.scores.forgeValue.score} e prioridade é ${object.scores.priority.score}.`,
      `A decisão recomendada é "${object.scores.priority.decision}".`,
      object.scores.priority.summary,
    ].join(' '),
    title: 'Interpretação das pontuações',
  };
}

function getMissionSection(missionEstimate?: MissionEstimate): DecisionReportSection | undefined {
  if (!missionEstimate) {
    return undefined;
  }

  return {
    body: [
      `${missionEstimate.missionTypeLabel} retorna uma viabilidade de ${missionEstimate.feasibilityScore}.`,
      `O delta-v modelado é ${missionEstimate.estimatedDeltaVMps.toLocaleString('pt-BR')} m/s em cerca de ${missionEstimate.estimatedDurationDays} dias.`,
      missionEstimate.explanation,
    ].join(' '),
    title: 'Recomendação de missão',
  };
}

function getCircularSection(
  object: ScoredOrbitalObject,
  materialEstimates?: ReuseMaterialEstimate[]
): DecisionReportSection {
  if (!materialEstimates || materialEstimates.length === 0) {
    return {
      body: `A estimativa de reuso se baseia no valor de reuso ${object.scores.forgeValue.score}. Não há estimativa de composição material disponível, então o valor circular deve ser tratado apenas como sinal de planejamento.`,
      title: 'Interpretação de reuso',
    };
  }

  const strongestEstimate = [...materialEstimates].sort(
    (left, right) => right.estimatedSharePct - left.estimatedSharePct
  )[0];

  return {
    body: `O sinal material mais forte é ${formatReuseMaterialLabel(strongestEstimate.material)} com ${strongestEstimate.estimatedSharePct}% de participação estimada e ${formatDataConfidence(strongestEstimate.dataConfidence)}. Isso apoia exploração de economia circular, não composição material confirmada.`,
    title: 'Interpretação de reuso',
  };
}

function getConfidenceSection(object: ScoredOrbitalObject): DecisionReportSection {
  return {
    body: `Este relatório usa ${formatDataConfidence(
      object.dataConfidence
    )}. As pontuações são sinais determinísticos do protótipo e não devem ser lidas como previsão operacional de colisão, conformidade legal ou garantia de missão.`,
    title: 'Limite de confiança',
  };
}

function getNextActions(input: DecisionReportInput) {
  const actions = ['Revisar a ficha do objeto antes de escolher uma intervenção.'];

  if (input.object.scores.priority.decision === 'Dados insuficientes') {
    actions.push('Coletar melhores dados de rastreamento e identificação antes de recomendar remoção.');
  } else if (input.object.scores.priority.score >= 70) {
    actions.push('Rodar simulação de inspeção ou remoção antes de assumir um caminho de resposta.');
  } else if (input.object.scores.forgeValue.score >= 40) {
    actions.push('Comparar recuperação circular com descarte controlado.');
  } else {
    actions.push('Manter o objeto em monitoramento até surgirem novos sinais de risco.');
  }

  if (input.missionEstimate) {
    actions.push(
      input.missionEstimate.feasibilityScore >= 60
        ? 'Levar o conceito de missão para uma revisão detalhada de planejamento.'
        : 'Melhorar hipóteses antes de tratar a missão como prática.'
    );
  }

  return actions;
}

export function generateDecisionReport(input: DecisionReportInput): DecisionReport {
  const sections = [
    getScoreSection(input.object),
    getMissionSection(input.missionEstimate),
    getCircularSection(input.object, input.materialEstimates),
    getConfidenceSection(input.object),
  ].filter((section): section is DecisionReportSection => Boolean(section));

  return {
    assumptions: [
      'O relatório é gerado por templates determinísticos, não por um LLM ao vivo.',
      'CelesTrak ou dados mock podem fornecer sinais orbitais, mas o Kessler não faz propagação orbital.',
      'Estimativas de material são sinais simplificados por categoria, não composição confirmada.',
    ],
    confidenceLabel: formatDataConfidence(input.object.dataConfidence),
    context: input.context,
    modelLabel: 'Template determinístico',
    nextActions: getNextActions(input),
    promptPreview: buildDecisionReportPrompt(input),
    sections,
    summary: getPrioritySummary(input.object),
    title: `Relatório de decisão: ${input.object.name}`,
  };
}
