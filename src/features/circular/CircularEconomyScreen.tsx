import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mockReuseMaterials } from '@/data';
import { Badge, Button, Card, DataSourceNotice, Metric, SectionHeader } from '@/components/ui';
import {
  getOrbitalObjectRepositoryStatus,
  listScoredOrbitalObjects,
  loadScoredOrbitalObjects,
} from '@/domain/repositories';
import { ScoredOrbitalObject } from '@/domain/scoring';
import { DecisionReportPanel } from '@/features/reports/DecisionReportPanel';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, layout, radius, spacing, typography } from '@/theme';

import {
  formatObjectStatus,
  formatObjectType,
  getConfidenceLabel,
  getConfidenceTone,
} from '../objects/object-formatters';
import { MaterialUseCases } from './components/MaterialUseCases';
import { ReusePotentialPanel } from './components/ReusePotentialPanel';

const initialObjects = listScoredOrbitalObjects().sort(
  (left, right) => right.scores.forgeValue.score - left.scores.forgeValue.score
);

function getEstimatesForObject(object?: ScoredOrbitalObject) {
  if (!object) {
    return [];
  }

  const estimates = mockReuseMaterials.filter((estimate) => estimate.objectType === object.type);

  if (estimates.length > 0) {
    return estimates;
  }

  return mockReuseMaterials.filter((estimate) => estimate.material === 'unknown');
}

export function CircularEconomyScreen() {
  const { isDesktop } = useBreakpoint();
  const params = useLocalSearchParams<{ objectId?: string }>();
  const requestedObjectId = typeof params.objectId === 'string' ? params.objectId : undefined;
  const [catalogObjects, setCatalogObjects] = useState<ScoredOrbitalObject[]>(initialObjects);
  const [repositoryStatus, setRepositoryStatus] = useState(getOrbitalObjectRepositoryStatus);
  const [isLoadingPublicData, setIsLoadingPublicData] = useState(true);
  const [selectedObjectId, setSelectedObjectId] = useState(
    requestedObjectId ?? initialObjects[0]?.id
  );

  useEffect(() => {
    let isMounted = true;

    loadScoredOrbitalObjects()
      .then((result) => {
        if (!isMounted) {
          return;
        }

        setCatalogObjects(
          [...result.objects].sort(
            (left, right) => right.scores.forgeValue.score - left.scores.forgeValue.score
          )
        );
        setRepositoryStatus(result.status);
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
  const estimates = useMemo(() => getEstimatesForObject(selectedObject), [selectedObject]);
  const highForgeCount = catalogObjects.filter(
    (object) => object.scores.forgeValue.level === 'high'
  ).length;
  const reuseCandidateCount = catalogObjects.filter(
    (object) => object.scores.forgeValue.score >= 40
  ).length;
  const estimatedMaterialCoverage = estimates.reduce(
    (total, estimate) => total + estimate.estimatedSharePct,
    0
  );

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}>
        <SafeAreaView>
          <View style={styles.stack}>
            <View style={styles.hero}>
              <Badge label="Laboratório de economia circular" tone="simulated" />
              <SectionHeader
                eyebrow="Reaproveitamento Orbital"
                title="Explore quando lixo orbital pode virar valor para missões futuras."
                description="Compare redução de risco, potencial de reuso, sinais de material e caminhos responsáveis de descarte. O laboratório mantém estimativas sinalizadas por confiança."
              />
            </View>

            <View style={styles.metricGrid}>
              <Metric
                detail="Do repositório e do adaptador público"
                label="Objetos no catálogo"
                tone="cyan"
                value={catalogObjects.length.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Nível alto de valor de reuso"
                label="Reuso forte"
                tone="teal"
                value={highForgeCount.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Valor de reuso 40 ou maior"
                label="Candidatos a reuso"
                tone="blue"
                value={reuseCandidateCount.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail={selectedObject ? selectedObject.name : 'Nenhum objeto selecionado'}
                label="Cobertura material"
                tone="warning"
                value={`${Math.min(100, estimatedMaterialCoverage)}%`}
                style={styles.metricCard}
              />
            </View>

            <DataSourceNotice isLoading={isLoadingPublicData} status={repositoryStatus} />

            {selectedObject ? (
              <View style={[styles.labGrid, isDesktop && styles.labGridDesktop]}>
                <View style={styles.selectorColumn}>
                  <Card style={styles.selectorCard}>
                    <View style={styles.selectorHeader}>
                      <Text style={styles.selectorTitle}>Candidatos à recuperação</Text>
                      <Text style={styles.selectorDescription}>
                        Selecione um objeto para inspecionar seus materiais de reuso e caminhos
                        circulares.
                      </Text>
                    </View>

                    <View style={styles.objectList}>
                      {catalogObjects.map((object) => {
                        const selected = object.id === selectedObject.id;

                        return (
                          <Pressable
                            accessibilityRole="button"
                            key={object.id}
                            onPress={() => setSelectedObjectId(object.id)}
                            style={({ pressed }) => [
                              styles.objectOption,
                              selected && styles.objectOptionActive,
                              pressed && styles.pressed,
                            ]}>
                            <View style={styles.objectHeader}>
                              <Text style={styles.objectName}>{object.name}</Text>
                              <Badge
                                label={getConfidenceLabel(object.dataConfidence)}
                                tone={getConfidenceTone(object.dataConfidence)}
                              />
                            </View>
                            <Text style={styles.objectMeta}>
                              {formatObjectType(object.type)} · {object.orbitRegion} ·{' '}
                              {formatObjectStatus(object.status)}
                            </Text>
                            <View style={styles.objectScores}>
                              <Badge
                                label="Reuso"
                                score={object.scores.forgeValue.score}
                                tone={object.scores.forgeValue.score >= 40 ? 'success' : 'info'}
                              />
                              <Badge
                                label="Risco"
                                score={object.scores.risk.score}
                                tone={object.scores.risk.score >= 70 ? 'danger' : 'warning'}
                              />
                            </View>
                          </Pressable>
                        );
                      })}
                    </View>
                  </Card>
                </View>

                <View style={styles.detailColumn}>
                  <ReusePotentialPanel object={selectedObject} estimates={estimates} />
                  <DecisionReportPanel
                    context="circular"
                    object={selectedObject}
                    materialEstimates={estimates}
                  />
                  <MaterialUseCases estimates={estimates} />
                  <Card style={styles.actionCard} variant="action">
                    <View style={styles.actionCopy}>
                      <Text style={styles.actionTitle}>Teste o caminho de recuperação como missão.</Text>
                      <Text style={styles.actionBody}>
                        Valor circular só importa se inspeção, captura ou descarte puderem ser
                        modelados com responsabilidade.
                      </Text>
                    </View>
                    <View style={styles.actions}>
                      <Button
                        variant="secondary"
                        onPress={() =>
                          router.push({
                            pathname: '/orbit/[id]',
                            params: { id: selectedObject.id },
                          })
                        }>
                        Abrir ficha
                      </Button>
                      <Button
                        onPress={() =>
                          router.push({
                            pathname: '/missions',
                            params: { missionType: 'recycle', objectId: selectedObject.id },
                          })
                        }>
                        Simular reciclagem
                      </Button>
                    </View>
                  </Card>
                </View>
              </View>
            ) : (
              <Card style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>Nenhum objeto de economia circular disponível.</Text>
                <Text style={styles.emptyBody}>
                  O laboratório precisa de pelo menos um objeto orbital do repositório.
                </Text>
              </Card>
            )}
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
  labGrid: {
    gap: spacing[5],
  },
  labGridDesktop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  selectorColumn: {
    flex: 0.9,
    minWidth: 0,
  },
  detailColumn: {
    flex: 1.1,
    gap: spacing[5],
    minWidth: 0,
  },
  selectorCard: {
    gap: spacing[5],
  },
  selectorHeader: {
    gap: spacing[2],
  },
  selectorTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  selectorDescription: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  objectList: {
    gap: spacing[3],
  },
  objectOption: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing[3],
    padding: spacing[4],
  },
  objectOptionActive: {
    backgroundColor: 'rgba(34, 211, 238, 0.14)',
    borderColor: 'rgba(34, 211, 238, 0.34)',
  },
  objectHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  objectName: {
    ...typography.bodySmall,
    color: colors.text.primary,
    flex: 1,
    fontWeight: '700',
    minWidth: 160,
  },
  objectMeta: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  objectScores: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  actionCard: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],
    justifyContent: 'space-between',
  },
  actionCopy: {
    flex: 1,
    gap: spacing[2],
    minWidth: 220,
  },
  actionTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  actionBody: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  actions: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
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
  pressed: {
    opacity: 0.72,
  },
});
