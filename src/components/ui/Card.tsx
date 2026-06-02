import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors, radius, shadows, spacing } from '@/theme';

type CardVariant = 'default' | 'feature' | 'metric' | 'score' | 'action';

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: CardVariant;
};

export function Card({ children, style, variant = 'default' }: CardProps) {
  return <View style={[styles.base, styles[variant], style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.background.surfaceElevated,
    borderColor: colors.border.subtle,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing[5],
    ...shadows.card,
  },
  default: {},
  feature: {
    backgroundColor: colors.background.surface,
    minHeight: 152,
  },
  metric: {
    backgroundColor: colors.background.surfaceSoft,
    minHeight: 112,
  },
  score: {
    borderColor: colors.border.strong,
  },
  action: {
    borderColor: 'rgba(34, 211, 238, 0.28)',
  },
});
