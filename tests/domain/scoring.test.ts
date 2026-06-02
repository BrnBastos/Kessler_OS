import { describe, expect, it } from 'vitest';

import { mockOrbitalObjects } from '@/data';
import { calculateObjectScores, estimateMission } from '@/domain/scoring';

function getMockObject(id: string) {
  const object = mockOrbitalObjects.find((item) => item.id === id);

  if (!object) {
    throw new Error(`Missing mock object ${id}`);
  }

  return object;
}

describe('orbital scoring engines', () => {
  it('ranks a large inactive LEO object as high priority', () => {
    const object = getMockObject('obj-envisat');
    const scores = calculateObjectScores(object);

    expect(scores.risk.level).toBe('high');
    expect(scores.priority.level).toBe('high');
    expect(scores.priority.decision).toBe('Inspect before removal');
  });

  it('keeps active operational spacecraft out of removal priority', () => {
    const object = getMockObject('obj-hubble');
    const scores = calculateObjectScores(object);

    expect(scores.risk.level).not.toBe('high');
    expect(scores.priority.decision).not.toBe('Prioritize removal');
  });
});

describe('mission estimator', () => {
  it('returns a deterministic inspection estimate for ENVISAT', () => {
    const object = {
      ...getMockObject('obj-envisat'),
      scores: calculateObjectScores(getMockObject('obj-envisat')),
    };
    const estimate = estimateMission(object, 'inspect');

    expect(estimate.targetObjectId).toBe(object.id);
    expect(estimate.missionTypeLabel).toBe('Inspect');
    expect(estimate.feasibilityScore).toBeGreaterThan(0);
    expect(estimate.estimatedDeltaVMps).toBeGreaterThan(0);
    expect(estimate.explanation).toContain(object.name);
  });
});
