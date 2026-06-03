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

function getMassValue(massKg?: number) {
  if (typeof massKg !== 'number') {
    return 8;
  }

  if (massKg >= 5000) {
    return 26;
  }

  if (massKg >= 1000) {
    return 22;
  }

  if (massKg >= 100) {
    return 14;
  }

  return 6;
}

function getTypeUtilityValue(type: OrbitalObjectType) {
  const values: Record<OrbitalObjectType, number> = {
    debris: 8,
    rocket_body: 18,
    satellite: 20,
    unknown: 5,
  };

  return values[type];
}

function getOrbitAccessibilityValue(region: OrbitRegion) {
  const values: Record<OrbitRegion, number> = {
    GEO: 8,
    HEO: 10,
    LEO: 20,
    MEO: 12,
  };

  return values[region];
}

function getRecoveryStatusValue(status: OrbitalObjectStatus) {
  const values: Record<OrbitalObjectStatus, number> = {
    active: 2,
    fragment: 5,
    inactive: 18,
    unknown: 8,
  };

  return values[status];
}

function getConfidenceValue(confidence: DataConfidence) {
  const values: Record<DataConfidence, number> = {
    confirmed: 14,
    estimated: 11,
    simulated: 7,
    unknown: 3,
  };

  return values[confidence];
}

function getHandlingPenalty(object: OrbitalObject) {
  if (object.status === 'active') {
    return 12;
  }

  if (object.status === 'fragment') {
    return 9;
  }

  if (object.dataConfidence === 'unknown') {
    return 7;
  }

  return 3;
}

function getForgeSummary(score: number, object: OrbitalObject) {
  if (score >= 70) {
    return `${object.name} tem forte potencial simulado de reaproveitamento, mas as hipóteses de material ainda precisam de validação.`;
  }

  if (score >= 40) {
    return `${object.name} pode ter valor de reuso se a inspeção confirmar massa, estrutura e viabilidade de manuseio.`;
  }

  return `${object.name} tem sinal limitado de reuso neste modelo simplificado e pode ser mais adequado para monitoramento ou descarte seguro.`;
}

export function calculateForgeValueScore(object: OrbitalObject): ScoreResult {
  const handlingPenalty = getHandlingPenalty(object);
  const factors = [
    {
      description: 'Massa estimada maior pode aumentar o potencial de material recuperável.',
      label: 'Massa estimada',
      value: getMassValue(object.estimatedMassKg),
    },
    {
      description: `Objetos do tipo ${formatObjectTypeLabel(object.type)} têm utilidade provável diferente para material e componentes.`,
      label: 'Utilidade do objeto',
      value: getTypeUtilityValue(object.type),
    },
    {
      description: `Acesso à região ${object.orbitRegion} afeta as hipóteses práticas de recuperação.`,
      label: 'Acessibilidade orbital',
      value: getOrbitAccessibilityValue(object.orbitRegion),
    },
    {
      description: `Status ${formatObjectStatusLabel(object.status)} afeta se o reuso pode ser considerado.`,
      label: 'Status de recuperação',
      value: getRecoveryStatusValue(object.status),
    },
    {
      description: `${formatDataConfidenceLabel(object.dataConfidence)} muda o grau de confiança das estimativas de reuso.`,
      label: 'Confiança dos dados',
      value: getConfidenceValue(object.dataConfidence),
    },
    {
      description: 'Risco de manuseio reduz valor quando captura ou inspeção são incertas.',
      label: 'Penalidade de manuseio',
      value: -handlingPenalty,
    },
  ];
  const score = clampScore(factors.reduce((total, factor) => total + factor.value, 0));

  return {
    factors,
    level: getScoreLevel(score),
    score,
    summary: getForgeSummary(score, object),
  };
}
