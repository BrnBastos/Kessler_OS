export const colors = {
  background: {
    app: '#020617',
    surface: '#07111E',
    surfaceElevated: '#0B1728',
    surfaceSoft: '#122033',
    surfaceGlow: 'rgba(14, 165, 233, 0.10)',
  },
  border: {
    subtle: 'rgba(148, 163, 184, 0.18)',
    strong: 'rgba(125, 211, 252, 0.28)',
  },
  text: {
    primary: '#F9FBFF',
    secondary: '#D6E2F0',
    muted: '#9FB3C8',
    disabled: '#64748B',
  },
  accent: {
    blue: '#1D4ED8',
    blueBright: '#60A5FA',
    cyan: '#38E8FF',
    teal: '#2DD4BF',
    violet: '#8B5CF6',
  },
  semantic: {
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#38BDF8',
  },
  chart: {
    blue: '#3B82F6',
    cyan: '#22D3EE',
    teal: '#14B8A6',
    orange: '#F97316',
    red: '#EF4444',
    violet: '#8B5CF6',
  },
} as const;

export const themeColors = {
  background: colors.background.app,
  backgroundElement: colors.background.surface,
  backgroundSelected: colors.background.surfaceSoft,
  text: colors.text.primary,
  textSecondary: colors.text.secondary,
} as const;
