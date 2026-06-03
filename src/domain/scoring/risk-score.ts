import {
  formatDataConfidenceLabel,
  formatObjectStatusLabel,
  formatObjectTypeLabel,
} from '@/content/pt-br';
import { DataConfidence, OrbitalObject, OrbitalObjectStatus, OrbitalObjectType, OrbitRegion } from '@/domain/models';

import { ScoreLevel, ScoreResult } from './score-types';

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getScoreLevel(score: number): ScoreLevel {
  if (score >= 70) {
    return 'high';
  }

  if (score >= 40) {
    return 'medium';
  }

  return 'low';
}

function getOrbitCongestionValue(region: OrbitRegion) {
  const values: Record<OrbitRegion, number> = {
    GEO: 18,
    HEO: 12,
    LEO: 28,
    MEO: 14,
  };

  return values[region];
}

function getStatusValue(status: OrbitalObjectStatus) {
  const values: Record<OrbitalObjectStatus, number> = {
    active: 5,
    fragment: 22,
    inactive: 18,
    unknown: 16,
  };

  return values[status];
}

function getTypeValue(type: OrbitalObjectType) {
  const values: Record<OrbitalObjectType, number> = {
    debris: 20,
    rocket_body: 17,
    satellite: 8,
    unknown: 14,
  };

  return values[type];
}

function getMassValue(massKg?: number) {
  if (typeof massKg !== 'number') {
    return 5;
  }

  if (massKg >= 5000) {
    return 16;
  }

  if (massKg >= 1000) {
    return 12;
  }

  if (massKg >= 100) {
    return 7;
  }

  return 3;
}

function getPersistenceValue(object: OrbitalObject) {
  if (object.orbitRegion === 'LEO' && object.altitudeKm >= 700) {
    return 10;
  }

  if (object.orbitRegion === 'LEO') {
    return 6;
  }

  if (object.orbitRegion === 'GEO') {
    return 8;
  }

  return 5;
}

function getConfidenceValue(confidence: DataConfidence) {
  const values: Record<DataConfidence, number> = {
    confirmed: 0,
    estimated: 4,
    simulated: 8,
    unknown: 10,
  };

  return values[confidence];
}

function getRiskSummary(score: number, object: OrbitalObject) {
  if (score >= 70) {
    return `${object.name} pede alta atenção porque órbita, status, massa ou incerteza aumentam a preocupação operacional.`;
  }

  if (score >= 40) {
    return `${object.name} tem sinais moderados de atenção e deve continuar na fila de revisão.`;
  }

  return `${object.name} tem risco baixo neste modelo simplificado do protótipo.`;
}

export function calculateRiskScore(object: OrbitalObject): ScoreResult {
  const factors = [
    {
      description: `${object.orbitRegion} indica tráfego e persistência orbital no modelo.`,
      label: 'Congestionamento orbital',
      value: getOrbitCongestionValue(object.orbitRegion),
    },
    {
      description: `Status ${formatObjectStatusLabel(object.status)} pode aumentar a incerteza operacional.`,
      label: 'Status do objeto',
      value: getStatusValue(object.status),
    },
    {
      description: `Tipo ${formatObjectTypeLabel(object.type)} afeta o comportamento esperado.`,
      label: 'Tipo do objeto',
      value: getTypeValue(object.type),
    },
    {
      description: 'Objetos maiores podem gerar consequências maiores se houver fragmentação.',
      label: 'Massa estimada',
      value: getMassValue(object.estimatedMassKg),
    },
    {
      description: 'Órbitas mais altas ou duradouras mantêm detritos relevantes por mais tempo.',
      label: 'Persistência',
      value: getPersistenceValue(object),
    },
    {
      description: `${formatDataConfidenceLabel(object.dataConfidence)} adiciona incerteza à estimativa.`,
      label: 'Incerteza dos dados',
      value: getConfidenceValue(object.dataConfidence),
    },
  ];
  const score = clampScore(factors.reduce((total, factor) => total + factor.value, 0));

  return {
    factors,
    level: getScoreLevel(score),
    score,
    summary: getRiskSummary(score, object),
  };
}
