import { mockOrbitalObjects } from '@/data';
import { OrbitalObject, OrbitalObjectType, OrbitRegion } from '@/domain/models';
import { calculateObjectScores, ScoredOrbitalObject } from '@/domain/scoring';

export type OrbitalObjectRepositoryFilters = {
  orbitRegion?: OrbitRegion | 'all';
  type?: OrbitalObjectType | 'all';
};

function withScores(object: OrbitalObject): ScoredOrbitalObject {
  return {
    ...object,
    scores: calculateObjectScores(object),
  };
}

function matchesFilters(object: OrbitalObject, filters: OrbitalObjectRepositoryFilters = {}) {
  const typeMatches = !filters.type || filters.type === 'all' || object.type === filters.type;
  const orbitMatches =
    !filters.orbitRegion ||
    filters.orbitRegion === 'all' ||
    object.orbitRegion === filters.orbitRegion;

  return typeMatches && orbitMatches;
}

export function listOrbitalObjects(filters: OrbitalObjectRepositoryFilters = {}) {
  return mockOrbitalObjects.filter((object) => matchesFilters(object, filters));
}

export function listScoredOrbitalObjects(filters: OrbitalObjectRepositoryFilters = {}) {
  return listOrbitalObjects(filters).map(withScores);
}

export function getOrbitalObjectById(id: string) {
  return mockOrbitalObjects.find((object) => object.id === id);
}

export function getScoredOrbitalObjectById(id: string) {
  const object = getOrbitalObjectById(id);

  return object ? withScores(object) : undefined;
}
