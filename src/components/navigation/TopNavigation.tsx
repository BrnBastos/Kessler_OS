import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { navigationItems, type NavigationItem } from './navigation-items';

import { colors, layout, radius, spacing, typography } from '@/theme';

function isRouteActive(pathname: string, item: NavigationItem) {
  return item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
}

export function TopNavigation() {
  const pathname = usePathname();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable
          accessibilityRole="link"
          onPress={() => router.push('/')}
          style={({ pressed }) => [styles.brand, pressed && styles.pressed]}>
          <Text style={styles.brandText}>Kessler OS</Text>
          <Text style={styles.brandSubtext}>Orbital intelligence</Text>
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
                  active && styles.navItemActive,
                  pressed && styles.pressed,
                ]}>
                <Text style={[styles.navLabel, active && styles.navLabelActive]}>{item.label}</Text>
              </Pressable>
            );
          })}
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
