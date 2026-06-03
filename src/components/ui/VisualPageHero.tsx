import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, radius, shadows, spacing, typography, useKesslerTheme } from '@/theme';

type VisualPageHeroProps = {
  actions?: ReactNode;
  backgroundImage: ImageSourcePropType;
  badge?: ReactNode;
  description: string;
  eyebrow: string;
  foregroundDetail?: string;
  foregroundImage?: ImageSourcePropType;
  foregroundLabel?: string;
  title: string;
};

export function VisualPageHero({
  actions,
  backgroundImage,
  badge,
  description,
  eyebrow,
  foregroundDetail,
  foregroundImage,
  foregroundLabel,
  title,
}: VisualPageHeroProps) {
  const { isDesktop, isPhone } = useBreakpoint();
  const theme = useKesslerTheme();
  const overlayColors = [
    'rgba(2, 6, 23, 0.98)',
    'rgba(2, 6, 23, 0.52)',
    'rgba(2, 6, 23, 0.94)',
  ] as const;

  return (
    <View
      style={[
        styles.hero,
        {
          backgroundColor: theme.colors.background.surfaceElevated,
          borderColor: theme.colors.border.subtle,
        },
        isPhone && styles.heroPhone,
      ]}>
      <Image source={backgroundImage} contentFit="cover" style={styles.backgroundImage} />
      <LinearGradient
        colors={overlayColors}
        start={{ x: 0, y: 0.08 }}
        end={{ x: 1, y: 1 }}
        style={styles.overlay}
      />

      <View
        style={[
          styles.content,
          isDesktop && styles.contentDesktop,
          isPhone && styles.contentPhone,
        ]}>
        <View style={[styles.copy, isDesktop && styles.copyDesktop]}>
          {badge && <View style={styles.badgeRow}>{badge}</View>}
          <Text style={styles.eyebrow}>{eyebrow}</Text>
          <Text style={[styles.title, isPhone && styles.titlePhone]}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {actions && <View style={[styles.actions, isPhone && styles.actionsPhone]}>{actions}</View>}
        </View>

        {foregroundImage && (
          <View style={[styles.visualPane, isPhone && styles.visualPanePhone]}>
            <View style={[styles.objectStage, isPhone && styles.objectStagePhone]}>
              <View style={[styles.orbitRing, styles.orbitRingOuter]} />
              <View style={[styles.orbitRing, styles.orbitRingInner]} />
              <Image source={foregroundImage} contentFit="contain" style={styles.foregroundImage} />
            </View>

            {(foregroundLabel || foregroundDetail) && (
              <View
                style={[
                  styles.foregroundTag,
                  {
                    backgroundColor: theme.isLightMode
                      ? 'rgba(52, 91, 118, 0.88)'
                      : 'rgba(7, 17, 30, 0.74)',
                    borderColor: theme.colors.border.strong,
                  },
                ]}>
                {foregroundLabel && (
                  <Text style={[styles.foregroundLabel, { color: theme.colors.text.muted }]}>
                    {foregroundLabel}
                  </Text>
                )}
                {foregroundDetail && (
                  <Text style={[styles.foregroundDetail, { color: theme.colors.text.primary }]}>
                    {foregroundDetail}
                  </Text>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.background.surfaceElevated,
    borderColor: colors.border.subtle,
    borderRadius: radius.xl,
    borderWidth: 1,
    minHeight: 420,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.card,
  },
  heroPhone: {
    minHeight: 540,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    opacity: 0.86,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    gap: spacing[6],
    minHeight: 420,
    padding: spacing[6],
  },
  contentDesktop: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing[8],
  },
  contentPhone: {
    minHeight: 540,
    padding: spacing[5],
  },
  copy: {
    flex: 1,
    gap: spacing[3],
    minWidth: 0,
    zIndex: 1,
  },
  copyDesktop: {
    maxWidth: 660,
  },
  badgeRow: {
    alignItems: 'flex-start',
  },
  eyebrow: {
    ...typography.caption,
    color: colors.accent.cyan,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
  },
  titlePhone: {
    ...typography.h2,
  },
  description: {
    ...typography.body,
    color: colors.text.secondary,
    maxWidth: 680,
  },
  actions: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    paddingTop: spacing[2],
  },
  actionsPhone: {
    alignItems: 'stretch',
    flexDirection: 'column',
    width: '100%',
  },
  visualPane: {
    alignItems: 'center',
    flex: 0.86,
    gap: spacing[3],
    justifyContent: 'center',
    minHeight: 220,
    minWidth: 0,
    width: '100%',
    zIndex: 1,
  },
  visualPanePhone: {
    minHeight: 190,
  },
  objectStage: {
    alignItems: 'center',
    aspectRatio: 1.16,
    justifyContent: 'center',
    maxWidth: 360,
    position: 'relative',
    width: '100%',
  },
  objectStagePhone: {
    maxWidth: 280,
  },
  orbitRing: {
    borderColor: 'rgba(125, 211, 252, 0.2)',
    borderRadius: radius.pill,
    borderWidth: 1,
    position: 'absolute',
    transform: [{ rotate: '-16deg' }],
  },
  orbitRingOuter: {
    height: '82%',
    width: '108%',
  },
  orbitRingInner: {
    height: '52%',
    width: '78%',
  },
  foregroundImage: {
    height: '78%',
    width: '78%',
  },
  foregroundTag: {
    backgroundColor: 'rgba(7, 17, 30, 0.74)',
    borderColor: colors.border.strong,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing[1],
    maxWidth: 260,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  foregroundLabel: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  foregroundDetail: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
});
