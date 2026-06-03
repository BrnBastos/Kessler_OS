import type { ImageSourcePropType } from 'react-native';

import { visualAssets } from '@/config/visualAssets';
import type { OrbitalObject } from '@/domain/models';

type ObjectVisualTarget = Pick<OrbitalObject, 'status' | 'type'>;

export function getObjectVisualAsset(object: ObjectVisualTarget): ImageSourcePropType {
  if (object.type === 'rocket_body' || object.type === 'unknown') {
    return visualAssets.objects.rocketBody;
  }

  if (object.type === 'debris' || object.status === 'fragment' || object.status === 'inactive') {
    return visualAssets.objects.damagedSatellite;
  }

  return visualAssets.objects.servicingSatellite;
}
