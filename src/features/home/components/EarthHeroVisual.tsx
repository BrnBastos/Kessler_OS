import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors, radius, shadows, spacing, typography } from '@/theme';

type EarthHeroVisualProps = {
  style?: StyleProp<ViewStyle>;
};

export function EarthHeroVisual({ style }: EarthHeroVisualProps) {
  return (
    <View style={[styles.panel, style]} accessibilityLabel="Kessler orbital risk visual">
      <View style={styles.backgroundGrid}>
        {Array.from({ length: 9 }).map((_, index) => (
          <View key={index} style={styles.gridLine} />
        ))}
      </View>
      <View style={styles.earthGlow} />
      <View style={styles.orbitRingOuter} />
      <View style={styles.orbitRingInner} />
      <View style={styles.orbitRingTight} />
      <View style={styles.earth}>
        <View style={styles.earthShade} />
        <View style={styles.continentOne} />
        <View style={styles.continentTwo} />
      </View>
      <View style={[styles.object, styles.objectDanger]} />
      <View style={[styles.object, styles.objectCyan]} />
      <View style={[styles.object, styles.objectWarning]} />
      <View style={styles.caption}>
        <View style={styles.captionDot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    alignItems: 'center',
    alignSelf: 'center',
    aspectRatio: 1,
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.xl,
    borderWidth: 1,
    justifyContent: 'center',
    maxWidth: 440,
    overflow: 'hidden',
    width: '100%',
    ...shadows.glowBlue,
  },
  backgroundGrid: {
    bottom: 0,
    left: 0,
    opacity: 0.22,
    position: 'absolute',
    right: 0,
    top: 0,
    transform: [{ rotate: '-22deg' }],
  },
  gridLine: {
    backgroundColor: colors.border.subtle,
    height: 1,
    marginTop: spacing[5],
    width: '150%',
  },
  earthGlow: {
    backgroundColor: 'rgba(34, 211, 238, 0.12)',
    borderRadius: 999,
    height: '82%',
    position: 'absolute',
    width: '82%',
  },
  orbitRingOuter: {
    borderColor: 'rgba(34, 211, 238, 0.34)',
    borderRadius: 999,
    borderWidth: 1,
    height: '74%',
    position: 'absolute',
    transform: [{ rotate: '-18deg' }, { scaleX: 1.16 }],
    width: '74%',
  },
  orbitRingInner: {
    borderColor: 'rgba(59, 130, 246, 0.36)',
    borderRadius: 999,
    borderWidth: 1,
    height: '56%',
    position: 'absolute',
    transform: [{ rotate: '28deg' }, { scaleX: 1.22 }],
    width: '56%',
  },
  orbitRingTight: {
    borderColor: 'rgba(20, 184, 166, 0.2)',
    borderRadius: 999,
    borderWidth: 1,
    height: '44%',
    position: 'absolute',
    transform: [{ rotate: '54deg' }, { scaleX: 1.32 }],
    width: '44%',
  },
  earth: {
    backgroundColor: colors.accent.blue,
    borderColor: 'rgba(248, 250, 252, 0.16)',
    borderRadius: 999,
    borderWidth: 1,
    height: '39%',
    overflow: 'hidden',
    width: '39%',
  },
  earthShade: {
    backgroundColor: 'rgba(3, 7, 18, 0.28)',
    borderRadius: 999,
    bottom: -18,
    left: -12,
    position: 'absolute',
    right: 48,
    top: 12,
  },
  continentOne: {
    backgroundColor: 'rgba(34, 211, 238, 0.38)',
    borderRadius: 999,
    height: '28%',
    left: '54%',
    position: 'absolute',
    top: '26%',
    transform: [{ rotate: '-24deg' }],
    width: '32%',
  },
  continentTwo: {
    backgroundColor: 'rgba(20, 184, 166, 0.32)',
    borderRadius: 999,
    bottom: '24%',
    height: '22%',
    left: '36%',
    position: 'absolute',
    transform: [{ rotate: '18deg' }],
    width: '38%',
  },
  object: {
    borderRadius: 999,
    position: 'absolute',
  },
  objectDanger: {
    backgroundColor: colors.semantic.danger,
    height: 10,
    right: '22%',
    top: '28%',
    width: 10,
  },
  objectCyan: {
    backgroundColor: colors.accent.cyan,
    bottom: '24%',
    height: 8,
    left: '28%',
    width: 8,
  },
  objectWarning: {
    backgroundColor: colors.semantic.warning,
    bottom: '32%',
    height: 7,
    right: '30%',
    width: 7,
  },
  caption: {
    alignItems: 'center',
    backgroundColor: 'rgba(3, 7, 18, 0.58)',
    borderColor: colors.border.subtle,
    borderRadius: radius.pill,
    borderWidth: 1,
    bottom: spacing[4],
    flexDirection: 'row',
    gap: spacing[2],
    minHeight: 32,
    paddingHorizontal: spacing[3],
    position: 'absolute',
    right: spacing[4],
  },
  captionDot: {
    backgroundColor: colors.accent.cyan,
    borderRadius: 999,
    height: typography.caption.fontSize,
    width: typography.caption.fontSize,
  },
});
