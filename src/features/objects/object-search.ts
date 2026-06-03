import { ScoredOrbitalObject } from '@/domain/scoring';

import { formatObjectStatus, formatObjectType } from './object-formatters';

function normalizeSearchText(value: string | number | undefined) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function objectMatchesSearch(object: ScoredOrbitalObject, query: string) {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return true;
  }

  const searchableText = [
    object.id,
    object.name,
    object.noradId,
    object.orbitRegion,
    object.launchYear,
    object.summary,
    formatObjectType(object.type),
    formatObjectStatus(object.status),
    object.scores.priority.decision,
  ]
    .map(normalizeSearchText)
    .join(' ');

  return searchableText.includes(normalizedQuery);
}
