import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mockReuseMaterials } from '@/data';
import {
  Badge,
  Button,
  Card,
  DataSourceNotice,
  Metric,
  SectionHeader,
  VisualPageHero,
} from '@/components/ui';
import { visualAssets } from '@/config/visualAssets';
import {
  getOrbitalObjectRepositoryStatus,
  listScoredOrbitalObjects,
  loadScoredOrbitalObjects,
} from '@/domain/repositories';
import { missionProfiles, ScoredOrbitalObject } from '@/domain/scoring';
import { formatObjectStatus } from '@/features/objects/object-formatters';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { listSavedMissionScenarios, SavedMissionScenario } from '@/services/persistence';
import { colors, layout, radius, spacing, typography, useKesslerTheme } from '@/theme';

const initialObjects = listScoredOrbitalObjects();

const preventionRecommendations = [
  'Passivação',
  'Planejamento de fim de vida',
  'Reentrada controlada',
  'Órbita cemitério',
  'Rastreamento e catalogação',
  'Desvio de colisão',
  'Desenho responsável de missão',
];

const valuePillars = [
  {
    body: 'Objetos são ranqueados com pontuações transparentes de risco, reuso e prioridade.',
    label: 'Analisar',
  },
  {
    body: 'Usuários testam cenários de inspeção, desvio, retirada de órbita, captura e reciclagem.',
    label: 'Simular',
  },
  {
    body: 'O app mostra detritos orbitais como risco de segurança e oportunidade material futura.',
    label: 'Reaproveitar',
  },
  {
    body: 'Relatórios explicam limites do modelo para o protótipo não prometer precisão demais.',
    label: 'Explicar',
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
    return 'Nenhum cenário salvo ainda';
  }

  return new Date(value).toLocaleString('pt-BR');
}

export function ImpactDashboardScreen() {
  const { isDesktop, isPhone } = useBreakpoint();
  const theme = useKesslerTheme();
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
  const pageBackgroundStyle = { backgroundColor: theme.colors.background.app };

  return (
    <View style={[styles.root, pageBackgroundStyle]}>
      <ScrollView
        style={[styles.scroll, pageBackgroundStyle]}
        contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}>
        <SafeAreaView>
          <View style={styles.stack}>
            <VisualPageHero
              backgroundImage={visualAssets.backgrounds.cityImpact}
              badge={<Badge label="Visão de avaliação" tone="simulated" />}
              description="Este painel resume análise de catálogo, prioridades, simulação de missão, reaproveitamento circular e prevenção com limites honestos de protótipo."
              eyebrow="Painel de Impacto"
              foregroundDetail={`${catalogObjects.length} objetos analisados`}
              foregroundImage={visualAssets.objects.recyclingModule}
              foregroundLabel="história do projeto"
              title="Mostre o valor do Kessler OS em uma visão pronta para apresentação."
              actions={
                <>
                  <Button fullWidth={isPhone} onPress={() => router.push('/missions')}>
                    Rodar simulação
                  </Button>
                  <Button fullWidth={isPhone} variant="secondary" onPress={() => router.push('/orbit')}>
                    Abrir mapa orbital
                  </Button>
                </>
              }
            />

            <View style={styles.metricGrid}>
              <Metric
                detail="Analisados pelo repositório"
                label="Objetos analisados"
                tone="cyan"
                value={catalogObjects.length.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Nível de prioridade alto"
                label="Objetos de alta prioridade"
                tone="danger"
                value={highPriorityObjects.length.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Massa aproximada em categorias recuperáveis"
                label="Massa reaproveitável"
                tone="teal"
                value={formatMass(reusableMassEstimate)}
                style={styles.metricCard}
              />
              <Metric
                detail="Modelos determinísticos disponíveis"
                label="Missões simuladas"
                tone="blue"
                value={Object.keys(missionProfiles).length.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Tópicos de comportamento responsável"
                label="Recomendações de prevenção"
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
                    eyebrow="Narrativa de apresentação"
                    title="Kessler conecta risco, ação e reaproveitamento."
                    description="O app não é só um catálogo. Ele transforma detritos orbitais em um fluxo de decisão: descobrir objetos, priorizar atenção, simular respostas, avaliar reuso e explicar recomendações."
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
                    <Text style={styles.cardTitle}>Sinais de impacto</Text>
                    <Badge label="Modelo de protótipo" tone="simulated" />
                  </View>

                  <View style={styles.signalGrid}>
                    <View style={styles.signal}>
                      <Text style={styles.signalValue}>{averageRisk}</Text>
                      <Text style={styles.signalLabel}>Risco médio</Text>
                    </View>
                    <View style={styles.signal}>
                      <Text style={styles.signalValue}>{averagePriority}</Text>
                      <Text style={styles.signalLabel}>Prioridade média</Text>
                    </View>
                    <View style={styles.signal}>
                      <Text style={styles.signalValue}>{reuseCandidates.length}</Text>
                      <Text style={styles.signalLabel}>Candidatos a reuso</Text>
                    </View>
                  </View>
                </Card>
              </View>

              <View style={styles.sideColumn}>
                <Card style={styles.card}>
                  <Text style={styles.cardTitle}>Objetos com mais atenção</Text>
                  <View style={styles.rankList}>
                    {highPriorityObjects.slice(0, 4).map((object, index) => (
                      <View key={object.id} style={styles.rankItem}>
                        <Text style={styles.rankNumber}>{index + 1}</Text>
                        <View style={styles.rankCopy}>
                          <Text style={styles.rankTitle}>{object.name}</Text>
                          <Text style={styles.rankMeta}>
                            {object.orbitRegion} · {formatObjectStatus(object.status)} · prioridade{' '}
                            {object.scores.priority.score}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </Card>

                <Card style={styles.card}>
                  <Text style={styles.cardTitle}>Estado das simulações salvas</Text>
                  <Text style={styles.bodyText}>
                    {savedScenarios.length} cenário{savedScenarios.length === 1 ? '' : 's'} salvo
                    {savedScenarios.length === 1 ? '' : 's'} disponível
                    {savedScenarios.length === 1 ? '' : 's'} localmente para comparação.
                  </Text>
                  <Text style={styles.mutedText}>
                    Mais recente: {formatSavedAt(latestSavedScenario?.savedAt)}
                  </Text>
                  <Button variant="secondary" onPress={() => router.push('/missions')}>
                    Abrir cenários salvos
                  </Button>
                </Card>

                <Card style={styles.card}>
                  <Text style={styles.cardTitle}>Limites do protótipo</Text>
                  <View style={styles.boundaryList}>
                    <Text style={styles.boundary}>Não há previsão operacional de colisão.</Text>
                    <Text style={styles.boundary}>Não há comprovação de conformidade legal.</Text>
                    <Text style={styles.boundary}>Não há composição material confirmada.</Text>
                    <Text style={styles.boundary}>Todos os relatórios usam templates determinísticos.</Text>
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
