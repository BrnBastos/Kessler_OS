import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge, DataSourceNotice, Metric, SectionHeader } from '@/components/ui';
import {
  getOrbitalObjectRepositoryStatus,
  listScoredOrbitalObjects,
  loadScoredOrbitalObjects,
} from '@/domain/repositories';
import { ScoredOrbitalObject } from '@/domain/scoring';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, layout, spacing, typography } from '@/theme';

import {
  PriorityDecisionFilter,
  PriorityFilters,
  PriorityObjectTypeFilter,
  PriorityOrbitFilter,
  PrioritySortMode,
} from './components/PriorityFilters';
import { PriorityList } from './components/PriorityList';

function sortByPriority(objects: ScoredOrbitalObject[]) {
  return [...objects].sort((left, right) => right.scores.priority.score - left.scores.priority.score);
}

const initialPriorityObjects = sortByPriority(listScoredOrbitalObjects());

function getSortedObjects(objects: ScoredOrbitalObject[], sortMode: PrioritySortMode) {
  const scoreKey =
    sortMode === 'priority' ? 'priority' : sortMode === 'risk' ? 'risk' : 'forgeValue';

  return [...objects].sort((left, right) => right.scores[scoreKey].score - left.scores[scoreKey].score);
}

export function PriorityQueueScreen() {
  const { isDesktop } = useBreakpoint();
  const [allPriorityObjects, setAllPriorityObjects] =
    useState<ScoredOrbitalObject[]>(initialPriorityObjects);
  const [repositoryStatus, setRepositoryStatus] = useState(getOrbitalObjectRepositoryStatus);
  const [isLoadingPublicData, setIsLoadingPublicData] = useState(true);
  const [objectType, setObjectType] = useState<PriorityObjectTypeFilter>('all');
  const [orbitRegion, setOrbitRegion] = useState<PriorityOrbitFilter>('all');
  const [decision, setDecision] = useState<PriorityDecisionFilter>('all');
  const [sortMode, setSortMode] = useState<PrioritySortMode>('priority');

  useEffect(() => {
    let isMounted = true;

    loadScoredOrbitalObjects()
      .then((result) => {
        if (!isMounted) {
          return;
        }

        setAllPriorityObjects(sortByPriority(result.objects));
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

  const decisionOptions = useMemo(
    () => Array.from(new Set(allPriorityObjects.map((object) => object.scores.priority.decision))).sort(),
    [allPriorityObjects]
  );

  const filteredObjects = useMemo(() => {
    const filtered = allPriorityObjects.filter((object) => {
      const typeMatches = objectType === 'all' || object.type === objectType;
      const orbitMatches = orbitRegion === 'all' || object.orbitRegion === orbitRegion;
      const decisionMatches = decision === 'all' || object.scores.priority.decision === decision;

      return typeMatches && orbitMatches && decisionMatches;
    });

    return getSortedObjects(filtered, sortMode);
  }, [allPriorityObjects, decision, objectType, orbitRegion, sortMode]);
  const topObject = filteredObjects[0] ?? allPriorityObjects[0];
  const highPriorityCount = allPriorityObjects.filter(
    (object) => object.scores.priority.level === 'high'
  ).length;
  const inspectOrRemovalCount = allPriorityObjects.filter((object) =>
    ['Inspecionar antes da remoção', 'Priorizar remoção'].includes(object.scores.priority.decision)
  ).length;
  const averageRisk =
    Math.round(
      allPriorityObjects.reduce((total, object) => total + object.scores.risk.score, 0) /
        allPriorityObjects.length
    ) || 0;

  function handleReset() {
    setObjectType('all');
    setOrbitRegion('all');
    setDecision('all');
    setSortMode('priority');
  }

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}>
        <SafeAreaView>
          <View style={styles.stack}>
            <View style={styles.hero}>
              <Badge label="Fila determinística" tone="simulated" />
              <SectionHeader
                eyebrow="Fila de Prioridade"
                title="Veja quais objetos orbitais merecem atenção primeiro."
                description="A fila combina risco, valor de reuso, viabilidade e confiança em um sinal transparente de prioridade. Ela serve para comparação, não para operações profissionais de colisão."
              />
            </View>

            <View style={styles.metricGrid}>
              <Metric
                detail={topObject ? topObject.name : 'Nenhum objeto selecionado'}
                label="Maior prioridade"
                tone="danger"
                value={topObject ? topObject.scores.priority.score.toString() : '0'}
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
                detail="Inspeção ou remoção recomendada"
                label="Candidatos a ação"
                tone="cyan"
                value={inspectOrRemovalCount.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="No repositório local"
                label="Risco médio"
                tone="blue"
                value={averageRisk.toString()}
                style={styles.metricCard}
              />
            </View>

            <DataSourceNotice isLoading={isLoadingPublicData} status={repositoryStatus} />

            <PriorityFilters
              decision={decision}
              decisionOptions={decisionOptions}
              objectType={objectType}
              orbitRegion={orbitRegion}
              sortMode={sortMode}
              onDecisionChange={setDecision}
              onObjectTypeChange={setObjectType}
              onOrbitRegionChange={setOrbitRegion}
              onReset={handleReset}
              onSortModeChange={setSortMode}
              resultCount={filteredObjects.length}
            />

            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Fila de atenção priorizada</Text>
              <Text style={styles.sectionNote}>
                Ordenada por {sortMode === 'forge' ? 'valor de reuso' : sortMode === 'risk' ? 'risco' : 'prioridade'}
              </Text>
            </View>

            <PriorityList objects={filteredObjects} />
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
    textTransform: 'capitalize',
  },
});
