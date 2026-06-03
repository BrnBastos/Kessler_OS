import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors, spacing, typography, useKesslerTheme } from '@/theme';

import { Card } from './Card';

type MetricTone = 'blue' | 'cyan' | 'teal' | 'warning' | 'danger';

type MetricProps = {
  detail?: string;
  label: string;
  style?: StyleProp<ViewStyle>;
  tone?: MetricTone;
  value: string;
};

export function Metric({ detail, label, style, tone = 'cyan', value }: MetricProps) {
  const theme = useKesslerTheme();

  return (
    <Card variant="metric" style={[styles.card, style]}>
      <View style={[styles.marker, markerStyles[tone]]} />
      <Text style={[styles.value, { color: theme.colors.text.primary }]}>{value}</Text>
      <Text style={[styles.label, { color: theme.colors.text.secondary }]}>{label}</Text>
      {detail && <Text style={[styles.detail, { color: theme.colors.text.muted }]}>{detail}</Text>}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing[2],
  },
  marker: {
    borderRadius: 999,
    height: 3,
    width: 44,
  },
  value: {
    ...typography.h2,
    color: colors.text.primary,
  },
  label: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  detail: {
    ...typography.caption,
    color: colors.text.muted,
  },
});

const markerStyles = StyleSheet.create({
  blue: {
    backgroundColor: colors.chart.blue,
  },
  cyan: {
    backgroundColor: colors.chart.cyan,
  },
  teal: {
    backgroundColor: colors.chart.teal,
  },
  warning: {
    backgroundColor: colors.semantic.warning,
  },
  danger: {
    backgroundColor: colors.semantic.danger,
  },
});
