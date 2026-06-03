import { mockOrbitalObjects } from '@/data';
import { OrbitalObject, OrbitalObjectType, OrbitRegion } from '@/domain/models';
import { calculateObjectScores, ScoredOrbitalObject } from '@/domain/scoring';
import { fetchCelesTrakOrbitalObjects } from '@/services/celestrak/celestrak-client';

export type OrbitalObjectRepositoryFilters = {
  orbitRegion?: OrbitRegion | 'all';
  type?: OrbitalObjectType | 'all';
};

export type OrbitalObjectRepositoryStatus = {
  error?: string;
  message: string;
  source: 'mock' | 'celestrak';
  updatedAt?: string;
};

export type OrbitalObjectRepositoryLoadResult = {
  objects: ScoredOrbitalObject[];
  status: OrbitalObjectRepositoryStatus;
};

let repositoryObjects: OrbitalObject[] = mockOrbitalObjects;
let repositoryStatus: OrbitalObjectRepositoryStatus = {
  message: 'Catálogo orbital local do protótipo está pronto.',
  source: 'mock',
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

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Erro desconhecido no adaptador';
}

function mergeLiveObjectsWithMocks(liveObjects: OrbitalObject[]) {
  const liveObjectsByNoradId = new Map(
    liveObjects
      .filter((object) => object.noradId)
      .map((object) => [object.noradId as string, object])
  );
  const mockNoradIds = new Set(mockOrbitalObjects.flatMap((object) => object.noradId ?? []));
  const enrichedMocks = mockOrbitalObjects.map((mockObject) => {
    const liveObject = mockObject.noradId ? liveObjectsByNoradId.get(mockObject.noradId) : undefined;

    if (!liveObject) {
      return mockObject;
    }

    return {
      ...mockObject,
      altitudeKm: liveObject.altitudeKm || mockObject.altitudeKm,
      dataConfidence: 'confirmed' as const,
      inclinationDeg: liveObject.inclinationDeg ?? mockObject.inclinationDeg,
      launchYear: liveObject.launchYear ?? mockObject.launchYear,
      summary: `${mockObject.summary} Dados públicos GP do CelesTrak atualizaram a altitude orbital e a inclinação usadas nesta demo.`,
    };
  });
  const liveOnlyObjects = liveObjects
    .filter((object) => object.noradId && !mockNoradIds.has(object.noradId))
    .slice(0, 4);

  return [...enrichedMocks, ...liveOnlyObjects];
}

export function listOrbitalObjects(filters: OrbitalObjectRepositoryFilters = {}) {
  return repositoryObjects.filter((object) => matchesFilters(object, filters));
}

export function listScoredOrbitalObjects(filters: OrbitalObjectRepositoryFilters = {}) {
  return listOrbitalObjects(filters).map(withScores);
}

export function getOrbitalObjectById(id: string) {
  return repositoryObjects.find((object) => object.id === id);
}

export function getScoredOrbitalObjectById(id: string) {
  const object = getOrbitalObjectById(id);

  return object ? withScores(object) : undefined;
}

export function getOrbitalObjectRepositoryStatus() {
  return repositoryStatus;
}

export async function refreshOrbitalObjectRepository() {
  try {
    const celesTrakResult = await fetchCelesTrakOrbitalObjects();
    repositoryObjects = mergeLiveObjectsWithMocks(celesTrakResult.objects);
    repositoryStatus = {
      message: celesTrakResult.fromCache
        ? 'Usando dados públicos GP do CelesTrak em cache com metadados locais do domínio.'
        : 'Usando dados públicos GP do CelesTrak com metadados locais do domínio.',
      source: 'celestrak',
      updatedAt: celesTrakResult.fetchedAt,
    };
  } catch (error) {
    repositoryObjects = mockOrbitalObjects;
    repositoryStatus = {
      error: getErrorMessage(error),
      message: 'Dados orbitais externos estavam indisponíveis, então o app manteve o catálogo local do protótipo.',
      source: 'mock',
    };
  }

  return repositoryStatus;
}

export async function loadScoredOrbitalObjects(
  filters: OrbitalObjectRepositoryFilters = {}
): Promise<OrbitalObjectRepositoryLoadResult> {
  await refreshOrbitalObjectRepository();

  return {
    objects: listScoredOrbitalObjects(filters),
    status: repositoryStatus,
  };
}
