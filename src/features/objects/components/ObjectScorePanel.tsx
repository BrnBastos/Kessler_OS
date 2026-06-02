import { StyleSheet, Text, View } from 'react-native';

import { RiskBar, ScoreRing } from '@/components/charts';
import { Card } from '@/components/ui';
import { ScoredOrbitalObject } from '@/domain/scoring';
import { colors, spacing, typography } from '@/theme';

type ObjectScorePanelProps = {
  object: ScoredOrbitalObject;
};

export function ObjectScorePanel({ object }: ObjectScorePanelProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Score explanation</Text>
        <Text style={styles.body}>
          Scores are deterministic prototype signals. They explain why the object appears important;
          they are not professional collision or material predictions.
        </Text>
      </View>

      <View style={styles.rings}>
        <ScoreRing label="Risk" level={object.scores.risk.level} score={object.scores.risk.score} />
        <ScoreRing
          label="Forge Value"
          level={object.scores.forgeValue.level}
          score={object.scores.forgeValue.score}
        />
        <ScoreRing
          label="Priority"
          level={object.scores.priority.level}
          score={object.scores.priority.score}
        />
      </View>

      <View style={styles.summaryList}>
        <Text style={styles.summary}>{object.scores.risk.summary}</Text>
        <Text style={styles.summary}>{object.scores.forgeValue.summary}</Text>
        <Text style={styles.summary}>{object.scores.priority.summary}</Text>
      </View>

      <View style={styles.breakdown}>
        <Text style={styles.breakdownTitle}>Risk factor breakdown</Text>
        <RiskBar factors={object.scores.risk.factors} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing[6],
  },
  header: {
    gap: spacing[2],
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
  },
  body: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  rings: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[5],
    justifyContent: 'space-around',
  },
  summaryList: {
    gap: spacing[3],
  },
  summary: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  breakdown: {
    gap: spacing[4],
  },
  breakdownTitle: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
});
