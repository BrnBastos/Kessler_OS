import {
  OrbitalObject,
  OrbitalObjectStatus,
  OrbitalObjectType,
  OrbitRegion,
} from '@/domain/models';

const EARTH_RADIUS_KM = 6378.137;
const EARTH_MU_KM3_S2 = 398600.4418;
const SECONDS_PER_DAY = 86400;

export type ParsedTleSet = {
  altitudeKm: number;
  catalogNumber: string;
  inclinationDeg?: number;
  launchYear?: number;
  line1: string;
  line2: string;
  meanMotionRevPerDay?: number;
  name: string;
  orbitRegion: OrbitRegion;
};

function estimateAltitudeKm(meanMotionRevPerDay?: number) {
  if (!meanMotionRevPerDay || meanMotionRevPerDay <= 0) {
    return 0;
  }

  const meanMotionRadPerSecond = (meanMotionRevPerDay * 2 * Math.PI) / SECONDS_PER_DAY;
  const semiMajorAxisKm = Math.cbrt(EARTH_MU_KM3_S2 / meanMotionRadPerSecond ** 2);

  return Math.max(0, Math.round(semiMajorAxisKm - EARTH_RADIUS_KM));
}

function getOrbitRegion(altitudeKm: number): OrbitRegion {
  if (altitudeKm < 2000) {
    return 'LEO';
  }

  if (altitudeKm >= 34000 && altitudeKm <= 38000) {
    return 'GEO';
  }

  if (altitudeKm < 34000) {
    return 'MEO';
  }

  return 'HEO';
}

function getLaunchYear(line1: string) {
  const internationalDesignator = line1.slice(9, 17).trim();
  const yearFragment = internationalDesignator.slice(0, 2);

  if (!/^\d{2}$/.test(yearFragment)) {
    return undefined;
  }

  const year = Number(yearFragment);

  return year >= 57 ? 1900 + year : 2000 + year;
}

function getCatalogNumber(line1: string) {
  const match = line1.match(/^1\s+(\d{1,9})/);

  return match?.[1] ?? line1.slice(2, 7).trim();
}

function getObjectType(name: string): OrbitalObjectType {
  const normalizedName = name.toUpperCase();

  if (normalizedName.includes('DEB') || normalizedName.includes('DEBRIS')) {
    return 'debris';
  }

  if (normalizedName.includes('R/B') || normalizedName.includes('ROCKET BODY')) {
    return 'rocket_body';
  }

  return 'satellite';
}

function getObjectStatus(type: OrbitalObjectType): OrbitalObjectStatus {
  if (type === 'debris') {
    return 'fragment';
  }

  if (type === 'rocket_body') {
    return 'inactive';
  }

  return 'active';
}

export function parseTleText(text: string): ParsedTleSet[] {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const sets: ParsedTleSet[] = [];

  for (let index = 0; index < lines.length; index += 3) {
    const name = lines[index];
    const line1 = lines[index + 1];
    const line2 = lines[index + 2];

    if (!name || !line1?.startsWith('1 ') || !line2?.startsWith('2 ')) {
      continue;
    }

    const line2Parts = line2.split(/\s+/);
    const inclinationDeg = Number(line2Parts[2]);
    const meanMotionRevPerDay = Number(line2Parts[7]);
    const altitudeKm = estimateAltitudeKm(meanMotionRevPerDay);

    sets.push({
      altitudeKm,
      catalogNumber: getCatalogNumber(line1),
      inclinationDeg: Number.isFinite(inclinationDeg) ? inclinationDeg : undefined,
      launchYear: getLaunchYear(line1),
      line1,
      line2,
      meanMotionRevPerDay: Number.isFinite(meanMotionRevPerDay)
        ? meanMotionRevPerDay
        : undefined,
      name,
      orbitRegion: getOrbitRegion(altitudeKm),
    });
  }

  return sets;
}

export function tleSetToOrbitalObject(tleSet: ParsedTleSet): OrbitalObject {
  const type = getObjectType(tleSet.name);

  return {
    altitudeKm: tleSet.altitudeKm,
    dataConfidence: 'confirmed',
    id: `celestrak-${tleSet.catalogNumber}`,
    inclinationDeg: tleSet.inclinationDeg,
    launchYear: tleSet.launchYear,
    name: tleSet.name,
    noradId: tleSet.catalogNumber,
    orbitRegion: tleSet.orbitRegion,
    status: getObjectStatus(type),
    summary:
      'Conjunto público GP do CelesTrak. A altitude é aproximada a partir do movimento médio do TLE para o mapa e o modelo de pontuação do MVP.',
    type,
  };
}
