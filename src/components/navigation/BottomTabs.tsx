import { router, usePathname } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { navigationItems, type NavigationItem } from './navigation-items';

import { colors, radius, spacing, typography } from '@/theme';

function isRouteActive(pathname: string, item: NavigationItem) {
  return item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
}

export function BottomTabs() {
  const pathname = usePathname();

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {navigationItems.map((item) => {
            const active = isRouteActive(pathname, item);

            return (
              <Pressable
                accessibilityLabel={item.description}
                accessibilityRole="link"
                key={item.href}
                onPress={() => router.push(item.href)}
                style={({ pressed }) => [
                  styles.tab,
                  active && styles.tabActive,
                  pressed && styles.pressed,
                ]}>
                <View style={[styles.indicator, active && styles.indicatorActive]} />
                <Text style={[styles.label, active && styles.labelActive]}>{item.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background.app,
    borderTopColor: colors.border.subtle,
    borderTopWidth: 1,
  },
  container: {
    backgroundColor: colors.background.surface,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  scrollContent: {
    gap: spacing[2],
  },
  tab: {
    alignItems: 'center',
    borderColor: 'transparent',
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing[1],
    justifyContent: 'center',
    minHeight: 56,
    minWidth: 86,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  tabActive: {
    backgroundColor: colors.background.surfaceElevated,
    borderColor: colors.border.strong,
  },
  indicator: {
    backgroundColor: 'transparent',
    borderRadius: radius.pill,
    height: 3,
    width: 26,
  },
  indicatorActive: {
    backgroundColor: colors.accent.cyan,
  },
  label: {
    ...typography.caption,
    color: colors.text.muted,
  },
  labelActive: {
    color: colors.text.primary,
  },
  pressed: {
    opacity: 0.72,
  },
});
