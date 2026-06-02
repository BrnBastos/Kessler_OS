import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui';
import { OrbitalObject } from '@/domain/models';
import { colors, spacing, typography } from '@/theme';

import { ObjectCard } from './ObjectCard';

type ObjectListProps = {
  objects: OrbitalObject[];
  onSelectObject: (object: OrbitalObject) => void;
  selectedObjectId?: string;
};

export function ObjectList({ objects, onSelectObject, selectedObjectId }: ObjectListProps) {
  if (objects.length === 0) {
    return (
      <Card style={styles.emptyCard}>
        <Text style={styles.emptyTitle}>No objects match these filters.</Text>
        <Text style={styles.emptyBody}>
          Reset the filters or choose a broader orbit region to continue exploring.
        </Text>
      </Card>
    );
  }

  return (
    <View style={styles.list}>
      {objects.map((object) => (
        <ObjectCard
          key={object.id}
          object={object}
          onSelect={onSelectObject}
          selected={selectedObjectId === object.id}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing[4],
  },
  emptyCard: {
    gap: spacing[2],
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  emptyBody: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
});
