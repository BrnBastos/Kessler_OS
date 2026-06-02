import { describe, expect, it } from 'vitest';

import { mockOrbitalObjects } from '@/data';
import { calculateObjectScores } from '@/domain/scoring';
import { generateDecisionReport } from '@/services/ai/report-generator';

describe('decision report generator', () => {
  it('creates an explainable deterministic report', () => {
    const object = mockOrbitalObjects[0];
    const scoredObject = {
      ...object,
      scores: calculateObjectScores(object),
    };
    const report = generateDecisionReport({
      context: 'object-passport',
      object: scoredObject,
    });

    expect(report.title).toContain(scoredObject.name);
    expect(report.summary).toContain(scoredObject.name);
    expect(report.sections.length).toBeGreaterThanOrEqual(3);
    expect(report.assumptions.join(' ')).toContain('deterministic templates');
  });
});
