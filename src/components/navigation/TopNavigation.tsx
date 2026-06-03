import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { navigationItems, type NavigationItem } from './navigation-items';
import { ThemeModeToggle } from './ThemeModeToggle';

import { colors, layout, radius, spacing, typography, useKesslerTheme } from '@/theme';

function isRouteActive(pathname: string, item: NavigationItem) {
  return item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
}

export function TopNavigation() {
  const pathname = usePathname();
  const theme = useKesslerTheme();

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.safeArea,
        {
          backgroundColor: theme.colors.background.app,
          borderBottomColor: theme.colors.border.subtle,
        },
      ]}>
      <View style={styles.container}>
        <Pressable
          accessibilityRole="link"
          onPress={() => router.push('/')}
          style={({ pressed }) => [styles.brand, pressed && styles.pressed]}>
          <Text style={[styles.brandText, { color: theme.colors.text.primary }]}>Kessler OS</Text>
          <Text style={[styles.brandSubtext, { color: theme.colors.text.muted }]}>
            Inteligência orbital
          </Text>
        </Pressable>

        <View style={styles.navItems}>
          {navigationItems.map((item) => {
            const active = isRouteActive(pathname, item);

            return (
              <Pressable
                accessibilityLabel={item.description}
                accessibilityRole="link"
                key={item.href}
                onPress={() => router.push(item.href)}
                style={({ pressed }) => [
                  styles.navItem,
                  active && [
                    styles.navItemActive,
                    {
                      backgroundColor: theme.colors.background.surfaceElevated,
                      borderColor: theme.colors.border.strong,
                    },
                  ],
                  pressed && styles.pressed,
                ]}>
                <Text
                  style={[
                    styles.navLabel,
                    { color: active ? theme.colors.text.primary : theme.colors.text.muted },
                  ]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
          <ThemeModeToggle />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background.app,
    borderBottomColor: colors.border.subtle,
    borderBottomWidth: 1,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    gap: spacing[6],
    maxWidth: layout.maxContentWidth,
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[4],
    width: '100%',
  },
  brand: {
    gap: spacing[1],
    marginRight: 'auto',
  },
  brandText: {
    ...typography.h3,
    color: colors.text.primary,
  },
  brandSubtext: {
    ...typography.caption,
    color: colors.text.muted,
  },
  navItems: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing[2],
  },
  navItem: {
    borderColor: 'transparent',
    borderRadius: radius.pill,
    borderWidth: 1,
    minHeight: 44,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  navItemActive: {
    backgroundColor: colors.background.surfaceElevated,
    borderColor: colors.border.strong,
  },
  navLabel: {
    ...typography.bodySmall,
    color: colors.text.muted,
    fontWeight: '600',
  },
  navLabelActive: {
    color: colors.text.primary,
  },
  pressed: {
    opacity: 0.72,
  },
});
