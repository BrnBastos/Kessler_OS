import { StyleSheet, Text, View } from 'react-native';

import { Badge, BadgeTone, Card, Metric } from '@/components/ui';
import { ReuseMaterialEstimate, ReusePotential } from '@/domain/models';
import { ScoredOrbitalObject } from '@/domain/scoring';
import { colors, radius, spacing, typography } from '@/theme';

type ReusePotentialPanelProps = {
  estimates: ReuseMaterialEstimate[];
  object: ScoredOrbitalObject;
};

function getPotentialTone(potential: ReusePotential): BadgeTone {
  switch (potential) {
    case 'high':
      return 'success';
    case 'medium':
      return 'warning';
    case 'low':
      return 'info';
  }
}

function formatMaterial(material: ReuseMaterialEstimate['material']) {
  return material.replace('_', ' ');
}

function formatPath(path: ReuseMaterialEstimate['preferredPath']) {
  return path.replace('_', ' ');
}

export function ReusePotentialPanel({ estimates, object }: ReusePotentialPanelProps) {
  const totalKnownShare = estimates.reduce((total, estimate) => total + estimate.estimatedSharePct, 0);
  const strongestEstimate =
    [...estimates].sort((left, right) => right.estimatedSharePct - left.estimatedSharePct)[0] ??
    undefined;
  const circularReadiness = Math.round(
    object.scores.forgeValue.score * 0.62 + object.scores.priority.score * 0.18 + totalKnownShare * 0.2
  );

  return (
    <Card style={styles.card} variant="score">
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Text style={styles.eyebrow}>Reuse potential</Text>
          <Text style={styles.title}>{object.name}</Text>
          <Text style={styles.description}>{object.scores.forgeValue.summary}</Text>
        </View>
        <Badge label="Forge value" score={object.scores.forgeValue.score} tone="success" />
      </View>

      <View style={styles.metricGrid}>
        <Metric
          detail="Blends forge, priority and material signals"
          label="Circular readiness"
          tone="teal"
          value={circularReadiness.toString()}
          style={styles.metric}
        />
        <Metric
          detail="Known estimate coverage"
          label="Material share"
          tone="cyan"
          value={`${Math.min(100, totalKnownShare)}%`}
          style={styles.metric}
        />
        <Metric
          detail={strongestEstimate ? formatMaterial(strongestEstimate.material) : 'Unknown'}
          label="Strongest signal"
          tone="blue"
          value={strongestEstimate ? strongestEstimate.estimatedSharePct.toString() : '0'}
          style={styles.metric}
        />
      </View>

      <View style={styles.materialList}>
        {estimates.map((estimate) => {
          const progressWidth = `${Math.min(100, estimate.estimatedSharePct)}%` as `${number}%`;

          return (
            <View key={estimate.id} style={styles.materialItem}>
              <View style={styles.materialHeader}>
                <View style={styles.materialCopy}>
                  <Text style={styles.materialName}>{formatMaterial(estimate.material)}</Text>
                  <Text style={styles.materialPath}>Preferred path: {formatPath(estimate.preferredPath)}</Text>
                </View>
                <Badge label={estimate.potential} tone={getPotentialTone(estimate.potential)} />
              </View>

              <View style={styles.track}>
                <View style={[styles.fill, { width: progressWidth }]} />
              </View>

              <View style={styles.materialFooter}>
                <Text style={styles.share}>{estimate.estimatedSharePct}% estimated share</Text>
                <Text style={styles.notes}>{estimate.notes}</Text>
              </View>
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
    ...typography.h2,
    color: colors.text.primary,
  },
  description: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  metric: {
    flexBasis: 170,
    flexGrow: 1,
  },
  materialList: {
    gap: spacing[3],
  },
  materialItem: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing[3],
    padding: spacing[4],
  },
  materialHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  materialCopy: {
    flex: 1,
    gap: spacing[1],
    minWidth: 180,
  },
  materialName: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  materialPath: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'capitalize',
  },
  track: {
    backgroundColor: colors.background.surfaceElevated,
    borderRadius: radius.pill,
    height: 10,
    overflow: 'hidden',
  },
  fill: {
    backgroundColor: colors.accent.teal,
    borderRadius: radius.pill,
    height: '100%',
  },
  materialFooter: {
    gap: spacing[1],
  },
  share: {
    ...typography.caption,
    color: colors.accent.cyan,
    textTransform: 'uppercase',
  },
  notes: {
    ...typography.caption,
    color: colors.text.secondary,
  },
});
