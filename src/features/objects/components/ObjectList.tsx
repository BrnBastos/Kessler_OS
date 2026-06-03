import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui';
import { ScoredOrbitalObject } from '@/domain/scoring';
import { colors, spacing, typography } from '@/theme';

import { ObjectCard } from './ObjectCard';

type ObjectListProps = {
  objects: ScoredOrbitalObject[];
  onOpenPassport: (object: ScoredOrbitalObject) => void;
  onSelectObject: (object: ScoredOrbitalObject) => void;
  selectedObjectId?: string;
};

export function ObjectList({
  objects,
  onOpenPassport,
  onSelectObject,
  selectedObjectId,
}: ObjectListProps) {
  if (objects.length === 0) {
    return (
      <Card style={styles.emptyCard}>
        <Text style={styles.emptyTitle}>Nenhum objeto combina com estes filtros.</Text>
        <Text style={styles.emptyBody}>
          Limpe os filtros ou escolha uma região orbital mais ampla para continuar explorando.
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
          onOpenPassport={onOpenPassport}
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
