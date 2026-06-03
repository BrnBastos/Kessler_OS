import { OrbitalObject } from '@/domain/models';

import { parseTleText, tleSetToOrbitalObject } from './tle-parser';

const CELESTRAK_GP_ENDPOINT = 'https://celestrak.org/NORAD/elements/gp.php';
const DEFAULT_CATALOG_NUMBERS = ['27386', '24946', '20580'];
const DEFAULT_CACHE_TTL_MS = 2 * 60 * 60 * 1000;
const DEFAULT_TIMEOUT_MS = 8000;

type CelesTrakCacheEntry = {
  expiresAt: number;
  key: string;
  result: CelesTrakFetchResult;
};

export type CelesTrakFetchOptions = {
  cacheTtlMs?: number;
  catalogNumbers?: string[];
  timeoutMs?: number;
};

export type CelesTrakFetchResult = {
  failedCatalogNumbers: string[];
  fetchedAt: string;
  fromCache: boolean;
  objects: OrbitalObject[];
  sourceUrls: string[];
};

let cacheEntry: CelesTrakCacheEntry | undefined;

function buildGpTleUrl(catalogNumber: string) {
  const url = new URL(CELESTRAK_GP_ENDPOINT);
  url.searchParams.set('CATNR', catalogNumber);
  url.searchParams.set('FORMAT', 'TLE');

  return url.toString();
}

async function fetchTextWithTimeout(url: string, timeoutMs: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`CelesTrak retornou HTTP ${response.status}`);
    }

    return await response.text();
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchObjectByCatalogNumber(catalogNumber: string, timeoutMs: number) {
  const sourceUrl = buildGpTleUrl(catalogNumber);
  const tleText = await fetchTextWithTimeout(sourceUrl, timeoutMs);
  const objects = parseTleText(tleText).map(tleSetToOrbitalObject);

  return {
    objects,
    sourceUrl,
  };
}

export async function fetchCelesTrakOrbitalObjects(
  options: CelesTrakFetchOptions = {}
): Promise<CelesTrakFetchResult> {
  const catalogNumbers = options.catalogNumbers ?? DEFAULT_CATALOG_NUMBERS;
  const cacheTtlMs = options.cacheTtlMs ?? DEFAULT_CACHE_TTL_MS;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const cacheKey = catalogNumbers.join(',');
  const now = Date.now();

  if (cacheEntry && cacheEntry.key === cacheKey && cacheEntry.expiresAt > now) {
    return {
      ...cacheEntry.result,
      fromCache: true,
    };
  }

  const settledResults = await Promise.allSettled(
    catalogNumbers.map((catalogNumber) => fetchObjectByCatalogNumber(catalogNumber, timeoutMs))
  );
  const successfulResults = settledResults.flatMap((result) =>
    result.status === 'fulfilled' ? [result.value] : []
  );
  const failedCatalogNumbers = settledResults.flatMap((result, index) =>
    result.status === 'rejected' ? [catalogNumbers[index]] : []
  );
  const objects = successfulResults.flatMap((result) => result.objects);

  if (objects.length === 0) {
    throw new Error('CelesTrak não retornou dados TLE utilizáveis para os números de catálogo configurados.');
  }

  const result: CelesTrakFetchResult = {
    failedCatalogNumbers,
    fetchedAt: new Date().toISOString(),
    fromCache: false,
    objects,
    sourceUrls: successfulResults.map((resultItem) => resultItem.sourceUrl),
  };

  cacheEntry = {
    expiresAt: now + cacheTtlMs,
    key: cacheKey,
    result,
  };

  return result;
}
