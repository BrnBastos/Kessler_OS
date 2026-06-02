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
  switch (confidence) {
    case 'confirmed':
      return 'confirmed public data';
    case 'estimated':
      return 'system-estimated data';
    case 'simulated':
      return 'simulated data';
    case 'unknown':
      return 'unknown data';
  }
}

function formatScoreLevel(level: ScoreLevel) {
  switch (level) {
    case 'high':
      return 'high';
    case 'medium':
      return 'moderate';
    case 'low':
      return 'low';
  }
}

function getMassPhrase(object: ScoredOrbitalObject) {
  if (typeof object.estimatedMassKg !== 'number') {
    return 'unknown mass';
  }

  if (object.estimatedMassKg >= 5000) {
    return 'very high estimated mass';
  }

  if (object.estimatedMassKg >= 1000) {
    return 'large estimated mass';
  }

  if (object.estimatedMassKg >= 100) {
    return 'moderate estimated mass';
  }

  return 'low estimated mass';
}

function getTopFactors(factors: ScoreFactor[], limit = 2) {
  return [...factors]
    .sort((left, right) => Math.abs(right.value) - Math.abs(left.value))
    .slice(0, limit);
}

function getPrioritySummary(object: ScoredOrbitalObject) {
  const topFactors = getTopFactors(object.scores.priority.factors)
    .map((factor) => factor.label.toLowerCase())
    .join(' and ');

  return `${object.name} receives ${formatScoreLevel(
    object.scores.priority.level
  )} priority because its ${object.orbitRegion} orbit, ${object.status} status, ${getMassPhrase(
    object
  )}, and ${topFactors || 'score mix'} increase attention in the prototype model.`;
}

function getScoreSection(object: ScoredOrbitalObject): DecisionReportSection {
  return {
    body: [
      `Risk is ${object.scores.risk.score}, forge value is ${object.scores.forgeValue.score}, and priority is ${object.scores.priority.score}.`,
      `The recommended decision is "${object.scores.priority.decision}".`,
      object.scores.priority.summary,
    ].join(' '),
    title: 'Score interpretation',
  };
}

function getMissionSection(missionEstimate?: MissionEstimate): DecisionReportSection | undefined {
  if (!missionEstimate) {
    return undefined;
  }

  return {
    body: [
      `${missionEstimate.missionTypeLabel} returns a feasibility score of ${missionEstimate.feasibilityScore}.`,
      `The modeled delta-v is ${missionEstimate.estimatedDeltaVMps.toLocaleString()} m/s over about ${missionEstimate.estimatedDurationDays} days.`,
      missionEstimate.explanation,
    ].join(' '),
    title: 'Mission recommendation',
  };
}

function getCircularSection(
  object: ScoredOrbitalObject,
  materialEstimates?: ReuseMaterialEstimate[]
): DecisionReportSection {
  if (!materialEstimates || materialEstimates.length === 0) {
    return {
      body: `The reuse estimate is based on forge value ${object.scores.forgeValue.score}. No material composition estimate is available, so circular value should be treated as a planning signal only.`,
      title: 'Reuse interpretation',
    };
  }

  const strongestEstimate = [...materialEstimates].sort(
    (left, right) => right.estimatedSharePct - left.estimatedSharePct
  )[0];

  return {
    body: `The strongest material signal is ${strongestEstimate.material} at ${strongestEstimate.estimatedSharePct}% estimated share with ${strongestEstimate.dataConfidence} confidence. This supports circular-economy exploration, not confirmed material composition.`,
    title: 'Reuse interpretation',
  };
}

function getConfidenceSection(object: ScoredOrbitalObject): DecisionReportSection {
  return {
    body: `This report uses ${formatDataConfidence(
      object.dataConfidence
    )}. Scores are deterministic prototype signals and should not be read as operational collision prediction, legal compliance, or mission assurance.`,
    title: 'Confidence boundary',
  };
}

function getNextActions(input: DecisionReportInput) {
  const actions = ['Review the object passport before choosing an intervention.'];

  if (input.object.scores.priority.decision === 'Insufficient data') {
    actions.push('Collect better tracking and identification data before recommending removal.');
  } else if (input.object.scores.priority.score >= 70) {
    actions.push('Run inspection or removal simulation before committing to a response path.');
  } else if (input.object.scores.forgeValue.score >= 40) {
    actions.push('Compare circular recovery against controlled disposal.');
  } else {
    actions.push('Keep the object in monitoring unless new risk signals appear.');
  }

  if (input.missionEstimate) {
    actions.push(
      input.missionEstimate.feasibilityScore >= 60
        ? 'Move the mission concept into detailed planning review.'
        : 'Improve assumptions before treating the mission as practical.'
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
      'The report is generated from deterministic templates, not a live LLM.',
      'CelesTrak or mock data may provide orbital signals, but Kessler does not perform propagation.',
      'Material estimates are simplified category signals, not confirmed composition.',
    ],
    confidenceLabel: formatDataConfidence(input.object.dataConfidence),
    context: input.context,
    modelLabel: 'Deterministic report template',
    nextActions: getNextActions(input),
    promptPreview: buildDecisionReportPrompt(input),
    sections,
    summary: getPrioritySummary(input.object),
    title: `${input.object.name} decision report`,
  };
}
