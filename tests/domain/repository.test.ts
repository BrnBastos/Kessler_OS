import { describe, expect, it } from 'vitest';

import {
  getScoredOrbitalObjectById,
  listOrbitalObjects,
  listScoredOrbitalObjects,
} from '@/domain/repositories';

describe('orbital object repository', () => {
  it('filters objects by orbit region and type', () => {
    const leoDebris = listOrbitalObjects({ orbitRegion: 'LEO', type: 'debris' });

    expect(leoDebris.length).toBeGreaterThan(0);
    expect(leoDebris.every((object) => object.orbitRegion === 'LEO')).toBe(true);
    expect(leoDebris.every((object) => object.type === 'debris')).toBe(true);
  });

  it('returns scored objects with all score groups', () => {
    const [object] = listScoredOrbitalObjects();

    expect(object.scores.risk.score).toBeGreaterThanOrEqual(0);
    expect(object.scores.forgeValue.score).toBeGreaterThanOrEqual(0);
    expect(object.scores.priority.score).toBeGreaterThanOrEqual(0);
  });

  it('finds a scored object by id', () => {
    const object = getScoredOrbitalObjectById('obj-envisat');

    expect(object?.name).toBe('ENVISAT');
    expect(object?.scores.priority.decision).toBeTruthy();
  });
});
