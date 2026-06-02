import { Platform } from 'react-native';

export const shadows = {
  card:
    Platform.select({
      web: {
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.28)',
      },
      default: {
        shadowColor: '#000',
        shadowOpacity: 0.28,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 6,
      },
    }) ?? {},
  glowBlue:
    Platform.select({
      web: {
        boxShadow: '0 0 34px rgba(37, 99, 235, 0.22)',
      },
      default: {
        shadowColor: '#2563EB',
        shadowOpacity: 0.22,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 0 },
        elevation: 8,
      },
    }) ?? {},
} as const;
