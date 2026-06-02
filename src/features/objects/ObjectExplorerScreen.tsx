import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge, Button, Card, Metric, SectionHeader } from '@/components/ui';
import { listScoredOrbitalObjects } from '@/domain/repositories';
import { ScoredOrbitalObject } from '@/domain/scoring';
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
  getScoreTone,
} from './object-formatters';

const allObjects = listScoredOrbitalObjects();
const inactiveObjects = allObjects.filter((object) => object.status !== 'active');
const leoObjects = allObjects.filter((object) => object.orbitRegion === 'LEO');
const uncertainObjects = allObjects.filter(
  (object) => object.dataConfidence === 'unknown' || object.dataConfidence === 'simulated'
);
const averagePriority =
  Math.round(
    allObjects.reduce((total, object) => total + object.scores.priority.score, 0) /
      allObjects.length
  ) || 0;

function SelectedObjectDetails({ object }: { object?: ScoredOrbitalObject }) {
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

      <View style={styles.scoreGrid}>
        <Badge
          label="Risk Score"
          reason={object.scores.risk.summary}
          score={object.scores.risk.score}
          tone={getScoreTone(object.scores.risk.level)}
          style={styles.scoreBadge}
        />
        <Badge
          label="Forge Value"
          reason={object.scores.forgeValue.summary}
          score={object.scores.forgeValue.score}
          tone={getScoreTone(object.scores.forgeValue.level)}
          style={styles.scoreBadge}
        />
        <Badge
          label="Priority"
          reason={object.scores.priority.summary}
          score={object.scores.priority.score}
          tone={getScoreTone(object.scores.priority.level)}
          style={styles.scoreBadge}
        />
      </View>

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

      <View style={styles.decisionPanel}>
        <Text style={styles.decisionLabel}>Recommended decision</Text>
        <Text style={styles.decisionText}>{object.scores.priority.decision}</Text>
      </View>

      <Button
        variant="secondary"
        onPress={() =>
          router.push({
            pathname: '/orbit/[id]',
            params: { id: object.id },
          })
        }>
        Open Object Passport
      </Button>
    </Card>
  );
}

export function ObjectExplorerScreen() {
  const { isDesktop } = useBreakpoint();
  const [objectType, setObjectType] = useState<ObjectTypeFilter>('all');
  const [orbitRegion, setOrbitRegion] = useState<OrbitRegionFilter>('all');
  const [selectedObjectId, setSelectedObjectId] = useState(allObjects[0]?.id);

  const filteredObjects = useMemo(
    () =>
      listScoredOrbitalObjects({
        orbitRegion,
        type: objectType,
      }),
    [objectType, orbitRegion]
  );
  const selectedObject =
    filteredObjects.find((object) => object.id === selectedObjectId) ?? filteredObjects[0];

  function handleSelectObject(object: ScoredOrbitalObject) {
    setSelectedObjectId(object.id);
  }

  function handleOpenPassport(object: ScoredOrbitalObject) {
    router.push({
      pathname: '/orbit/[id]',
      params: { id: object.id },
    });
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
              <Badge label="Repository + scoring model" tone="simulated" />
              <SectionHeader
                eyebrow="Orbital object exploration"
                title="Explore tracked objects with transparent prototype scores."
                description="Filter by object type and orbit region, focus an object, and review deterministic risk, forge value, and priority scores. These are simplified planning signals, not professional orbital predictions."
              />
            </View>

            <View style={styles.metricGrid}>
              <Metric
                detail="Loaded through repository"
                label="Catalog objects"
                tone="cyan"
                value={allObjects.length.toString()}
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
                detail="Average deterministic score"
                label="Priority baseline"
                tone="warning"
                value={averagePriority.toString()}
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
                <OrbitalVisual
                  objects={filteredObjects}
                  selectedObject={selectedObject}
                  onSelectObject={handleSelectObject}
                />
                <SelectedObjectDetails object={selectedObject} />
              </View>

              <View style={styles.listColumn}>
                <View style={styles.sectionTitleRow}>
                  <Text style={styles.sectionTitle}>Object catalog</Text>
                  <Text style={styles.sectionNote}>
                    Tap a card to inspect scores and local details
                  </Text>
                </View>
                <ObjectList
                  objects={filteredObjects}
                  onOpenPassport={handleOpenPassport}
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
  scoreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  scoreBadge: {
    flexBasis: 180,
    flexGrow: 1,
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
  decisionPanel: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: 12,
    borderWidth: 1,
    gap: spacing[1],
    padding: spacing[3],
  },
  decisionLabel: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  decisionText: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
});
