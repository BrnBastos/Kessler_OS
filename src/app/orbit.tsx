import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge, Button, Card, Metric, SectionHeader } from '@/components/ui';
import { mockOrbitalObjects } from '@/data';
import { DataConfidence, OrbitalObject, OrbitalObjectType } from '@/domain/models';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, layout, spacing, typography } from '@/theme';

type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'simulated';

const inactiveObjects = mockOrbitalObjects.filter((object) => object.status !== 'active');
const leoObjects = mockOrbitalObjects.filter((object) => object.orbitRegion === 'LEO');
const uncertainObjects = mockOrbitalObjects.filter(
  (object) => object.dataConfidence === 'unknown' || object.dataConfidence === 'simulated'
);

function formatObjectType(type: OrbitalObjectType) {
  return type.replace('_', ' ');
}

function formatEstimate(value?: number, suffix = '') {
  if (typeof value !== 'number') {
    return 'Unknown';
  }

  return `${value.toLocaleString()}${suffix}`;
}

function getConfidenceTone(confidence: DataConfidence): BadgeTone {
  switch (confidence) {
    case 'confirmed':
      return 'success';
    case 'estimated':
      return 'info';
    case 'simulated':
      return 'simulated';
    case 'unknown':
      return 'warning';
  }
}

function getConfidenceLabel(confidence: DataConfidence) {
  switch (confidence) {
    case 'confirmed':
      return 'Confirmed public data';
    case 'estimated':
      return 'System estimate';
    case 'simulated':
      return 'Simulated';
    case 'unknown':
      return 'Unknown';
  }
}

function OrbitalObjectCard({ object }: { object: OrbitalObject }) {
  return (
    <Card style={styles.objectCard}>
      <View style={styles.objectHeader}>
        <View style={styles.objectTitleGroup}>
          <Text style={styles.objectName}>{object.name}</Text>
          <Text style={styles.objectMeta}>
            {formatObjectType(object.type)} · {object.orbitRegion} · {object.status}
          </Text>
        </View>
        <Badge
          label={getConfidenceLabel(object.dataConfidence)}
          tone={getConfidenceTone(object.dataConfidence)}
        />
      </View>

      <Text style={styles.objectSummary}>{object.summary}</Text>

      <View style={styles.factGrid}>
        <View style={styles.factItem}>
          <Text style={styles.factLabel}>Altitude</Text>
          <Text style={styles.factValue}>{formatEstimate(object.altitudeKm, ' km')}</Text>
        </View>
        <View style={styles.factItem}>
          <Text style={styles.factLabel}>Mass</Text>
          <Text style={styles.factValue}>{formatEstimate(object.estimatedMassKg, ' kg')}</Text>
        </View>
        <View style={styles.factItem}>
          <Text style={styles.factLabel}>Size</Text>
          <Text style={styles.factValue}>{formatEstimate(object.estimatedSizeM, ' m')}</Text>
        </View>
        <View style={styles.factItem}>
          <Text style={styles.factLabel}>Inclination</Text>
          <Text style={styles.factValue}>{formatEstimate(object.inclinationDeg, ' deg')}</Text>
        </View>
      </View>
    </Card>
  );
}

export default function OrbitScreen() {
  const { isDesktop } = useBreakpoint();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}>
        <SafeAreaView>
          <View style={styles.stack}>
            <View style={styles.hero}>
              <Badge label="Local mock dataset" tone="simulated" />
              <SectionHeader
                eyebrow="Orbital object exploration"
                title="Explore public-inspired orbital objects from local prototype data."
                description="This catalog proves the app can render typed orbital objects before API integration. Values are simplified for MVP planning and every object carries a confidence label."
                action={
                  isDesktop ? (
                    <Button onPress={() => router.push('/priority')}>View Priority</Button>
                  ) : undefined
                }
              />
              {!isDesktop && <Button onPress={() => router.push('/priority')}>View Priority</Button>}
            </View>

            <View style={styles.metricGrid}>
              <Metric
                detail="Loaded from src/data"
                label="Catalog objects"
                tone="cyan"
                value={mockOrbitalObjects.length.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Inactive, fragment or unknown"
                label="Attention candidates"
                tone="danger"
                value={inactiveObjects.length.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Useful for early MVP focus"
                label="LEO objects"
                tone="blue"
                value={leoObjects.length.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Unknown or simulated"
                label="Needs confidence review"
                tone="warning"
                value={uncertainObjects.length.toString()}
                style={styles.metricCard}
              />
            </View>

            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Object catalog</Text>
              <Text style={styles.sectionNote}>Prototype data · not operational guidance</Text>
            </View>

            <View style={[styles.objectGrid, isDesktop && styles.objectGridDesktop]}>
              {mockOrbitalObjects.map((object) => (
                <OrbitalObjectCard key={object.id} object={object} />
              ))}
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
    paddingVertical: spacing[8],
    width: '100%',
  },
  contentDesktop: {
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[10],
  },
  stack: {
    gap: spacing[6],
  },
  hero: {
    gap: spacing[5],
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
  sectionTitleRow: {
    gap: spacing[2],
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text.primary,
  },
  sectionNote: {
    ...typography.bodySmall,
    color: colors.text.muted,
  },
  objectGrid: {
    gap: spacing[4],
  },
  objectGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  objectCard: {
    flexBasis: 360,
    flexGrow: 1,
    gap: spacing[4],
  },
  objectHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  objectTitleGroup: {
    flexShrink: 1,
    gap: spacing[1],
    minWidth: 190,
  },
  objectName: {
    ...typography.h3,
    color: colors.text.primary,
  },
  objectMeta: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  objectSummary: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  factGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  factItem: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: 12,
    borderWidth: 1,
    flexBasis: 130,
    flexGrow: 1,
    gap: spacing[1],
    padding: spacing[3],
  },
  factLabel: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  factValue: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
});
