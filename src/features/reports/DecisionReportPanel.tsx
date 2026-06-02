import { StyleSheet, Text, View } from 'react-native';

import { Badge, Card } from '@/components/ui';
import { ReuseMaterialEstimate } from '@/domain/models';
import { MissionEstimate, ScoredOrbitalObject } from '@/domain/scoring';
import { generateDecisionReport, DecisionReportContext } from '@/services/ai/report-generator';
import { colors, radius, spacing, typography } from '@/theme';

type DecisionReportPanelProps = {
  context: DecisionReportContext;
  materialEstimates?: ReuseMaterialEstimate[];
  missionEstimate?: MissionEstimate;
  object: ScoredOrbitalObject;
};

export function DecisionReportPanel({
  context,
  materialEstimates,
  missionEstimate,
  object,
}: DecisionReportPanelProps) {
  const report = generateDecisionReport({
    context,
    materialEstimates,
    missionEstimate,
    object,
  });

  return (
    <Card style={styles.card} variant="action">
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Text style={styles.eyebrow}>AI-style decision report</Text>
          <Text style={styles.title}>{report.title}</Text>
          <Text style={styles.summary}>{report.summary}</Text>
        </View>
        <Badge label={report.modelLabel} tone="simulated" />
      </View>

      <View style={styles.sectionList}>
        {report.sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionBody}>{section.body}</Text>
          </View>
        ))}
      </View>

      <View style={styles.nextActions}>
        <Text style={styles.groupTitle}>Next actions</Text>
        {report.nextActions.map((action) => (
          <View key={action} style={styles.actionRow}>
            <View style={styles.actionDot} />
            <Text style={styles.actionText}>{action}</Text>
          </View>
        ))}
      </View>

      <View style={styles.assumptions}>
        <Text style={styles.groupTitle}>Report boundaries</Text>
        {report.assumptions.map((assumption) => (
          <Text key={assumption} style={styles.assumption}>
            {assumption}
          </Text>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing[5],
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  titleGroup: {
    flex: 1,
    gap: spacing[2],
    minWidth: 220,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.accent.cyan,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
  },
  summary: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  sectionList: {
    gap: spacing[3],
  },
  section: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing[2],
    padding: spacing[4],
  },
  sectionTitle: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  sectionBody: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  nextActions: {
    gap: spacing[3],
  },
  groupTitle: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  actionRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing[3],
  },
  actionDot: {
    backgroundColor: colors.accent.cyan,
    borderRadius: radius.pill,
    height: 8,
    marginTop: 6,
    width: 8,
  },
  actionText: {
    ...typography.caption,
    color: colors.text.secondary,
    flex: 1,
  },
  assumptions: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing[2],
    padding: spacing[4],
  },
  assumption: {
    ...typography.caption,
    color: colors.text.muted,
  },
});
