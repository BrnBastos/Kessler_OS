import { BadgeTone } from '@/components/ui';
import {
  formatDataConfidenceLabel,
  formatObjectStatusLabel,
  formatObjectTypeLabel,
  ptBR,
} from '@/content/pt-br';
import { DataConfidence, OrbitalObjectStatus, OrbitalObjectType, OrbitRegion } from '@/domain/models';
import { ScoreLevel } from '@/domain/scoring';

export function formatObjectType(type: OrbitalObjectType) {
  return formatObjectTypeLabel(type);
}

export function formatObjectStatus(status: OrbitalObjectStatus) {
  return formatObjectStatusLabel(status);
}

export function formatOrbitRegion(region: OrbitRegion) {
  return region;
}

export function formatEstimate(value?: number, suffix = '') {
  if (typeof value !== 'number') {
    return ptBR.common.notAvailable;
  }

  return `${value.toLocaleString('pt-BR')}${suffix}`;
}

export function getConfidenceTone(confidence: DataConfidence): BadgeTone {
  switch (confidence) {
    case 'confirmed':
      return 'success';
    case 'estimated':
      return 'info';
    case 'simulated':
      return 'simulated';
    case 'unknown':
      return 'warning';
  }
}

export function getConfidenceLabel(confidence: DataConfidence) {
  return formatDataConfidenceLabel(confidence);
}

export function getScoreTone(level: ScoreLevel): BadgeTone {
  switch (level) {
    case 'high':
      return 'danger';
    case 'medium':
      return 'warning';
    case 'low':
      return 'info';
  }
}
