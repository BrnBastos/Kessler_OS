export type OrbitalObjectType = 'satellite' | 'rocket_body' | 'debris' | 'unknown';
export type OrbitRegion = 'LEO' | 'MEO' | 'GEO' | 'HEO';
export type DataConfidence = 'confirmed' | 'estimated' | 'unknown' | 'simulated';
export type OrbitalObjectStatus = 'active' | 'inactive' | 'fragment' | 'unknown';

export interface OrbitalObject {
  altitudeKm: number;
  dataConfidence: DataConfidence;
  estimatedMassKg?: number;
  estimatedSizeM?: number;
  id: string;
  inclinationDeg?: number;
  launchYear?: number;
  name: string;
  noradId?: string;
  orbitRegion: OrbitRegion;
  status: OrbitalObjectStatus;
  summary: string;
  type: OrbitalObjectType;
}
