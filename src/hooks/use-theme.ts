import { useKesslerTheme } from '@/theme';

export function useTheme() {
  const theme = useKesslerTheme();

  return {
    background: theme.colors.background.app,
    backgroundElement: theme.colors.background.surface,
    backgroundSelected: theme.colors.background.surfaceSoft,
    text: theme.colors.text.primary,
    textSecondary: theme.colors.text.secondary,
  };
}
