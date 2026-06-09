import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { useBreakpoint } from '@/hooks/use-breakpoint';
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
  const { isPhone } = useBreakpoint();

  return (
    <Card variant="metric" style={[styles.card, style]}>
      <View style={[styles.marker, isPhone && styles.markerPhone, markerStyles[tone]]} />
      <Text style={[styles.value, isPhone && styles.valuePhone, { color: theme.colors.text.primary }]}>
        {value}
      </Text>
      <Text style={[styles.label, isPhone && styles.labelPhone, { color: theme.colors.text.secondary }]}>
        {label}
      </Text>
      {detail && (
        <Text
          numberOfLines={isPhone ? 2 : undefined}
          style={[styles.detail, isPhone && styles.detailPhone, { color: theme.colors.text.muted }]}>
          {detail}
        </Text>
      )}
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
  markerPhone: {
    width: 34,
  },
  value: {
    ...typography.h2,
    color: colors.text.primary,
  },
  valuePhone: {
    fontSize: 24,
    lineHeight: 30,
  },
  label: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  labelPhone: {
    fontSize: 13,
    lineHeight: 17,
  },
  detail: {
    ...typography.caption,
    color: colors.text.muted,
  },
  detailPhone: {
    fontSize: 11,
    lineHeight: 14,
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
