import { MissionType } from '@/domain/models';
import { MissionEstimate, ScoredOrbitalObject } from '@/domain/scoring';

import { getJsonItem, setJsonItem } from './storage';

const SAVED_MISSION_SCENARIOS_KEY = 'kessler.savedMissionScenarios.v1';
const MAX_SAVED_SCENARIOS = 12;

export type SavedMissionScenario = {
  circularValueScore: number;
  decision: string;
  estimatedDeltaVMps: number;
  estimatedDurationDays: number;
  feasibilityScore: number;
  id: string;
  missionType: MissionType;
  missionTypeLabel: string;
  objectId: string;
  objectName: string;
  riskReductionScore: number;
  savedAt: string;
};

export async function listSavedMissionScenarios() {
  return getJsonItem<SavedMissionScenario[]>(SAVED_MISSION_SCENARIOS_KEY, []);
}

export async function saveMissionScenario(object: ScoredOrbitalObject, result: MissionEstimate) {
  const savedScenario: SavedMissionScenario = {
    circularValueScore: result.circularValueScore,
    decision: result.decision,
    estimatedDeltaVMps: result.estimatedDeltaVMps,
    estimatedDurationDays: result.estimatedDurationDays,
    feasibilityScore: result.feasibilityScore,
    id: `${object.id}:${result.missionType}`,
    missionType: result.missionType,
    missionTypeLabel: result.missionTypeLabel,
    objectId: object.id,
    objectName: object.name,
    riskReductionScore: result.riskReductionScore,
    savedAt: new Date().toISOString(),
  };
  const currentScenarios = await listSavedMissionScenarios();
  const nextScenarios = [
    savedScenario,
    ...currentScenarios.filter((scenario) => scenario.id !== savedScenario.id),
  ].slice(0, MAX_SAVED_SCENARIOS);

  await setJsonItem(SAVED_MISSION_SCENARIOS_KEY, nextScenarios);

  return nextScenarios;
}

export async function removeSavedMissionScenario(id: string) {
  const currentScenarios = await listSavedMissionScenarios();
  const nextScenarios = currentScenarios.filter((scenario) => scenario.id !== id);

  await setJsonItem(SAVED_MISSION_SCENARIOS_KEY, nextScenarios);

  return nextScenarios;
}
