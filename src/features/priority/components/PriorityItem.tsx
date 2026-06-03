import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Badge, Button, Card } from '@/components/ui';
import { ScoredOrbitalObject } from '@/domain/scoring';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, radius, spacing, typography } from '@/theme';

import {
  formatObjectStatus,
  formatObjectType,
  getConfidenceLabel,
  getConfidenceTone,
  getScoreTone,
} from '../../objects/object-formatters';

type PriorityItemProps = {
  object: ScoredOrbitalObject;
  rank: number;
};

export function PriorityItem({ object, rank }: PriorityItemProps) {
  const { isPhone } = useBreakpoint();

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.rankBadge}>
          <Text style={styles.rankLabel}>Posição</Text>
          <Text style={styles.rankValue}>{rank}</Text>
        </View>

        <View style={styles.titleGroup}>
          <Text style={styles.name}>{object.name}</Text>
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

      <View style={styles.scoreRow}>
        <Badge
          label="Risco"
          score={object.scores.risk.score}
          tone={getScoreTone(object.scores.risk.level)}
        />
        <Badge
          label="Reuso"
          score={object.scores.forgeValue.score}
          tone={getScoreTone(object.scores.forgeValue.level)}
        />
        <Badge
          label="Prioridade"
          score={object.scores.priority.score}
          tone={getScoreTone(object.scores.priority.level)}
        />
      </View>

      <View style={styles.decisionPanel}>
        <Text style={styles.decisionLabel}>Decisão recomendada</Text>
        <Text style={styles.decision}>{object.scores.priority.decision}</Text>
        <Text style={styles.reason}>{object.scores.priority.summary}</Text>
      </View>

      <View style={[styles.actions, isPhone && styles.actionsPhone]}>
        <Button
          fullWidth={isPhone}
          size="small"
          variant="secondary"
          onPress={() =>
            router.push({
              pathname: '/orbit/[id]',
              params: { id: object.id },
            })
          }>
          Abrir ficha
        </Button>
        <Button
          fullWidth={isPhone}
          size="small"
          onPress={() =>
            router.push({
              pathname: '/missions',
              params: { objectId: object.id },
            })
          }>
          Simular missão
        </Button>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing[4],
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  rankBadge: {
    alignItems: 'center',
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    minWidth: 64,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  rankLabel: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  rankValue: {
    ...typography.h3,
    color: colors.text.primary,
  },
  titleGroup: {
    flex: 1,
    gap: spacing[1],
    minWidth: 180,
  },
  name: {
    ...typography.h3,
    color: colors.text.primary,
  },
  meta: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  scoreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  decisionPanel: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing[2],
    padding: spacing[3],
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
  reason: {
    ...typography.caption,
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
  },
});
