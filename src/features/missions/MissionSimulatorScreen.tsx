import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge, Button, Card, DataSourceNotice, Metric, SectionHeader } from '@/components/ui';
import { MissionType } from '@/domain/models';
import {
  getOrbitalObjectRepositoryStatus,
  listScoredOrbitalObjects,
  loadScoredOrbitalObjects,
} from '@/domain/repositories';
import { estimateMission, missionProfiles, ScoredOrbitalObject } from '@/domain/scoring';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import {
  listSavedMissionScenarios,
  removeSavedMissionScenario,
  saveMissionScenario,
  SavedMissionScenario,
} from '@/services/persistence';
import { colors, layout, spacing, typography } from '@/theme';

import { MissionResultPanel } from './components/MissionResultPanel';
import { SavedMissionScenarios } from './components/SavedMissionScenarios';
import { MissionSimulatorForm } from './components/MissionSimulatorForm';

const initialObjects = listScoredOrbitalObjects().sort(
  (left, right) => right.scores.priority.score - left.scores.priority.score
);
const missionTypes = Object.keys(missionProfiles) as MissionType[];

function isMissionType(value: unknown): value is MissionType {
  return typeof value === 'string' && missionTypes.includes(value as MissionType);
}

export function MissionSimulatorScreen() {
  const { isDesktop } = useBreakpoint();
  const params = useLocalSearchParams<{ missionType?: string; objectId?: string }>();
  const requestedObjectId = typeof params.objectId === 'string' ? params.objectId : undefined;
  const requestedMissionType = isMissionType(params.missionType) ? params.missionType : 'inspect';
  const [catalogObjects, setCatalogObjects] = useState<ScoredOrbitalObject[]>(initialObjects);
  const [repositoryStatus, setRepositoryStatus] = useState(getOrbitalObjectRepositoryStatus);
  const [isLoadingPublicData, setIsLoadingPublicData] = useState(true);
  const [selectedObjectId, setSelectedObjectId] = useState(
    requestedObjectId ?? initialObjects[0]?.id
  );
  const [missionType, setMissionType] = useState<MissionType>(requestedMissionType);
  const [savedScenarios, setSavedScenarios] = useState<SavedMissionScenario[]>([]);
  const [persistenceMessage, setPersistenceMessage] = useState('Local persistence ready.');

  useEffect(() => {
    let isMounted = true;

    Promise.all([loadScoredOrbitalObjects(), listSavedMissionScenarios()])
      .then(([result, scenarios]) => {
        if (!isMounted) {
          return;
        }

        setCatalogObjects(
          [...result.objects].sort(
            (left, right) => right.scores.priority.score - left.scores.priority.score
          )
        );
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

  const selectedObject =
    catalogObjects.find((object) => object.id === selectedObjectId) ?? catalogObjects[0];
  const result = useMemo(
    () => (selectedObject ? estimateMission(selectedObject, missionType) : undefined),
    [missionType, selectedObject]
  );
  const highPriorityCount = catalogObjects.filter(
    (object) => object.scores.priority.level === 'high'
  ).length;
  const removableCount = catalogObjects.filter((object) =>
    ['Inspect before removal', 'Prioritize removal'].includes(object.scores.priority.decision)
  ).length;

  async function handleSaveScenario() {
    if (!selectedObject || !result) {
      return;
    }

    const nextScenarios = await saveMissionScenario(selectedObject, result);
    setSavedScenarios(nextScenarios);
    setPersistenceMessage('Scenario saved locally for comparison.');
  }

  async function handleRemoveScenario(scenarioId: string) {
    const nextScenarios = await removeSavedMissionScenario(scenarioId);
    setSavedScenarios(nextScenarios);
    setPersistenceMessage('Saved scenario removed.');
  }

  function handleApplyScenario(scenario: SavedMissionScenario) {
    setSelectedObjectId(scenario.objectId);
    setMissionType(scenario.missionType);
    setPersistenceMessage('Saved scenario loaded into the simulator.');
  }

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}>
        <SafeAreaView>
          <View style={styles.stack}>
            <View style={styles.hero}>
              <Badge label="Deterministic simulator" tone="simulated" />
              <SectionHeader
                eyebrow="Mission Simulator"
                title="Estimate practical responses before choosing a debris strategy."
                description="Choose an orbital object and simulate monitoring, inspection, avoidance, deorbit, relocation, capture or recycling. The result is deterministic decision support, not operational flight planning."
              />
            </View>

            <View style={styles.metricGrid}>
              <Metric
                detail="Targets available for simulation"
                label="Catalog objects"
                tone="cyan"
                value={catalogObjects.length.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Priority level high"
                label="High priority"
                tone="warning"
                value={highPriorityCount.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Inspection or removal candidates"
                label="Action candidates"
                tone="danger"
                value={removableCount.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail={selectedObject ? selectedObject.name : 'No target selected'}
                label="Selected target"
                tone="blue"
                value={result ? result.feasibilityScore.toString() : '0'}
                style={styles.metricCard}
              />
              <Metric
                detail="Stored on this device"
                label="Saved scenarios"
                tone="teal"
                value={savedScenarios.length.toString()}
                style={styles.metricCard}
              />
            </View>

            <DataSourceNotice isLoading={isLoadingPublicData} status={repositoryStatus} />

            {selectedObject && result ? (
              <View style={[styles.simulatorGrid, isDesktop && styles.simulatorGridDesktop]}>
                <View style={styles.formColumn}>
                  <MissionSimulatorForm
                    missionType={missionType}
                    objects={catalogObjects}
                    selectedObjectId={selectedObject.id}
                    onMissionTypeChange={setMissionType}
                    onObjectChange={setSelectedObjectId}
                  />
                </View>

                <View style={styles.resultColumn}>
                  <Card style={styles.saveCard} variant="action">
                    <View style={styles.saveCopy}>
                      <Text style={styles.saveTitle}>Current scenario</Text>
                      <Text style={styles.saveBody}>{persistenceMessage}</Text>
                    </View>
                    <Button onPress={handleSaveScenario}>Save Scenario</Button>
                  </Card>
                  <MissionResultPanel object={selectedObject} result={result} />
                </View>
              </View>
            ) : (
              <Card style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>No objects available for simulation.</Text>
                <Text style={styles.emptyBody}>
                  The simulator needs at least one catalog object from the local repository or public
                  data adapter.
                </Text>
              </Card>
            )}

            <SavedMissionScenarios
              scenarios={savedScenarios}
              onApplyScenario={handleApplyScenario}
              onRemoveScenario={handleRemoveScenario}
            />
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
  simulatorGrid: {
    gap: spacing[5],
  },
  simulatorGridDesktop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  formColumn: {
    flex: 0.95,
    minWidth: 0,
  },
  resultColumn: {
    flex: 1.05,
    gap: spacing[5],
    minWidth: 0,
  },
  saveCard: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],
    justifyContent: 'space-between',
  },
  saveCopy: {
    flex: 1,
    gap: spacing[2],
    minWidth: 220,
  },
  saveTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  saveBody: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  emptyCard: {
    gap: spacing[2],
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  emptyBody: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
});
