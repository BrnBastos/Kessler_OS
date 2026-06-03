import { Platform } from 'react-native';

export const shadows = {
  card:
    Platform.select({
      web: {
        boxShadow: '0 18px 52px rgba(0, 0, 0, 0.34), 0 0 0 1px rgba(56, 232, 255, 0.03)',
      },
      default: {
        shadowColor: '#000',
        shadowOpacity: 0.34,
        shadowRadius: 22,
        shadowOffset: { width: 0, height: 14 },
        elevation: 6,
      },
    }) ?? {},
  glowBlue:
    Platform.select({
      web: {
        boxShadow: '0 0 44px rgba(56, 232, 255, 0.20), 0 0 90px rgba(29, 78, 216, 0.12)',
      },
      default: {
        shadowColor: '#38E8FF',
        shadowOpacity: 0.2,
        shadowRadius: 30,
        shadowOffset: { width: 0, height: 0 },
        elevation: 8,
      },
    }) ?? {},
} as const;
