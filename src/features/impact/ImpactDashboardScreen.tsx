import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mockReuseMaterials } from '@/data';
import { Badge, Button, Card, DataSourceNotice, Metric, SectionHeader } from '@/components/ui';
import {
  getOrbitalObjectRepositoryStatus,
  listScoredOrbitalObjects,
  loadScoredOrbitalObjects,
} from '@/domain/repositories';
import { missionProfiles, ScoredOrbitalObject } from '@/domain/scoring';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { listSavedMissionScenarios, SavedMissionScenario } from '@/services/persistence';
import { colors, layout, radius, spacing, typography } from '@/theme';

const initialObjects = listScoredOrbitalObjects();

const preventionRecommendations = [
  'Passivation',
  'End-of-life planning',
  'Controlled reentry',
  'Graveyard orbit',
  'Tracking and cataloging',
  'Collision avoidance',
  'Responsible mission design',
];

const valuePillars = [
  {
    body: 'Objects are ranked using transparent risk, forge value and priority scores.',
    label: 'Analyze',
  },
  {
    body: 'Users can test inspection, avoidance, deorbit, capture and recycling scenarios.',
    label: 'Simulate',
  },
  {
    body: 'The app frames orbital debris as both safety risk and future material opportunity.',
    label: 'Reuse',
  },
  {
    body: 'Reports explain model boundaries so the prototype does not overclaim precision.',
    label: 'Explain',
  },
];

function getReusableMassEstimate(objects: ScoredOrbitalObject[]) {
  return objects.reduce((total, object) => {
    if (typeof object.estimatedMassKg !== 'number' || object.scores.forgeValue.score < 40) {
      return total;
    }

    const materialShare = mockReuseMaterials
      .filter((estimate) => estimate.objectType === object.type)
      .reduce((shareTotal, estimate) => shareTotal + estimate.estimatedSharePct, 0);
    const boundedShare = Math.min(100, materialShare || 10);

    return total + object.estimatedMassKg * (boundedShare / 100);
  }, 0);
}

function getAverageScore(
  objects: ScoredOrbitalObject[],
  scoreKey: 'forgeValue' | 'priority' | 'risk'
) {
  if (objects.length === 0) {
    return 0;
  }

  return Math.round(
    objects.reduce((total, object) => total + object.scores[scoreKey].score, 0) / objects.length
  );
}

function formatMass(value: number) {
  if (value >= 1000) {
    return `${Math.round(value / 100) / 10}t`;
  }

  return `${Math.round(value)}kg`;
}

function formatSavedAt(value?: string) {
  if (!value) {
    return 'No saved scenario yet';
  }

  return new Date(value).toLocaleString();
}

export function ImpactDashboardScreen() {
  const { isDesktop } = useBreakpoint();
  const [catalogObjects, setCatalogObjects] = useState<ScoredOrbitalObject[]>(initialObjects);
  const [savedScenarios, setSavedScenarios] = useState<SavedMissionScenario[]>([]);
  const [repositoryStatus, setRepositoryStatus] = useState(getOrbitalObjectRepositoryStatus);
  const [isLoadingPublicData, setIsLoadingPublicData] = useState(true);

  useEffect(() => {
    let isMounted = true;

    Promise.all([loadScoredOrbitalObjects(), listSavedMissionScenarios()])
      .then(([result, scenarios]) => {
        if (!isMounted) {
          return;
        }

        setCatalogObjects(result.objects);
        setRepositoryStatus(result.status);
        setSavedScenarios(scenarios);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingPublicData(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const highPriorityObjects = catalogObjects.filter(
    (object) => object.scores.priority.level === 'high'
  );
  const reuseCandidates = catalogObjects.filter((object) => object.scores.forgeValue.score >= 40);
  const reusableMassEstimate = useMemo(
    () => getReusableMassEstimate(catalogObjects),
    [catalogObjects]
  );
  const averageRisk = getAverageScore(catalogObjects, 'risk');
  const averagePriority = getAverageScore(catalogObjects, 'priority');
  const latestSavedScenario = savedScenarios[0];

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}>
        <SafeAreaView>
          <View style={styles.stack}>
            <View style={styles.hero}>
              <Badge label="Evaluator view" tone="simulated" />
              <SectionHeader
                eyebrow="Impact Dashboard"
                title="Show the value of Kessler OS in one presentation-ready view."
                description="This dashboard summarizes catalog analysis, priority ranking, mission simulation, circular reuse value and prevention guidance with honest prototype boundaries."
                action={
                  isDesktop ? (
                    <Button onPress={() => router.push('/missions')}>Run Simulation</Button>
                  ) : undefined
                }
              />
              {!isDesktop && <Button onPress={() => router.push('/missions')}>Run Simulation</Button>}
            </View>

            <View style={styles.metricGrid}>
              <Metric
                detail="Analyzed through repository"
                label="Objects analyzed"
                tone="cyan"
                value={catalogObjects.length.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Priority level high"
                label="High-priority objects"
                tone="danger"
                value={highPriorityObjects.length.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Approximate recoverable category mass"
                label="Reusable mass"
                tone="teal"
                value={formatMass(reusableMassEstimate)}
                style={styles.metricCard}
              />
              <Metric
                detail="Available deterministic response models"
                label="Simulated missions"
                tone="blue"
                value={Object.keys(missionProfiles).length.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Responsible behavior topics"
                label="Prevention recommendations"
                tone="warning"
                value={preventionRecommendations.length.toString()}
                style={styles.metricCard}
              />
            </View>

            <DataSourceNotice isLoading={isLoadingPublicData} status={repositoryStatus} />

            <View style={[styles.dashboardGrid, isDesktop && styles.dashboardGridDesktop]}>
              <View style={styles.mainColumn}>
                <Card style={styles.card}>
                  <SectionHeader
                    eyebrow="Presentation narrative"
                    title="Kessler connects risk, action and reuse."
                    description="The app is not just a catalog. It turns orbital debris into a decision workflow: discover objects, rank attention, simulate responses, evaluate reuse and explain recommendations."
                  />

                  <View style={styles.pillarGrid}>
                    {valuePillars.map((pillar) => (
                      <View key={pillar.label} style={styles.pillar}>
                        <Text style={styles.pillarLabel}>{pillar.label}</Text>
                        <Text style={styles.pillarBody}>{pillar.body}</Text>
                      </View>
                    ))}
                  </View>
                </Card>

                <Card style={styles.card} variant="score">
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Impact signals</Text>
                    <Badge label="Prototype model" tone="simulated" />
                  </View>

                  <View style={styles.signalGrid}>
                    <View style={styles.signal}>
                      <Text style={styles.signalValue}>{averageRisk}</Text>
                      <Text style={styles.signalLabel}>Average risk score</Text>
                    </View>
                    <View style={styles.signal}>
                      <Text style={styles.signalValue}>{averagePriority}</Text>
                      <Text style={styles.signalLabel}>Average priority score</Text>
                    </View>
                    <View style={styles.signal}>
                      <Text style={styles.signalValue}>{reuseCandidates.length}</Text>
                      <Text style={styles.signalLabel}>Reuse candidates</Text>
                    </View>
                  </View>
                </Card>
              </View>

              <View style={styles.sideColumn}>
                <Card style={styles.card}>
                  <Text style={styles.cardTitle}>Top attention objects</Text>
                  <View style={styles.rankList}>
                    {highPriorityObjects.slice(0, 4).map((object, index) => (
                      <View key={object.id} style={styles.rankItem}>
                        <Text style={styles.rankNumber}>{index + 1}</Text>
                        <View style={styles.rankCopy}>
                          <Text style={styles.rankTitle}>{object.name}</Text>
                          <Text style={styles.rankMeta}>
                            {object.orbitRegion} · {object.status} · priority{' '}
                            {object.scores.priority.score}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </Card>

                <Card style={styles.card}>
                  <Text style={styles.cardTitle}>Saved simulation state</Text>
                  <Text style={styles.bodyText}>
                    {savedScenarios.length} saved scenario{savedScenarios.length === 1 ? '' : 's'} are
                    available locally for comparison.
                  </Text>
                  <Text style={styles.mutedText}>
                    Latest: {formatSavedAt(latestSavedScenario?.savedAt)}
                  </Text>
                  <Button variant="secondary" onPress={() => router.push('/missions')}>
                    Open Saved Scenarios
                  </Button>
                </Card>

                <Card style={styles.card}>
                  <Text style={styles.cardTitle}>Prototype boundaries</Text>
                  <View style={styles.boundaryList}>
                    <Text style={styles.boundary}>No operational collision prediction.</Text>
                    <Text style={styles.boundary}>No verified legal compliance claim.</Text>
                    <Text style={styles.boundary}>No confirmed material composition.</Text>
                    <Text style={styles.boundary}>All reports are deterministic templates.</Text>
                  </View>
                </Card>
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
    flexBasis: 205,
    flexGrow: 1,
  },
  dashboardGrid: {
    gap: spacing[5],
  },
  dashboardGridDesktop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  mainColumn: {
    flex: 1.12,
    gap: spacing[5],
    minWidth: 0,
  },
  sideColumn: {
    flex: 0.88,
    gap: spacing[5],
    minWidth: 0,
  },
  card: {
    gap: spacing[5],
  },
  cardHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  pillarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  pillar: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    flexBasis: 220,
    flexGrow: 1,
    gap: spacing[2],
    padding: spacing[4],
  },
  pillarLabel: {
    ...typography.bodySmall,
    color: colors.accent.cyan,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  pillarBody: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  signalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  signal: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    flexBasis: 150,
    flexGrow: 1,
    gap: spacing[1],
    padding: spacing[4],
  },
  signalValue: {
    ...typography.h2,
    color: colors.text.primary,
  },
  signalLabel: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  rankList: {
    gap: spacing[3],
  },
  rankItem: {
    alignItems: 'center',
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing[3],
    padding: spacing[3],
  },
  rankNumber: {
    ...typography.h3,
    color: colors.accent.cyan,
    minWidth: 28,
    textAlign: 'center',
  },
  rankCopy: {
    flex: 1,
    gap: spacing[1],
    minWidth: 0,
  },
  rankTitle: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  rankMeta: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  bodyText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  mutedText: {
    ...typography.caption,
    color: colors.text.muted,
  },
  boundaryList: {
    gap: spacing[2],
  },
  boundary: {
    ...typography.caption,
    color: colors.text.secondary,
  },
});
