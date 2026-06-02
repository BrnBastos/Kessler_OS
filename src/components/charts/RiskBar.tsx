import { StyleSheet, Text, View, type DimensionValue } from 'react-native';

import { ScoreFactor } from '@/domain/scoring';
import { colors, radius, spacing, typography } from '@/theme';

type RiskBarProps = {
  factors: ScoreFactor[];
};

function getWidthPercent(value: number): DimensionValue {
  return `${Math.max(8, Math.min(100, Math.abs(value) * 3.4))}%`;
}

export function RiskBar({ factors }: RiskBarProps) {
  return (
    <View style={styles.container}>
      {factors.map((factor) => (
        <View key={factor.label} style={styles.row}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>{factor.label}</Text>
            <Text style={[styles.value, factor.value < 0 && styles.negativeValue]}>
              {factor.value > 0 ? '+' : ''}
              {factor.value}
            </Text>
          </View>
          <View style={styles.track}>
            <View
              style={[
                styles.fill,
                factor.value < 0 && styles.negativeFill,
                { width: getWidthPercent(factor.value) },
              ]}
            />
          </View>
          <Text style={styles.description}>{factor.description}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
  row: {
    gap: spacing[2],
  },
  labelRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  label: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  value: {
    ...typography.caption,
    color: colors.semantic.warning,
  },
  negativeValue: {
    color: colors.accent.teal,
  },
  track: {
    backgroundColor: colors.background.surface,
    borderRadius: radius.pill,
    height: 8,
    overflow: 'hidden',
  },
  fill: {
    backgroundColor: colors.semantic.warning,
    borderRadius: radius.pill,
    height: '100%',
  },
  negativeFill: {
    backgroundColor: colors.accent.teal,
  },
  description: {
    ...typography.caption,
    color: colors.text.muted,
  },
});
