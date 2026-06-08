import { Pressable, StyleSheet, Text, View } from 'react-native';

import { radius, spacing, typography, useKesslerTheme } from '@/theme';

type ThemeModeToggleProps = {
  compact?: boolean;
};

export function ThemeModeToggle({ compact = false }: ThemeModeToggleProps) {
  const theme = useKesslerTheme();
  const nextModeLabel = theme.isLightMode ? 'escuro' : 'claro suave';

  return (
    <Pressable
      accessibilityLabel={`Alternar para modo ${nextModeLabel}`}
      accessibilityRole="switch"
      accessibilityState={{ checked: theme.isLightMode }}
      onPress={theme.toggleMode}
      style={({ pressed }) => [
        styles.toggle,
        compact && styles.toggleCompact,
        {
          backgroundColor: theme.colors.background.surfaceElevated,
          borderColor: theme.colors.border.strong,
        },
        pressed && styles.pressed,
      ]}>
      <View
        style={[
          styles.indicator,
          { backgroundColor: theme.isLightMode ? theme.colors.accent.teal : theme.colors.accent.cyan },
        ]}
      />
      <Text
        numberOfLines={1}
        style={[
          styles.label,
          compact && styles.labelCompact,
          { color: theme.colors.text.primary },
        ]}>
        {theme.isLightMode ? 'Claro' : 'Escuro'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  toggle: {
    alignItems: 'center',
    borderRadius: radius.pill,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing[2],
    minHeight: 44,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  toggleCompact: {
    borderRadius: radius.md,
    justifyContent: 'center',
    minHeight: 56,
    minWidth: 86,
    paddingHorizontal: spacing[3],
  },
  indicator: {
    borderRadius: radius.pill,
    height: 8,
    width: 8,
  },
  label: {
    ...typography.bodySmall,
    fontWeight: '700',
  },
  labelCompact: {
    ...typography.caption,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.72,
  },
});
