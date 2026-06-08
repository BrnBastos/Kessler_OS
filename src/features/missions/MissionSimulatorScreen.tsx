import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, DataSourceNotice, Metric, VisualPageHero } from '@/components/ui';
import { visualAssets } from '@/config/visualAssets';
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
import { colors, layout, spacing, typography, useKesslerTheme } from '@/theme';

import { getObjectVisualAsset } from '../objects/object-visuals';
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
  const { isDesktop, isPhone } = useBreakpoint();
  const theme = useKesslerTheme();
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
  const [persistenceMessage, setPersistenceMessage] = useState(
    'Histórico local pronto neste dispositivo.'
  );

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
    ['Inspecionar antes da remoção', 'Priorizar remoção'].includes(object.scores.priority.decision)
  ).length;
  const pageBackgroundStyle = { backgroundColor: theme.colors.background.app };

  async function handleSaveScenario() {
    if (!selectedObject || !result) {
      return;
    }

    const nextScenarios = await saveMissionScenario(selectedObject, result);
    setSavedScenarios(nextScenarios);
    setPersistenceMessage('Informação salva localmente no histórico recente.');
  }

  async function handleRemoveScenario(scenarioId: string) {
    const nextScenarios = await removeSavedMissionScenario(scenarioId);
    setSavedScenarios(nextScenarios);
    setPersistenceMessage('Registro local removido do histórico.');
  }

  function handleApplyScenario(scenario: SavedMissionScenario) {
    setSelectedObjectId(scenario.objectId);
    setMissionType(scenario.missionType);
    setPersistenceMessage('Registro do histórico carregado no simulador.');
  }

  return (
    <View style={[styles.root, pageBackgroundStyle]}>
      <ScrollView
        style={[styles.scroll, pageBackgroundStyle]}
        contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}>
        <SafeAreaView>
          <View style={styles.stack}>
            <VisualPageHero
              backgroundImage={visualAssets.backgrounds.observatory}
              description="Escolha um objeto orbital e simule monitoramento, inspeção, desvio, retirada de órbita, realocação, captura ou reciclagem. O resultado apoia decisões no protótipo, mas não é planejamento operacional de voo."
              eyebrow="Simulador de Missão"
              foregroundImage={
                selectedObject ? getObjectVisualAsset(selectedObject) : visualAssets.objects.servicingSatellite
              }
              title="Estime respostas práticas antes de escolher uma estratégia."
              actions={
                selectedObject ? (
                  <>
                    <Button
                      fullWidth={isPhone}
                      onPress={() =>
                        router.push({
                          pathname: '/orbit/[id]',
                          params: { id: selectedObject.id },
                        })
                      }>
                      Abrir ficha
                    </Button>
                    <Button fullWidth={isPhone} variant="secondary" onPress={() => router.push('/priority')}>
                      Ver prioridades
                    </Button>
                  </>
                ) : (
                  <Button fullWidth={isPhone} onPress={() => router.push('/priority')}>
                    Ver prioridades
                  </Button>
                )
              }
            />

            <View style={styles.metricGrid}>
              <Metric
                detail="Alvos disponíveis para simulação"
                label="Objetos no catálogo"
                tone="cyan"
                value={catalogObjects.length.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Nível de prioridade alto"
                label="Alta prioridade"
                tone="warning"
                value={highPriorityCount.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Candidatos a inspeção ou remoção"
                label="Candidatos a ação"
                tone="danger"
                value={removableCount.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail={selectedObject ? selectedObject.name : 'Nenhum alvo selecionado'}
                label="Alvo selecionado"
                tone="blue"
                value={result ? result.feasibilityScore.toString() : '0'}
                style={styles.metricCard}
              />
              <Metric
                detail="Armazenados neste dispositivo"
                label="Histórico recente"
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
                  <Card style={[styles.saveCard, isPhone && styles.saveCardPhone]} variant="action">
                    <View style={styles.saveCopy}>
                      <Text style={styles.saveTitle}>Salvar informação localmente</Text>
                      <Text style={styles.saveBody}>
                        {persistenceMessage} O registro guarda alvo, tipo de missão, decisão e
                        pontuações principais via AsyncStorage.
                      </Text>
                    </View>
                    <Button fullWidth={isPhone} onPress={handleSaveScenario}>
                      Salvar no histórico
                    </Button>
                  </Card>
                  <MissionResultPanel object={selectedObject} result={result} />
                </View>
              </View>
            ) : (
              <Card style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>Nenhum objeto disponível para simulação.</Text>
                <Text style={styles.emptyBody}>
                  O simulador precisa de pelo menos um objeto do catálogo local ou do adaptador de
                  dados públicos.
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
  saveCardPhone: {
    flexDirection: 'column',
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
