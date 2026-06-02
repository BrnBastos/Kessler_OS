import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Badge, Button, Card } from '@/components/ui';
import { ScoredOrbitalObject } from '@/domain/scoring';
import { colors, spacing, typography } from '@/theme';

import {
  formatObjectStatus,
  formatObjectType,
  getConfidenceLabel,
  getConfidenceTone,
} from '../object-formatters';

type ObjectSummaryCardProps = {
  object: ScoredOrbitalObject;
};

export function ObjectSummaryCard({ object }: ObjectSummaryCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <Text style={styles.eyebrow}>Object passport</Text>
          <Text style={styles.title}>{object.name}</Text>
          <Text style={styles.meta}>
            {formatObjectType(object.type)} · {object.orbitRegion} ·{' '}
            {formatObjectStatus(object.status)}
          </Text>
        </View>
        <Badge
          label={getConfidenceLabel(object.dataConfidence)}
          tone={getConfidenceTone(object.dataConfidence)}
        />
      </View>

      <Text style={styles.summary}>{object.summary}</Text>

      <View style={styles.decisionPanel}>
        <Text style={styles.decisionLabel}>Recommended decision</Text>
        <Text style={styles.decisionText}>{object.scores.priority.decision}</Text>
      </View>

      <View style={styles.actions}>
        <Button onPress={() => router.push('/missions')}>Simulate Mission</Button>
        <Button variant="secondary" onPress={() => router.push('/orbit')}>
          Back to Orbit
        </Button>
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
  copy: {
    flex: 1,
    gap: spacing[1],
    minWidth: 220,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.accent.cyan,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
  },
  meta: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  summary: {
    ...typography.body,
    color: colors.text.secondary,
  },
  decisionPanel: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: 12,
    borderWidth: 1,
    gap: spacing[1],
    padding: spacing[4],
  },
  decisionLabel: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  decisionText: {
    ...typography.h3,
    color: colors.text.primary,
  },
  actions: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
});
