import * as SystemUI from 'expo-system-ui';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { getJsonItem, setJsonItem } from '@/services/persistence/storage';

import { colors } from './colors';

export type ThemeMode = 'dark' | 'light';

type ThemePalette = {
  accent: Record<keyof typeof colors.accent, string>;
  background: Record<keyof typeof colors.background, string>;
  border: Record<keyof typeof colors.border, string>;
  chart: Record<keyof typeof colors.chart, string>;
  semantic: Record<keyof typeof colors.semantic, string>;
  text: Record<keyof typeof colors.text, string>;
};

type KesslerThemeContextValue = {
  colors: ThemePalette;
  isLightMode: boolean;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const THEME_MODE_STORAGE_KEY = 'kessler.themeMode.v1';

const softLightColors: ThemePalette = {
  background: {
    app: '#345B76',
    surface: '#406D8C',
    surfaceElevated: '#4B7A9B',
    surfaceSoft: '#5B8EAD',
    surfaceGlow: 'rgba(186, 230, 253, 0.22)',
  },
  border: {
    subtle: 'rgba(241, 245, 249, 0.28)',
    strong: 'rgba(186, 230, 253, 0.56)',
  },
  text: {
    primary: '#F8FBFF',
    secondary: '#E8F3FC',
    muted: '#D0E0EF',
    disabled: '#A8BBCD',
  },
  accent: {
    blue: '#93C5FD',
    blueBright: '#DBEAFE',
    cyan: '#BAE6FD',
    teal: '#99F6E4',
    violet: '#DDD6FE',
  },
  semantic: {
    success: '#86EFAC',
    warning: '#FDE68A',
    danger: '#FDA4AF',
    info: '#BAE6FD',
  },
  chart: {
    blue: '#BFDBFE',
    cyan: '#A5F3FC',
    teal: '#99F6E4',
    orange: '#FED7AA',
    red: '#FDA4AF',
    violet: '#DDD6FE',
  },
};

const themePalettes: Record<ThemeMode, ThemePalette> = {
  dark: colors,
  light: softLightColors,
};

const KesslerThemeContext = createContext<KesslerThemeContextValue | undefined>(undefined);

function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'dark' || value === 'light';
}

export function KesslerThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('dark');

  useEffect(() => {
    let isMounted = true;

    getJsonItem<ThemeMode | undefined>(THEME_MODE_STORAGE_KEY, undefined).then((storedMode) => {
      if (isMounted && isThemeMode(storedMode)) {
        setModeState(storedMode);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  function setMode(nextMode: ThemeMode) {
    setModeState(nextMode);
    void setJsonItem(THEME_MODE_STORAGE_KEY, nextMode);
  }

  const value = useMemo<KesslerThemeContextValue>(
    () => ({
      colors: themePalettes[mode],
      isLightMode: mode === 'light',
      mode,
      setMode,
      toggleMode: () => setMode(mode === 'dark' ? 'light' : 'dark'),
    }),
    [mode]
  );

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(themePalettes[mode].background.app);
  }, [mode]);

  return <KesslerThemeContext.Provider value={value}>{children}</KesslerThemeContext.Provider>;
}

export function useKesslerTheme() {
  const context = useContext(KesslerThemeContext);

  if (!context) {
    throw new Error('useKesslerTheme must be used inside KesslerThemeProvider');
  }

  return context;
}
