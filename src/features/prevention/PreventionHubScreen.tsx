import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge, Metric, SectionHeader } from '@/components/ui';
import {
  calculateResponsibleOrbitScore,
  ResponsibleOrbitInput,
} from '@/domain/scoring';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, layout, spacing, typography } from '@/theme';

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
  'passivation',
  'end-of-life planning',
  'controlled reentry',
  'graveyard orbit',
  'tracking and cataloging',
  'collision avoidance',
  'responsible mission design',
];

export function PreventionHubScreen() {
  const { isDesktop } = useBreakpoint();
  const [missionPlan, setMissionPlan] = useState<ResponsibleOrbitInput>(defaultMissionPlan);
  const result = useMemo(() => calculateResponsibleOrbitScore(missionPlan), [missionPlan]);
  const enabledCount = Object.values(missionPlan).filter(Boolean).length;

  function handleToggle(key: keyof ResponsibleOrbitInput) {
    setMissionPlan((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}>
        <SafeAreaView>
          <View style={styles.stack}>
            <View style={styles.hero}>
              <Badge label="Prevention first" tone="success" />
              <SectionHeader
                eyebrow="Prevention Hub"
                title="Design missions that create less debris in the first place."
                description="Kessler connects debris response with responsible orbital behavior: passivation, disposal planning, tracking, avoidance and circular mission design."
              />
            </View>

            <View style={styles.metricGrid}>
              <Metric
                detail="Current fictional mission plan"
                label="Responsible score"
                tone="teal"
                value={result.score.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Checklist controls enabled"
                label="Practices active"
                tone="cyan"
                value={`${enabledCount}/4`}
                style={styles.metricCard}
              />
              <Metric
                detail="Educational topics covered"
                label="Prevention topics"
                tone="blue"
                value={preventionTopics.length.toString()}
                style={styles.metricCard}
              />
              <Metric
                detail="Prototype language only"
                label="Compliance claims"
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

            <View style={styles.note}>
              <Text style={styles.noteTitle}>Model boundary</Text>
              <Text style={styles.noteBody}>
                This hub explains prevention concepts and produces deterministic prototype scores. It
                does not verify legal compliance, operational safety or real mission feasibility.
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
