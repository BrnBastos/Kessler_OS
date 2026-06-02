import { BadgeTone } from '@/components/ui';
import { DataConfidence, OrbitalObjectStatus, OrbitalObjectType, OrbitRegion } from '@/domain/models';
import { ScoreLevel } from '@/domain/scoring';

export function formatObjectType(type: OrbitalObjectType) {
  return type.replace('_', ' ');
}

export function formatObjectStatus(status: OrbitalObjectStatus) {
  return status;
}

export function formatOrbitRegion(region: OrbitRegion) {
  return region;
}

export function formatEstimate(value?: number, suffix = '') {
  if (typeof value !== 'number') {
    return 'Unknown';
  }

  return `${value.toLocaleString()}${suffix}`;
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
  switch (confidence) {
    case 'confirmed':
      return 'Confirmed public data';
    case 'estimated':
      return 'System estimate';
    case 'simulated':
      return 'Simulated';
    case 'unknown':
      return 'Unknown';
  }
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
