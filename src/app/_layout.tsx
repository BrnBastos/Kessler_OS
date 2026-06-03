import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AppShell } from '@/components/app-shell/AppShell';
import { KesslerThemeProvider, useKesslerTheme } from '@/theme';

function KesslerNavigationBridge() {
  const { colors, isLightMode } = useKesslerTheme();
  const baseTheme = isLightMode ? DefaultTheme : DarkTheme;
  const kesslerNavigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background: colors.background.app,
      border: colors.border.subtle,
      card: colors.background.surface,
      notification: colors.semantic.danger,
      primary: colors.accent.cyan,
      text: colors.text.primary,
    },
  } as const;

  return (
    <NavigationThemeProvider value={kesslerNavigationTheme}>
      <StatusBar style="light" />
      <AnimatedSplashOverlay />
      <AppShell />
    </NavigationThemeProvider>
  );
}

export default function TabLayout() {
  return (
    <KesslerThemeProvider>
      <KesslerNavigationBridge />
    </KesslerThemeProvider>
  );
}
