import { DarkTheme, ThemeProvider } from '@react-navigation/native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AppShell } from '@/components/app-shell/AppShell';
import { colors } from '@/theme';

const kesslerNavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background.app,
    border: colors.border.subtle,
    card: colors.background.surface,
    notification: colors.semantic.danger,
    primary: colors.accent.cyan,
    text: colors.text.primary,
  },
} as const;

export default function TabLayout() {
  return (
    <ThemeProvider value={kesslerNavigationTheme}>
      <AnimatedSplashOverlay />
      <AppShell />
    </ThemeProvider>
  );
}
