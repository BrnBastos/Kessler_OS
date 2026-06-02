import { ReuseMaterialEstimate } from '@/domain/models';
import { MissionEstimate, ScoredOrbitalObject } from '@/domain/scoring';

export type DecisionReportContext = 'object-passport' | 'priority' | 'mission' | 'circular';

export type DecisionReportInput = {
  context: DecisionReportContext;
  materialEstimates?: ReuseMaterialEstimate[];
  missionEstimate?: MissionEstimate;
  object: ScoredOrbitalObject;
};

function formatMaterialEstimates(materialEstimates?: ReuseMaterialEstimate[]) {
  if (!materialEstimates || materialEstimates.length === 0) {
    return 'No material estimates provided.';
  }

  return materialEstimates
    .map(
      (estimate) =>
        `${estimate.material}: ${estimate.estimatedSharePct}% estimated share, ${estimate.potential} potential, ${estimate.dataConfidence} confidence`
    )
    .join('\n');
}

export function buildDecisionReportPrompt(input: DecisionReportInput) {
  const { materialEstimates, missionEstimate, object } = input;

  return [
    'Write a concise Kessler OS decision report using only the provided deterministic data.',
    'Do not claim operational safety, legal compliance, exact material composition, or real mission feasibility.',
    '',
    `Context: ${input.context}`,
    `Object: ${object.name}`,
    `Type/status/orbit: ${object.type}, ${object.status}, ${object.orbitRegion}`,
    `Data confidence: ${object.dataConfidence}`,
    `Risk score: ${object.scores.risk.score} (${object.scores.risk.level})`,
    `Forge value score: ${object.scores.forgeValue.score} (${object.scores.forgeValue.level})`,
    `Priority score: ${object.scores.priority.score} (${object.scores.priority.level})`,
    `Priority decision: ${object.scores.priority.decision}`,
    missionEstimate
      ? `Mission: ${missionEstimate.missionTypeLabel}, feasibility ${missionEstimate.feasibilityScore}, decision ${missionEstimate.decision}`
      : 'Mission: none selected',
    'Material estimates:',
    formatMaterialEstimates(materialEstimates),
  ].join('\n');
}
