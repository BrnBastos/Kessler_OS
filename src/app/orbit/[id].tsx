import { useLocalSearchParams } from 'expo-router';

import { ObjectPassportScreen } from '@/features/objects/ObjectPassportScreen';

export default function ObjectPassportRoute() {
  const { id } = useLocalSearchParams<{ id: string | string[] }>();
  const objectId = Array.isArray(id) ? id[0] : id;

  return <ObjectPassportScreen objectId={objectId ?? ''} />;
}
