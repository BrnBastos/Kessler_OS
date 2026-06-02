export const colors = {
  background: {
    app: '#030712',
    surface: '#07111F',
    surfaceElevated: '#0B1628',
    surfaceSoft: '#101C2F',
  },
  border: {
    subtle: 'rgba(148, 163, 184, 0.16)',
    strong: 'rgba(148, 163, 184, 0.28)',
  },
  text: {
    primary: '#F8FAFC',
    secondary: '#CBD5E1',
    muted: '#94A3B8',
    disabled: '#64748B',
  },
  accent: {
    blue: '#2563EB',
    blueBright: '#3B82F6',
    cyan: '#22D3EE',
    teal: '#14B8A6',
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

export const colorModes = {
  dark: {
    text: colors.text.primary,
    background: colors.background.app,
    backgroundElement: colors.background.surface,
    backgroundSelected: colors.background.surfaceSoft,
    textSecondary: colors.text.secondary,
  },
  light: {
    text: colors.text.primary,
    background: colors.background.app,
    backgroundElement: colors.background.surface,
    backgroundSelected: colors.background.surfaceSoft,
    textSecondary: colors.text.secondary,
  },
} as const;
