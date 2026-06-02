import { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors, spacing, typography } from '@/theme';

type SectionHeaderProps = {
  action?: ReactNode;
  description?: string;
  eyebrow?: string;
  style?: StyleProp<ViewStyle>;
  title: string;
};

export function SectionHeader({ action, description, eyebrow, style, title }: SectionHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.copy}>
        {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing[4],
    justifyContent: 'space-between',
  },
  copy: {
    flex: 1,
    gap: spacing[2],
  },
  eyebrow: {
    ...typography.caption,
    color: colors.accent.cyan,
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
  },
  description: {
    ...typography.body,
    color: colors.text.secondary,
    maxWidth: 680,
  },
});
