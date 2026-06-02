import { OrbitalObject } from '@/domain/models';

export type ScoreLevel = 'low' | 'medium' | 'high';

export type ScoreFactor = {
  description: string;
  label: string;
  value: number;
};

export type ScoreResult = {
  factors: ScoreFactor[];
  level: ScoreLevel;
  score: number;
  summary: string;
};

export type PriorityScoreResult = ScoreResult & {
  decision: string;
};

export type ObjectScores = {
  forgeValue: ScoreResult;
  priority: PriorityScoreResult;
  risk: ScoreResult;
};

export type ScoredOrbitalObject = OrbitalObject & {
  scores: ObjectScores;
};
