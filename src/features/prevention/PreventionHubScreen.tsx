import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge, Button, Metric, VisualPageHero } from '@/components/ui';
import { visualAssets } from '@/config/visualAssets';
import {
  calculateResponsibleOrbitScore,
  ResponsibleOrbitInput,
} from '@/domain/scoring';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, layout, spacing, typography, useKesslerTheme } from '@/theme';

import { PreventionPrinciples } from './components/PreventionPrinciples';
import { PreventionScorePreview } from './components/PreventionScorePreview';
import { ResponsibleMissionChecklist } from './components/ResponsibleMissionChecklist';

const defaultMissionPlan: ResponsibleOrbitInput = {
  collisionAvoidancePlan: true,
  disposalPlan: true,
  passivationPlan: false,
  trackingPlan: true,
};

const preventionTopics = [
  'passivação',
  'planejamento de fim de vida',
  'reentrada controlada',
  'órbita cemitério',
  'rastreamento e catalogação',
  'desvio de colisão',
  'desenho responsável de missão',
];

export function PreventionHubScreen() {
  const { isDesktop, isPhone } = useBreakpoint();
  const theme = useKesslerTheme();
  const [missionPlan, setMissionPlan] = useState<ResponsibleOrbitInput>(defaultMissionPlan);
  const result = useMemo(() => calculateResponsibleOrbitScore(missionPlan), [missionPlan]);
  const enabledCount = Object.values(missionPlan).filter(Boolean).length;
  const pageBackgroundStyle = { backgroundColor: theme.colors.background.app };

  function handleToggle(key: keyof ResponsibleOrbitInput) {
    setMissionPlan((current) => ({
      ...current,
      [key]: !current[key],
    }));
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
              badge={<Badge label="Prevenção primeiro" tone="success" />}
              description="O Kessler conecta resposta a detritos com comportamento orbital responsável: passivação, descarte, rastreamento, desvio e desenho circular de missões."
              eyebrow="Central de Prevenção"
              foregroundDetail={`${result.score} pontos no plano atual`}
              foregroundImage={visualAssets.objects.servicingSatellite}
              foregroundLabel="missão responsável"
              title="Cuidar da órbita começa antes do lançamento."
              actions={
                <>
                  <Button fullWidth={isPhone} onPress={() => router.push('/missions')}>
                    Testar missão
                  </Button>
                  <Button fullWidth={isPhone} variant="secondary" onPress={() => router.push('/orbit')}>
                    Ver objetos atuais
                  </Button>
                </>
              }
            />

            <View style={styles.metricGrid}>
              <Metric
                detail="Plano fictício de missão atual"
                label="Pontuação responsável"
                tone="teal"
                value={result.score.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Controles ativos no checklist"
                label="Práticas ativas"
                tone="cyan"
                value={`${enabledCount}/4`}
                style={styles.metricCard}
              />
              <Metric
                detail="Tópicos educativos cobertos"
                label="Tópicos de prevenção"
                tone="blue"
                value={preventionTopics.length.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Apenas linguagem de protótipo"
                label="Promessas de conformidade"
                tone="warning"
                value="0"
                style={styles.metricCard}
              />
            </View>

            <View style={[styles.plannerGrid, isDesktop && styles.plannerGridDesktop]}>
              <View style={styles.plannerColumn}>
                <ResponsibleMissionChecklist value={missionPlan} onToggle={handleToggle} />
              </View>

              <View style={styles.plannerColumn}>
                <PreventionScorePreview result={result} />
              </View>
            </View>

            <PreventionPrinciples />

            <View
              style={[
                styles.note,
                {
                  backgroundColor: theme.colors.background.surface,
                  borderColor: theme.colors.border.subtle,
                },
              ]}>
              <Text style={[styles.noteTitle, { color: theme.colors.text.primary }]}>
                Limite do modelo
              </Text>
              <Text style={[styles.noteBody, { color: theme.colors.text.secondary }]}>
                Esta central explica conceitos de prevenção e gera pontuações determinísticas do
                protótipo. Ela não verifica conformidade legal, segurança operacional ou viabilidade
                real de missão.
              </Text>
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
    flexBasis: 220,
    flexGrow: 1,
  },
  plannerGrid: {
    gap: spacing[4],
  },
  plannerGridDesktop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  plannerColumn: {
    flex: 1,
    minWidth: 0,
  },
  note: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: 16,
    borderWidth: 1,
    gap: spacing[2],
    padding: spacing[4],
  },
  noteTitle: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  noteBody: {
    ...typography.caption,
    color: colors.text.secondary,
  },
});
