import { ReuseMaterialEstimate } from '@/domain/models';

export const mockReuseMaterials: ReuseMaterialEstimate[] = [
  {
    dataConfidence: 'estimated',
    estimatedSharePct: 42,
    id: 'reuse-satellite-aluminum',
    material: 'aluminum',
    notes: 'Common spacecraft structure category for early circular-economy estimates.',
    objectType: 'satellite',
    potential: 'high',
    preferredPath: 'recycle',
  },
  {
    dataConfidence: 'estimated',
    estimatedSharePct: 18,
    id: 'reuse-satellite-electronics',
    material: 'electronics',
    notes: 'Sensitive systems may be more useful for inspection and learning than direct reuse.',
    objectType: 'satellite',
    potential: 'medium',
    preferredPath: 'repair',
  },
  {
    dataConfidence: 'simulated',
    estimatedSharePct: 34,
    id: 'reuse-rocket-body-titanium',
    material: 'titanium',
    notes: 'Upper-stage examples help compare durable materials against deorbit-only decisions.',
    objectType: 'rocket_body',
    potential: 'medium',
    preferredPath: 'recycle',
  },
  {
    dataConfidence: 'unknown',
    estimatedSharePct: 10,
    id: 'reuse-debris-unknown',
    material: 'unknown',
    notes: 'Small fragments should make uncertainty obvious before any reuse claim is shown.',
    objectType: 'debris',
    potential: 'low',
    preferredPath: 'deorbit',
  },
];
