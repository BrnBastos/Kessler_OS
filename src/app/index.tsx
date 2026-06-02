import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge, Button, Card, Metric, SectionHeader } from '@/components/ui';
import { breakpoints, colors, layout, radius, shadows, spacing, typography } from '@/theme';

const featureCards = [
  {
    description: 'Assess collision probability and reduce operational risk.',
    label: 'Risk Analysis',
  },
  {
    description: 'Plan safer, lower-risk missions with predictive modeling.',
    label: 'Mission Simulation',
  },
  {
    description: 'Estimate recovery value and future reuse paths.',
    label: 'Circular Economy',
  },
];

const metrics = [
  {
    detail: 'Prototype dataset ready for scoring',
    label: 'Objects monitored',
    tone: 'cyan',
    value: '1,248',
  },
  {
    detail: 'Simulated high-attention cases',
    label: 'Priority alerts',
    tone: 'danger',
    value: '37',
  },
  {
    detail: 'Estimated reusable mass',
    label: 'Recovery value',
    tone: 'teal',
    value: '42%',
  },
] as const;

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= breakpoints.desktop;
  const isPhone = width < breakpoints.tablet;

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          isDesktop && styles.contentDesktop,
          { paddingBottom: spacing[10] },
        ]}>
        <SafeAreaView>
          <View style={styles.stack}>
            <View style={[styles.hero, isDesktop && styles.heroDesktop]}>
              <View style={styles.heroCopy}>
                <Badge label="System estimate" tone="simulated" />
                <Text style={[styles.title, isPhone && styles.titlePhone]}>
                  Space debris intelligence for a circular orbital future.
                </Text>
                <Text style={styles.subtitle}>
                  Smarter decisions in orbit through public data, risk analytics and mission
                  simulation.
                </Text>
                <View style={styles.actions}>
                  <Button onPress={() => router.push('/orbit')}>Explore Orbit</Button>
                  <Button variant="secondary" onPress={() => router.push('/prevention')}>
                    See How It Works
                  </Button>
                </View>
              </View>

              <View style={styles.orbitPanel} accessibilityLabel="Kessler orbital risk visual">
                <View style={styles.earthGlow} />
                <View style={styles.orbitRingOuter} />
                <View style={styles.orbitRingInner} />
                <View style={styles.earth} />
                <View style={styles.objectOne} />
                <View style={styles.objectTwo} />
                <View style={styles.objectThree} />
              </View>
            </View>

            <View style={styles.featureGrid}>
              {featureCards.map((feature) => (
                <Card key={feature.label} variant="feature" style={styles.featureCard}>
                  <Text style={styles.featureTitle}>{feature.label}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </Card>
              ))}
            </View>

            <View style={styles.metricGrid}>
              {metrics.map((metric) => (
                <Metric
                  key={metric.label}
                  detail={metric.detail}
                  label={metric.label}
                  tone={metric.tone}
                  value={metric.value}
                  style={styles.metricCard}
                />
              ))}
            </View>

            <View style={[styles.previewGrid, isDesktop && styles.previewGridDesktop]}>
              <Card variant="score" style={styles.previewCard}>
                <SectionHeader
                  eyebrow="Priority preview"
                  title="COSMOS 2251 debris"
                  description="High attention recommended due to dense LEO region and estimated object size."
                />
                <Badge
                  label="High Risk"
                  reason="Dense LEO region · close approach window"
                  score={82}
                  tone="danger"
                />
              </Card>

              <Card variant="action" style={styles.previewCard}>
                <SectionHeader
                  eyebrow="Circular economy"
                  title="Reuse path estimate"
                  description="Material recovery is simulated from public object type and mass assumptions."
                />
                <Badge label="Simulated data" tone="simulated" />
              </Card>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.background.app,
    flex: 1,
  },
  scroll: {
    backgroundColor: colors.background.app,
    flex: 1,
  },
  content: {
    alignSelf: 'center',
    maxWidth: layout.maxContentWidth,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[8],
    width: '100%',
  },
  contentDesktop: {
    paddingHorizontal: spacing[8],
    paddingTop: spacing[10],
  },
  stack: {
    gap: spacing[8],
  },
  hero: {
    gap: spacing[8],
  },
  heroDesktop: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  heroCopy: {
    flex: 1,
    gap: spacing[5],
  },
  title: {
    ...typography.display,
    color: colors.text.primary,
    letterSpacing: 0,
    maxWidth: 680,
  },
  titlePhone: {
    fontSize: 36,
    lineHeight: 44,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    maxWidth: 560,
  },
  actions: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  orbitPanel: {
    alignItems: 'center',
    alignSelf: 'center',
    aspectRatio: 1,
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.xl,
    borderWidth: 1,
    justifyContent: 'center',
    maxWidth: 420,
    overflow: 'hidden',
    width: '100%',
    ...shadows.glowBlue,
  },
  earthGlow: {
    backgroundColor: 'rgba(34, 211, 238, 0.12)',
    borderRadius: 999,
    height: '78%',
    position: 'absolute',
    width: '78%',
  },
  orbitRingOuter: {
    borderColor: 'rgba(34, 211, 238, 0.32)',
    borderRadius: 999,
    borderWidth: 1,
    height: '72%',
    position: 'absolute',
    transform: [{ rotate: '-18deg' }, { scaleX: 1.16 }],
    width: '72%',
  },
  orbitRingInner: {
    borderColor: 'rgba(59, 130, 246, 0.34)',
    borderRadius: 999,
    borderWidth: 1,
    height: '54%',
    position: 'absolute',
    transform: [{ rotate: '28deg' }, { scaleX: 1.22 }],
    width: '54%',
  },
  earth: {
    backgroundColor: colors.accent.blue,
    borderColor: 'rgba(248, 250, 252, 0.14)',
    borderRadius: 999,
    borderWidth: 1,
    height: '38%',
    width: '38%',
  },
  objectOne: {
    backgroundColor: colors.semantic.danger,
    borderRadius: 999,
    height: 10,
    position: 'absolute',
    right: '22%',
    top: '28%',
    width: 10,
  },
  objectTwo: {
    backgroundColor: colors.accent.cyan,
    borderRadius: 999,
    bottom: '24%',
    height: 8,
    left: '28%',
    position: 'absolute',
    width: 8,
  },
  objectThree: {
    backgroundColor: colors.semantic.warning,
    borderRadius: 999,
    height: 7,
    position: 'absolute',
    right: '30%',
    bottom: '32%',
    width: 7,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],
  },
  featureCard: {
    flexBasis: 260,
    flexGrow: 1,
    gap: spacing[3],
  },
  featureTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  featureDescription: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],
  },
  metricCard: {
    flexBasis: 220,
    flexGrow: 1,
  },
  previewGrid: {
    gap: spacing[4],
  },
  previewGridDesktop: {
    flexDirection: 'row',
  },
  previewCard: {
    flex: 1,
    gap: spacing[5],
  },
});
