import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors, radius, spacing, typography, useKesslerTheme } from '@/theme';

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'simulated';

type BadgeProps = {
  label: string;
  reason?: string;
  score?: number;
  style?: StyleProp<ViewStyle>;
  tone?: BadgeTone;
};

export function Badge({ label, reason, score, style, tone = 'neutral' }: BadgeProps) {
  const theme = useKesslerTheme();
  const toneStyle = toneStyles[tone];

  return (
    <View style={[styles.base, toneStyle, style]}>
      <View style={styles.row}>
        {typeof score === 'number' && (
          <Text style={[styles.score, { color: theme.colors.text.primary }]}>{score}</Text>
        )}
        <Text style={[styles.label, { color: theme.colors.text.primary }]}>{label}</Text>
      </View>
      {reason && <Text style={[styles.reason, { color: theme.colors.text.secondary }]}>{reason}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing[1],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing[2],
  },
  score: {
    ...typography.h3,
    color: colors.text.primary,
  },
  label: {
    ...typography.caption,
    color: colors.text.primary,
    textTransform: 'uppercase',
  },
  reason: {
    ...typography.caption,
    color: colors.text.secondary,
    maxWidth: 280,
  },
});

const toneStyles = StyleSheet.create({
  neutral: {
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
    borderColor: colors.border.subtle,
  },
  info: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  success: {
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  warning: {
    backgroundColor: 'rgba(245, 158, 11, 0.13)',
    borderColor: 'rgba(245, 158, 11, 0.32)',
  },
  danger: {
    backgroundColor: 'rgba(239, 68, 68, 0.13)',
    borderColor: 'rgba(239, 68, 68, 0.32)',
  },
  simulated: {
    backgroundColor: 'rgba(139, 92, 246, 0.14)',
    borderColor: 'rgba(139, 92, 246, 0.32)',
  },
});
