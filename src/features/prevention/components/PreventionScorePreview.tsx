import { StyleSheet, Text, View } from 'react-native';

import { Badge, Card } from '@/components/ui';
import { ScoreResult } from '@/domain/scoring';
import { colors, radius, spacing, typography } from '@/theme';

type PreventionScorePreviewProps = {
  result: ScoreResult;
};

function getLevelTone(level: ScoreResult['level']) {
  switch (level) {
    case 'high':
      return 'success';
    case 'medium':
      return 'warning';
    case 'low':
      return 'danger';
  }
}

function getDecisionCopy(score: number) {
  if (score >= 70) {
    return 'Ready for responsible mission review';
  }

  if (score >= 40) {
    return 'Needs prevention upgrades before approval';
  }

  return 'Not responsible enough for launch planning';
}

export function PreventionScorePreview({ result }: PreventionScorePreviewProps) {
  const progressWidth = `${result.score}%` as `${number}%`;

  return (
    <Card style={styles.card} variant="score">
      <View style={styles.header}>
        <View style={styles.scoreBlock}>
          <Text style={styles.score}>{result.score}</Text>
          <Text style={styles.scoreLabel}>Responsible orbit score</Text>
        </View>
        <Badge label={result.level} tone={getLevelTone(result.level)} />
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: progressWidth }]} />
      </View>

      <View style={styles.decisionPanel}>
        <Text style={styles.decisionLabel}>Model decision</Text>
        <Text style={styles.decision}>{getDecisionCopy(result.score)}</Text>
        <Text style={styles.summary}>{result.summary}</Text>
      </View>

      <View style={styles.factorList}>
        {result.factors.map((factor) => {
          const factorWidth = `${factor.value}%` as `${number}%`;

          return (
            <View key={factor.label} style={styles.factor}>
              <View style={styles.factorHeader}>
                <Text style={styles.factorLabel}>{factor.label}</Text>
                <Text style={styles.factorValue}>{factor.value} pts</Text>
              </View>
              <View style={styles.factorTrack}>
                <View style={[styles.factorFill, { width: factorWidth }]} />
              </View>
              <Text style={styles.factorDescription}>{factor.description}</Text>
            </View>
          );
        })}
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
    gap: spacing[4],
    justifyContent: 'space-between',
  },
  scoreBlock: {
    gap: spacing[1],
  },
  score: {
    ...typography.display,
    color: colors.text.primary,
  },
  scoreLabel: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  progressTrack: {
    backgroundColor: colors.background.surface,
    borderRadius: radius.pill,
    height: 12,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: colors.semantic.success,
    borderRadius: radius.pill,
    height: '100%',
  },
  decisionPanel: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing[2],
    padding: spacing[4],
  },
  decisionLabel: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  decision: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  summary: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  factorList: {
    gap: spacing[4],
  },
  factor: {
    gap: spacing[2],
  },
  factorHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  factorLabel: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  factorValue: {
    ...typography.caption,
    color: colors.accent.cyan,
  },
  factorTrack: {
    backgroundColor: colors.background.surface,
    borderRadius: radius.pill,
    height: 8,
    overflow: 'hidden',
  },
  factorFill: {
    backgroundColor: colors.accent.teal,
    borderRadius: radius.pill,
    height: '100%',
  },
  factorDescription: {
    ...typography.caption,
    color: colors.text.secondary,
  },
});
