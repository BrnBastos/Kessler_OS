import { SymbolView } from 'expo-symbols';
import { ReactNode, useState } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { radius, spacing, typography, useKesslerTheme } from '@/theme';

type DisclosureSectionProps = {
  children: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  defaultExpanded?: boolean;
  expandedLabel?: string;
  collapsedLabel?: string;
  style?: StyleProp<ViewStyle>;
  title: string;
};

export function DisclosureSection({
  children,
  collapsedLabel = 'Exibir',
  contentStyle,
  defaultExpanded = false,
  expandedLabel = 'Ocultar',
  style,
  title,
}: DisclosureSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const theme = useKesslerTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.surface,
          borderColor: theme.colors.border.subtle,
        },
        style,
      ]}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={() => setExpanded((current) => !current)}
        style={({ pressed }) => [styles.header, pressed && styles.pressed]}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>{title}</Text>
        <View style={styles.action}>
          <Text style={[styles.actionLabel, { color: theme.colors.accent.cyan }]}>
            {expanded ? expandedLabel : collapsedLabel}
          </Text>
          <SymbolView
            name={{ android: 'chevron_right', ios: 'chevron.right', web: 'chevron_right' }}
            size={16}
            tintColor={theme.colors.accent.cyan}
            weight="bold"
            style={[
              styles.arrowIcon,
              expanded && styles.arrowExpanded,
            ]}
          />
        </View>
      </Pressable>

      {expanded && <View style={[styles.content, contentStyle]}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing[3],
    justifyContent: 'space-between',
    minHeight: 48,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  title: {
    ...typography.bodySmall,
    flex: 1,
    fontWeight: '700',
  },
  action: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing[2],
  },
  actionLabel: {
    ...typography.caption,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  arrowIcon: {
    height: 16,
    width: 16,
  },
  arrowExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  content: {
    gap: spacing[4],
    paddingBottom: spacing[4],
    paddingHorizontal: spacing[4],
  },
  pressed: {
    opacity: 0.72,
  },
});
