import { SymbolView } from 'expo-symbols';
import { router, usePathname } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { navigationItems, type NavigationItem } from './navigation-items';
import { ThemeModeToggle } from './ThemeModeToggle';

import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, radius, spacing, typography, useKesslerTheme } from '@/theme';

function isRouteActive(pathname: string, item: NavigationItem) {
  return item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
}

export function BottomTabs() {
  const pathname = usePathname();
  const { width } = useBreakpoint();
  const theme = useKesslerTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleItemCount = width < 380 ? 3 : width < 560 ? 4 : width < 720 ? 5 : 6;
  const visibleItems = useMemo(
    () => navigationItems.slice(0, visibleItemCount),
    [visibleItemCount]
  );
  const overflowItems = useMemo(
    () => navigationItems.slice(visibleItemCount),
    [visibleItemCount]
  );
  const hasOverflow = overflowItems.length > 0;
  const overflowActive = overflowItems.some((item) => isRouteActive(pathname, item));

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function handleNavigate(item: NavigationItem) {
    setMenuOpen(false);
    router.push(item.href);
  }

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[
        styles.safeArea,
        {
          backgroundColor: theme.colors.background.app,
          borderTopColor: theme.colors.border.subtle,
        },
      ]}>
      {menuOpen && hasOverflow && (
        <View
          style={[
            styles.menuPanel,
            {
              backgroundColor: theme.colors.background.surfaceElevated,
              borderColor: theme.colors.border.strong,
            },
          ]}>
          <View style={styles.menuGrid}>
            {overflowItems.map((item) => {
              const active = isRouteActive(pathname, item);

              return (
                <Pressable
                  accessibilityLabel={item.description}
                  accessibilityRole="link"
                  key={item.href}
                  onPress={() => handleNavigate(item)}
                  style={({ pressed }) => [
                    styles.menuItem,
                    {
                      backgroundColor: active
                        ? theme.colors.background.surfaceSoft
                        : theme.colors.background.surface,
                      borderColor: active ? theme.colors.border.strong : theme.colors.border.subtle,
                    },
                    pressed && styles.pressed,
                  ]}>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.menuLabel,
                      { color: active ? theme.colors.text.primary : theme.colors.text.secondary },
                    ]}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <ThemeModeToggle />
        </View>
      )}

      <View style={[styles.container, { backgroundColor: theme.colors.background.surface }]}>
        <View style={styles.tabs}>
          {visibleItems.map((item) => {
            const active = isRouteActive(pathname, item);

            return (
              <Pressable
                accessibilityLabel={item.description}
                accessibilityRole="link"
                key={item.href}
                onPress={() => handleNavigate(item)}
                style={({ pressed }) => [
                  styles.tab,
                  active && [
                    styles.tabActive,
                    {
                      backgroundColor: theme.colors.background.surfaceElevated,
                      borderColor: theme.colors.border.strong,
                    },
                  ],
                  pressed && styles.pressed,
                ]}>
                <View
                  style={[
                    styles.indicator,
                    active && [styles.indicatorActive, { backgroundColor: theme.colors.accent.cyan }],
                  ]}
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.label,
                    { color: active ? theme.colors.text.primary : theme.colors.text.muted },
                  ]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
          {hasOverflow && (
            <Pressable
              accessibilityLabel={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              accessibilityRole="button"
              accessibilityState={{ expanded: menuOpen }}
              onPress={() => setMenuOpen((current) => !current)}
              style={({ pressed }) => [
                styles.tab,
                styles.menuButton,
                (menuOpen || overflowActive) && [
                  styles.tabActive,
                  {
                    backgroundColor: theme.colors.background.surfaceElevated,
                    borderColor: theme.colors.border.strong,
                  },
                ],
                pressed && styles.pressed,
              ]}>
              <View
                style={[
                  styles.indicator,
                  (menuOpen || overflowActive) && [
                    styles.indicatorActive,
                    { backgroundColor: theme.colors.accent.cyan },
                  ],
                ]}
              />
              <SymbolView
                name={{ android: 'menu', ios: 'line.3.horizontal', web: 'menu' }}
                size={18}
                tintColor={(menuOpen || overflowActive) ? theme.colors.text.primary : theme.colors.text.muted}
                weight="bold"
                style={styles.menuIcon}
              />
            </Pressable>
          )}
        </View>
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
  menuPanel: {
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing[3],
    marginBottom: spacing[2],
    marginHorizontal: spacing[3],
    padding: spacing[3],
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  menuItem: {
    borderRadius: radius.md,
    borderWidth: 1,
    flexBasis: 142,
    flexGrow: 1,
    minHeight: 44,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
  },
  menuLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '700',
  },
  tabs: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  tab: {
    alignItems: 'center',
    borderColor: 'transparent',
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing[1],
    flex: 1,
    justifyContent: 'center',
    minHeight: 54,
    minWidth: 0,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[2],
  },
  menuButton: {
    flex: 0.72,
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
    maxWidth: '100%',
    textAlign: 'center',
  },
  labelActive: {
    color: colors.text.primary,
  },
  pressed: {
    opacity: 0.72,
  },
  menuIcon: {
    height: 18,
    width: 18,
  },
});
