import { DataConfidence, OrbitalObjectType } from './orbital-object';

export type ReuseMaterialCategory = 'aluminum' | 'titanium' | 'composite' | 'electronics' | 'unknown';
export type ReusePotential = 'low' | 'medium' | 'high';
export type ReusePath = 'repair' | 'refuel' | 'recycle' | 'deorbit';

export interface ReuseMaterialEstimate {
  dataConfidence: DataConfidence;
  estimatedSharePct: number;
  id: string;
  material: ReuseMaterialCategory;
  notes: string;
  objectType: OrbitalObjectType;
  potential: ReusePotential;
  preferredPath: ReusePath;
}
