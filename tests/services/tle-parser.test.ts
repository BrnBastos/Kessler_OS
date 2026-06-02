import { describe, expect, it } from 'vitest';

import { parseTleText, tleSetToOrbitalObject } from '@/services/celestrak/tle-parser';

const envisatTle = `ENVISAT
1 27386U 02009A   26152.47524988  .00000103  00000+0  47189-4 0  9996
2 27386  98.3829 104.1449 0001313  92.1118  17.6250 14.39060709271224`;

describe('CelesTrak TLE parser', () => {
  it('parses a TLE set into orbital data', () => {
    const [tleSet] = parseTleText(envisatTle);

    expect(tleSet.name).toBe('ENVISAT');
    expect(tleSet.catalogNumber).toBe('27386');
    expect(tleSet.orbitRegion).toBe('LEO');
    expect(tleSet.altitudeKm).toBeGreaterThan(700);
  });

  it('maps parsed TLE data into the app orbital object model', () => {
    const [tleSet] = parseTleText(envisatTle);
    const object = tleSetToOrbitalObject(tleSet);

    expect(object.id).toBe('celestrak-27386');
    expect(object.dataConfidence).toBe('confirmed');
    expect(object.noradId).toBe('27386');
  });
});
