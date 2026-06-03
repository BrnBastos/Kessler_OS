import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge, Button, Card, DataSourceNotice, Metric, SectionHeader } from '@/components/ui';
import {
  getOrbitalObjectRepositoryStatus,
  listScoredOrbitalObjects,
  loadScoredOrbitalObjects,
} from '@/domain/repositories';
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

const initialCatalogObjects = listScoredOrbitalObjects();

function SelectedObjectDetails({ object }: { object?: ScoredOrbitalObject }) {
  if (!object) {
    return (
      <Card style={styles.detailCard}>
        <Text style={styles.detailTitle}>Selecione um objeto para abrir os detalhes.</Text>
        <Text style={styles.detailBody}>
          Escolha um objeto no catálogo ou no mapa para revisar os níveis e abrir sua ficha completa.
        </Text>
      </Card>
    );
  }

  return (
    <Card style={styles.detailCard}>
      <View style={styles.detailHeader}>
        <View style={styles.detailCopy}>
          <Text style={styles.detailEyebrow}>Objeto em foco</Text>
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
          label="Nível de risco"
          reason={object.scores.risk.summary}
          score={object.scores.risk.score}
          tone={getScoreTone(object.scores.risk.level)}
          style={styles.scoreBadge}
        />
        <Badge
          label="Valor de reuso"
          reason={object.scores.forgeValue.summary}
          score={object.scores.forgeValue.score}
          tone={getScoreTone(object.scores.forgeValue.level)}
          style={styles.scoreBadge}
        />
        <Badge
          label="Prioridade"
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
          <Text style={styles.factLabel}>Massa</Text>
          <Text style={styles.factValue}>{formatEstimate(object.estimatedMassKg, ' kg')}</Text>
        </View>
        <View style={styles.detailFact}>
          <Text style={styles.factLabel}>Inclinação</Text>
          <Text style={styles.factValue}>{formatEstimate(object.inclinationDeg, '°')}</Text>
        </View>
        <View style={styles.detailFact}>
          <Text style={styles.factLabel}>Lançamento</Text>
          <Text style={styles.factValue}>{object.launchYear ?? 'Desconhecido'}</Text>
        </View>
      </View>

      <View style={styles.decisionPanel}>
        <Text style={styles.decisionLabel}>Decisão recomendada</Text>
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
        Abrir ficha do objeto
      </Button>
    </Card>
  );
}

export function ObjectExplorerScreen() {
  const { isDesktop } = useBreakpoint();
  const [catalogObjects, setCatalogObjects] =
    useState<ScoredOrbitalObject[]>(initialCatalogObjects);
  const [repositoryStatus, setRepositoryStatus] = useState(getOrbitalObjectRepositoryStatus);
  const [isLoadingPublicData, setIsLoadingPublicData] = useState(true);
  const [objectType, setObjectType] = useState<ObjectTypeFilter>('all');
  const [orbitRegion, setOrbitRegion] = useState<OrbitRegionFilter>('all');
  const [selectedObjectId, setSelectedObjectId] = useState(initialCatalogObjects[0]?.id);

  useEffect(() => {
    let isMounted = true;

    loadScoredOrbitalObjects()
      .then((result) => {
        if (!isMounted) {
          return;
        }

        setCatalogObjects(result.objects);
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

  const inactiveObjects = catalogObjects.filter((object) => object.status !== 'active');
  const leoObjects = catalogObjects.filter((object) => object.orbitRegion === 'LEO');
  const uncertainObjects = catalogObjects.filter(
    (object) => object.dataConfidence === 'unknown' || object.dataConfidence === 'simulated'
  );
  const averagePriority =
    Math.round(
      catalogObjects.reduce((total, object) => total + object.scores.priority.score, 0) /
        catalogObjects.length
    ) || 0;
  const filteredObjects = useMemo(
    () =>
      catalogObjects.filter((object) => {
        const typeMatches = objectType === 'all' || object.type === objectType;
        const orbitMatches = orbitRegion === 'all' || object.orbitRegion === orbitRegion;

        return typeMatches && orbitMatches;
      }),
    [catalogObjects, objectType, orbitRegion]
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
              <Badge label="Repositório + modelo de pontuação" tone="simulated" />
              <SectionHeader
                eyebrow="Exploração de objetos orbitais"
                title="Explore objetos monitorados com pontuações transparentes."
                description="Filtre por tipo e região orbital, foque um objeto e revise risco, valor de reuso e prioridade. Estes são sinais simplificados de planejamento, não previsões orbitais profissionais."
              />
            </View>

            <View style={styles.metricGrid}>
              <Metric
                detail="Carregados pelo repositório"
                label="Objetos no catálogo"
                tone="cyan"
                value={catalogObjects.length.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Inativos, fragmentos ou desconhecidos"
                label="Candidatos de atenção"
                tone="danger"
                value={inactiveObjects.length.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Úteis para o foco inicial do MVP"
                label="Objetos em LEO"
                tone="blue"
                value={leoObjects.length.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="No catálogo ativo"
                label="Base de prioridade"
                tone="warning"
                value={averagePriority.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Desconhecidos ou simulados"
                label="Pedem revisão"
                tone="warning"
                value={uncertainObjects.length.toString()}
                style={styles.metricCard}
              />
            </View>

            <DataSourceNotice isLoading={isLoadingPublicData} status={repositoryStatus} />

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
                  <Text style={styles.sectionTitle}>Catálogo de objetos</Text>
                  <Text style={styles.sectionNote}>
                    Toque em um card para inspecionar pontuações e detalhes locais
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
