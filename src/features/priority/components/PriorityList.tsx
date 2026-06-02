import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui';
import { ScoredOrbitalObject } from '@/domain/scoring';
import { colors, spacing, typography } from '@/theme';

import { PriorityItem } from './PriorityItem';

type PriorityListProps = {
  objects: ScoredOrbitalObject[];
};

export function PriorityList({ objects }: PriorityListProps) {
  if (objects.length === 0) {
    return (
      <Card style={styles.emptyCard}>
        <Text style={styles.emptyTitle}>No priority items match these filters.</Text>
        <Text style={styles.emptyBody}>
          Reset the filters or choose a broader decision category to rebuild the queue.
        </Text>
      </Card>
    );
  }

  return (
    <View style={styles.list}>
      {objects.map((object, index) => (
        <PriorityItem key={object.id} object={object} rank={index + 1} />
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
