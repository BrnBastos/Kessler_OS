import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mockReuseMaterials } from '@/data';
import { Badge, Button, Card, DataSourceNotice, Metric } from '@/components/ui';
import { visualAssets } from '@/config/visualAssets';
import {
  getOrbitalObjectRepositoryStatus,
  listScoredOrbitalObjects,
  loadScoredOrbitalObjects,
} from '@/domain/repositories';
import { ScoredOrbitalObject } from '@/domain/scoring';
import { DecisionReportPanel } from '@/features/reports/DecisionReportPanel';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, layout, radius, spacing, typography, useKesslerTheme } from '@/theme';

import {
  formatObjectStatus,
  formatObjectType,
  getConfidenceLabel,
  getConfidenceTone,
} from '../objects/object-formatters';
import { getObjectVisualAsset } from '../objects/object-visuals';
import { MaterialUseCases } from './components/MaterialUseCases';
import { ReusePotentialPanel } from './components/ReusePotentialPanel';

const initialObjects = listScoredOrbitalObjects().sort(
  (left, right) => right.scores.forgeValue.score - left.scores.forgeValue.score
);

const circularFlowSteps = [
  {
    body: 'Um satélite, estágio ou fragmento deixa de cumprir função, mas continua ocupando uma órbita útil.',
    label: '01',
    title: 'Objeto abandonado',
  },
  {
    body: 'A primeira decisão é observar massa, risco, confiança dos dados e acesso orbital antes de prometer reuso.',
    label: '02',
    title: 'Inspeção',
  },
  {
    body: 'Materiais e componentes são estimados com clareza sobre incerteza, caminho preferido e limite do protótipo.',
    label: '03',
    title: 'Separação',
  },
  {
    body: 'O melhor resultado pode ser reciclar, reparar, usar como plataforma de teste ou descartar com segurança.',
    label: '04',
    title: 'Nova função',
  },
];

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
  const { isDesktop, isPhone } = useBreakpoint();
  const theme = useKesslerTheme();
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
  const pageBackgroundStyle = { backgroundColor: theme.colors.background.app };
  const heroOverlayColors = [
    'rgba(2, 6, 23, 0.96)',
    'rgba(2, 6, 23, 0.48)',
    'rgba(2, 6, 23, 0.94)',
  ] as const;

  return (
    <View style={[styles.root, pageBackgroundStyle]}>
      <ScrollView
        style={[styles.scroll, pageBackgroundStyle]}
        contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}>
        <SafeAreaView>
          <View style={styles.stack}>
            <View
              style={[
                styles.heroPanel,
                {
                  backgroundColor: theme.colors.background.surface,
                  borderColor: theme.colors.border.subtle,
                },
              ]}>
              <Image source={visualAssets.backgrounds.reuseLab} contentFit="cover" style={styles.heroImage} />
              <LinearGradient
                colors={heroOverlayColors}
                start={{ x: 0, y: 0.1 }}
                end={{ x: 1, y: 1 }}
                style={styles.heroOverlay}
              />
              <View style={[styles.heroContent, isDesktop && styles.heroContentDesktop]}>
                <View style={styles.heroCopy}>
                  <Text style={[styles.heroTitle, isPhone && styles.heroTitlePhone]}>
                    Nem todo objeto abandonado precisa continuar sendo lixo.
                  </Text>
                  <Text style={styles.heroDescription}>
                    O Kessler OS compara risco, material e missão para imaginar caminhos responsáveis:
                    recuperar o que faz sentido e descartar com segurança o que não deve voltar a ser usado.
                  </Text>
                  {selectedObject && (
                    <View style={[styles.heroActions, isPhone && styles.heroActionsPhone]}>
                      <Button
                        fullWidth={isPhone}
                        onPress={() =>
                          router.push({
                            pathname: '/missions',
                            params: { missionType: 'recycle', objectId: selectedObject.id },
                          })
                        }>
                        Simular reciclagem
                      </Button>
                      <Button
                        fullWidth={isPhone}
                        variant="secondary"
                        onPress={() =>
                          router.push({
                            pathname: '/orbit/[id]',
                            params: { id: selectedObject.id },
                          })
                        }>
                        Ver objeto em foco
                      </Button>
                    </View>
                  )}
                </View>

                <View
                  style={[
                    styles.heroObjectStage,
                    {
                      backgroundColor: theme.isLightMode
                        ? 'rgba(64, 109, 140, 0.52)'
                        : 'rgba(2, 6, 23, 0.42)',
                      borderColor: theme.colors.border.subtle,
                    },
                  ]}>
                  <View style={[styles.heroOrbitRing, styles.heroOrbitOuter]} />
                  <View style={[styles.heroOrbitRing, styles.heroOrbitInner]} />
                  <Image
                    source={visualAssets.objects.recyclingModule}
                    contentFit="contain"
                    style={styles.heroObject}
                  />
                </View>
              </View>
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

            <Card style={styles.flowCard}>
              <View style={styles.flowHeader}>
                <Text style={styles.flowEyebrow}>Do abandono ao recurso</Text>
                <Text style={styles.flowTitle}>Reaproveitar começa com uma decisão responsável.</Text>
                <Text style={styles.flowDescription}>
                  A tela organiza o caminho em etapas simples para evitar prometer reciclagem quando
                  inspeção, risco ou incerteza ainda pedem cuidado.
                </Text>
              </View>
              <View style={[styles.flowSteps, isDesktop && styles.flowStepsDesktop]}>
                {circularFlowSteps.map((step) => (
                  <View key={step.label} style={styles.flowStep}>
                    <Text style={styles.flowStepLabel}>{step.label}</Text>
                    <Text style={styles.flowStepTitle}>{step.title}</Text>
                    <Text style={styles.flowStepBody}>{step.body}</Text>
                  </View>
                ))}
              </View>
            </Card>

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
                            <View style={styles.objectPreview}>
                              <View style={styles.objectThumb}>
                                <View style={[styles.objectThumbRing, styles.objectThumbRingOuter]} />
                                <View style={[styles.objectThumbRing, styles.objectThumbRingInner]} />
                                <Image
                                  source={getObjectVisualAsset(object)}
                                  contentFit="contain"
                                  style={styles.objectThumbImage}
                                />
                              </View>
                              <View style={styles.objectCopy}>
                                <View style={styles.objectHeader}>
                                  <Text numberOfLines={2} style={styles.objectName}>
                                    {object.name}
                                  </Text>
                                  <Badge
                                    label={getConfidenceLabel(object.dataConfidence)}
                                    tone={getConfidenceTone(object.dataConfidence)}
                                  />
                                </View>
                                <Text style={styles.objectMeta}>
                                  {formatObjectType(object.type)} · {object.orbitRegion} ·{' '}
                                  {formatObjectStatus(object.status)}
                                </Text>
                              </View>
                            </View>
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
                    <View style={[styles.actions, isPhone && styles.actionsPhone]}>
                      <Button
                        fullWidth={isPhone}
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
                        fullWidth={isPhone}
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
  heroPanel: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.xl,
    borderWidth: 1,
    minHeight: 560,
    overflow: 'hidden',
  },
  heroImage: {
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
  heroOverlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  heroContent: {
    flex: 1,
    gap: spacing[8],
    justifyContent: 'space-between',
    minHeight: 560,
    padding: spacing[5],
  },
  heroContentDesktop: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing[8],
  },
  heroCopy: {
    flex: 1,
    gap: spacing[5],
    maxWidth: 720,
  },
  heroTitle: {
    ...typography.display,
    color: colors.text.primary,
    letterSpacing: 0,
  },
  heroTitlePhone: {
    fontSize: 39,
    lineHeight: 46,
  },
  heroDescription: {
    ...typography.body,
    color: colors.text.secondary,
    maxWidth: 660,
  },
  heroActions: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  heroActionsPhone: {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  heroObjectStage: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(2, 6, 23, 0.42)',
    borderColor: colors.border.subtle,
    borderRadius: radius.xl,
    borderWidth: 1,
    flex: 0.72,
    minHeight: 300,
    overflow: 'hidden',
  },
  heroOrbitRing: {
    borderColor: 'rgba(45, 212, 191, 0.22)',
    borderRadius: radius.pill,
    borderWidth: 1,
    position: 'absolute',
  },
  heroOrbitOuter: {
    height: 340,
    right: -72,
    top: 24,
    transform: [{ rotate: '-18deg' }, { scaleX: 1.28 }],
    width: 240,
  },
  heroOrbitInner: {
    bottom: -42,
    height: 250,
    left: 20,
    transform: [{ rotate: '28deg' }, { scaleX: 1.22 }],
    width: 176,
  },
  heroObject: {
    bottom: -36,
    height: '78%',
    position: 'absolute',
    right: -24,
    width: '78%',
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
  flowCard: {
    gap: spacing[5],
  },
  flowHeader: {
    gap: spacing[2],
    maxWidth: 760,
  },
  flowEyebrow: {
    ...typography.caption,
    color: colors.accent.teal,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  flowTitle: {
    ...typography.h2,
    color: colors.text.primary,
  },
  flowDescription: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  flowSteps: {
    gap: spacing[3],
  },
  flowStepsDesktop: {
    flexDirection: 'row',
  },
  flowStep: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.lg,
    borderWidth: 1,
    flex: 1,
    gap: spacing[2],
    minHeight: 170,
    padding: spacing[4],
  },
  flowStepLabel: {
    ...typography.caption,
    color: colors.accent.cyan,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  flowStepTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  flowStepBody: {
    ...typography.bodySmall,
    color: colors.text.secondary,
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
  objectPreview: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing[3],
  },
  objectThumb: {
    backgroundColor: 'rgba(2, 6, 23, 0.52)',
    borderColor: colors.border.subtle,
    borderRadius: radius.lg,
    borderWidth: 1,
    height: 82,
    overflow: 'hidden',
    width: 82,
  },
  objectThumbRing: {
    borderColor: 'rgba(56, 232, 255, 0.20)',
    borderRadius: radius.pill,
    borderWidth: 1,
    position: 'absolute',
  },
  objectThumbRingOuter: {
    bottom: -28,
    height: 100,
    right: -22,
    transform: [{ rotate: '-22deg' }, { scaleX: 1.2 }],
    width: 72,
  },
  objectThumbRingInner: {
    bottom: -8,
    height: 64,
    right: 8,
    transform: [{ rotate: '24deg' }, { scaleX: 1.18 }],
    width: 44,
  },
  objectThumbImage: {
    bottom: -8,
    height: '86%',
    position: 'absolute',
    right: -8,
    width: '86%',
  },
  objectCopy: {
    flex: 1,
    gap: spacing[2],
    minWidth: 0,
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
  actionsPhone: {
    alignItems: 'stretch',
    flexDirection: 'column',
    width: '100%',
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
