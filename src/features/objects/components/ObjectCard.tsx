import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Badge, Card } from '@/components/ui';
import { OrbitalObject } from '@/domain/models';
import { colors, radius, spacing, typography } from '@/theme';

import {
  formatEstimate,
  formatObjectStatus,
  formatObjectType,
  getConfidenceLabel,
  getConfidenceTone,
} from '../object-formatters';

type ObjectCardProps = {
  object: OrbitalObject;
  onSelect: (object: OrbitalObject) => void;
  selected?: boolean;
};

export function ObjectCard({ object, onSelect, selected }: ObjectCardProps) {
  return (
    <Pressable
      accessibilityLabel={`Open details for ${object.name}`}
      accessibilityRole="button"
      onPress={() => onSelect(object)}
      style={({ pressed }) => [pressed && styles.pressed]}>
      <Card style={[styles.card, selected && styles.cardSelected]}>
        <View style={styles.header}>
          <View style={styles.titleGroup}>
            <Text style={styles.name}>{object.name}</Text>
            <Text style={styles.meta}>
              {formatObjectType(object.type)} · {object.orbitRegion} ·{' '}
              {formatObjectStatus(object.status)}
            </Text>
          </View>
          <Badge
            label={getConfidenceLabel(object.dataConfidence)}
            tone={getConfidenceTone(object.dataConfidence)}
          />
        </View>

        <Text style={styles.summary}>{object.summary}</Text>

        <View style={styles.factGrid}>
          <View style={styles.factItem}>
            <Text style={styles.factLabel}>Altitude</Text>
            <Text style={styles.factValue}>{formatEstimate(object.altitudeKm, ' km')}</Text>
          </View>
          <View style={styles.factItem}>
            <Text style={styles.factLabel}>Mass</Text>
            <Text style={styles.factValue}>{formatEstimate(object.estimatedMassKg, ' kg')}</Text>
          </View>
          <View style={styles.factItem}>
            <Text style={styles.factLabel}>Size</Text>
            <Text style={styles.factValue}>{formatEstimate(object.estimatedSizeM, ' m')}</Text>
          </View>
        </View>

        <Text style={styles.detailHint}>{selected ? 'Details open' : 'Tap to open details'}</Text>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.78,
  },
  card: {
    gap: spacing[4],
  },
  cardSelected: {
    borderColor: 'rgba(34, 211, 238, 0.48)',
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  titleGroup: {
    flexShrink: 1,
    gap: spacing[1],
    minWidth: 190,
  },
  name: {
    ...typography.h3,
    color: colors.text.primary,
  },
  meta: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  summary: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  factGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  factItem: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    flexBasis: 112,
    flexGrow: 1,
    gap: spacing[1],
    padding: spacing[3],
  },
  factLabel: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  factValue: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  detailHint: {
    ...typography.caption,
    color: colors.accent.cyan,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
