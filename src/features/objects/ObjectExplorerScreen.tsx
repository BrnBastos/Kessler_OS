import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge, Button, Card, Metric, SectionHeader } from '@/components/ui';
import { mockOrbitalObjects } from '@/data';
import { OrbitalObject } from '@/domain/models';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, layout, spacing, typography } from '@/theme';

import { ObjectFilters, ObjectTypeFilter, OrbitRegionFilter } from './components/ObjectFilters';
import { ObjectList } from './components/ObjectList';
import { OrbitalVisual } from './components/OrbitalVisual';
import {
  formatEstimate,
  formatObjectStatus,
  formatObjectType,
  getConfidenceLabel,
  getConfidenceTone,
} from './object-formatters';

const inactiveObjects = mockOrbitalObjects.filter((object) => object.status !== 'active');
const leoObjects = mockOrbitalObjects.filter((object) => object.orbitRegion === 'LEO');
const uncertainObjects = mockOrbitalObjects.filter(
  (object) => object.dataConfidence === 'unknown' || object.dataConfidence === 'simulated'
);

function SelectedObjectDetails({ object }: { object?: OrbitalObject }) {
  if (!object) {
    return (
      <Card style={styles.detailCard}>
        <Text style={styles.detailTitle}>Select an object to open details.</Text>
        <Text style={styles.detailBody}>
          The next phase will turn this focused summary into a full object passport route.
        </Text>
      </Card>
    );
  }

  return (
    <Card style={styles.detailCard}>
      <View style={styles.detailHeader}>
        <View style={styles.detailCopy}>
          <Text style={styles.detailEyebrow}>Focused object</Text>
          <Text style={styles.detailTitle}>{object.name}</Text>
          <Text style={styles.detailMeta}>
            {formatObjectType(object.type)} · {object.orbitRegion} ·{' '}
            {formatObjectStatus(object.status)}
          </Text>
        </View>
        <Badge
          label={getConfidenceLabel(object.dataConfidence)}
          tone={getConfidenceTone(object.dataConfidence)}
        />
      </View>

      <Text style={styles.detailBody}>{object.summary}</Text>

      <View style={styles.detailFacts}>
        <View style={styles.detailFact}>
          <Text style={styles.factLabel}>Altitude</Text>
          <Text style={styles.factValue}>{formatEstimate(object.altitudeKm, ' km')}</Text>
        </View>
        <View style={styles.detailFact}>
          <Text style={styles.factLabel}>Mass</Text>
          <Text style={styles.factValue}>{formatEstimate(object.estimatedMassKg, ' kg')}</Text>
        </View>
        <View style={styles.detailFact}>
          <Text style={styles.factLabel}>Inclination</Text>
          <Text style={styles.factValue}>{formatEstimate(object.inclinationDeg, ' deg')}</Text>
        </View>
        <View style={styles.detailFact}>
          <Text style={styles.factLabel}>Launch</Text>
          <Text style={styles.factValue}>{object.launchYear ?? 'Unknown'}</Text>
        </View>
      </View>

      <Button variant="secondary">Object Passport Next</Button>
    </Card>
  );
}

export function ObjectExplorerScreen() {
  const { isDesktop } = useBreakpoint();
  const [objectType, setObjectType] = useState<ObjectTypeFilter>('all');
  const [orbitRegion, setOrbitRegion] = useState<OrbitRegionFilter>('all');
  const [selectedObjectId, setSelectedObjectId] = useState(mockOrbitalObjects[0]?.id);

  const filteredObjects = useMemo(
    () =>
      mockOrbitalObjects.filter((object) => {
        const typeMatches = objectType === 'all' || object.type === objectType;
        const orbitMatches = orbitRegion === 'all' || object.orbitRegion === orbitRegion;

        return typeMatches && orbitMatches;
      }),
    [objectType, orbitRegion]
  );
  const selectedObject =
    filteredObjects.find((object) => object.id === selectedObjectId) ?? filteredObjects[0];

  function handleSelectObject(object: OrbitalObject) {
    setSelectedObjectId(object.id);
  }

  function handleResetFilters() {
    setObjectType('all');
    setOrbitRegion('all');
  }

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
                title="Explore tracked and simulated orbital objects."
                description="Filter by object type and orbit region, focus an object, and use the simplified orbit visual to keep the experience useful on phones, tablets and web."
              />
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

            <ObjectFilters
              objectType={objectType}
              orbitRegion={orbitRegion}
              onObjectTypeChange={setObjectType}
              onOrbitRegionChange={setOrbitRegion}
              onReset={handleResetFilters}
              resultCount={filteredObjects.length}
            />

            <View style={[styles.explorerGrid, isDesktop && styles.explorerGridDesktop]}>
              <View style={styles.visualColumn}>
                <OrbitalVisual objects={filteredObjects} selectedObject={selectedObject} />
                <SelectedObjectDetails object={selectedObject} />
              </View>

              <View style={styles.listColumn}>
                <View style={styles.sectionTitleRow}>
                  <Text style={styles.sectionTitle}>Object catalog</Text>
                  <Text style={styles.sectionNote}>Tap a card to open local details</Text>
                </View>
                <ObjectList
                  objects={filteredObjects}
                  selectedObjectId={selectedObject?.id}
                  onSelectObject={handleSelectObject}
                />
              </View>
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
  explorerGrid: {
    gap: spacing[5],
  },
  explorerGridDesktop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  visualColumn: {
    flex: 0.92,
    gap: spacing[4],
  },
  listColumn: {
    flex: 1.08,
    gap: spacing[4],
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
  detailCard: {
    gap: spacing[4],
  },
  detailHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  detailCopy: {
    flex: 1,
    gap: spacing[1],
    minWidth: 190,
  },
  detailEyebrow: {
    ...typography.caption,
    color: colors.accent.cyan,
    textTransform: 'uppercase',
  },
  detailTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  detailMeta: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  detailBody: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  detailFacts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  detailFact: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: 12,
    borderWidth: 1,
    flexBasis: 128,
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
