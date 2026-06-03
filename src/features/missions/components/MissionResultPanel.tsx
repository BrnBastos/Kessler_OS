import { StyleSheet, Text, View } from 'react-native';

import { Badge, BadgeTone, Card, Metric } from '@/components/ui';
import { MissionEstimate, ScoredOrbitalObject } from '@/domain/scoring';
import { DecisionReportPanel } from '@/features/reports/DecisionReportPanel';
import { colors, radius, spacing, typography } from '@/theme';

type MissionResultPanelProps = {
  object: ScoredOrbitalObject;
  result: MissionEstimate;
};

function getFeasibilityTone(level: MissionEstimate['feasibilityLevel']): BadgeTone {
  switch (level) {
    case 'high':
      return 'success';
    case 'medium':
      return 'warning';
    case 'low':
      return 'danger';
  }
}

function getOperationalRiskTone(level: MissionEstimate['operationalRiskLevel']): BadgeTone {
  switch (level) {
    case 'low':
      return 'success';
    case 'medium':
      return 'warning';
    case 'high':
      return 'danger';
  }
}

function formatDeltaV(deltaV: number) {
  return deltaV === 0 ? '0' : deltaV.toLocaleString();
}

function MissionResultContent({ object, result }: MissionResultPanelProps) {
  return (
    <Card style={styles.card} variant="score">
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Text style={styles.eyebrow}>Resultado da simulação</Text>
          <Text style={styles.title}>Missão: {result.missionTypeLabel}</Text>
          <Text style={styles.target}>Alvo: {object.name}</Text>
        </View>

        <Badge label={result.decision} tone={getFeasibilityTone(result.feasibilityLevel)} />
      </View>

      <Text style={styles.explanation}>{result.explanation}</Text>

      <View style={styles.metricGrid}>
        <Metric
          detail="Adequação no protótipo"
          label="Viabilidade"
          tone={result.feasibilityLevel === 'high' ? 'teal' : 'warning'}
          value={result.feasibilityScore.toString()}
          style={styles.metric}
        />
        <Metric
          detail="Custo estimado de manobra"
          label="Delta-v m/s"
          tone="cyan"
          value={formatDeltaV(result.estimatedDeltaVMps)}
          style={styles.metric}
        />
        <Metric
          detail="Prazo modelado"
          label="Duração em dias"
          tone="blue"
          value={result.estimatedDurationDays.toString()}
          style={styles.metric}
        />
        <Metric
          detail="Benefício de segurança"
          label="Redução de risco"
          tone="teal"
          value={result.riskReductionScore.toString()}
          style={styles.metric}
        />
      </View>

      <View style={styles.scoreRow}>
        <Badge
          label="Risco operacional"
          reason="O risco reflete complexidade da missão e incerteza do alvo."
          score={result.operationalRiskLevel === 'high' ? 3 : result.operationalRiskLevel === 'medium' ? 2 : 1}
          tone={getOperationalRiskTone(result.operationalRiskLevel)}
        />
        <Badge
          label="Valor circular"
          reason="O valor combina reuso do objeto com intenção de recuperação da missão."
          score={result.circularValueScore}
          tone={result.circularValueScore >= 70 ? 'success' : result.circularValueScore >= 40 ? 'warning' : 'info'}
        />
        <Badge
          label="Confiança"
          reason="A confiança reflete qualidade da fonte e complexidade da missão."
          score={result.confidenceScore}
          tone={result.confidenceScore >= 70 ? 'success' : result.confidenceScore >= 40 ? 'warning' : 'danger'}
        />
      </View>

      <View style={styles.factorList}>
        <Text style={styles.factorTitle}>Por que esta estimativa mudou</Text>
        {result.factors.map((factor) => (
          <View key={factor.label} style={styles.factor}>
            <View style={styles.factorHeader}>
              <Text style={styles.factorLabel}>{factor.label}</Text>
              <Text style={[styles.factorValue, factor.value < 0 && styles.factorPenalty]}>
                {factor.value > 0 ? '+' : ''}
                {factor.value}
              </Text>
            </View>
            <Text style={styles.factorDescription}>{factor.description}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

export function MissionResultPanel({ object, result }: MissionResultPanelProps) {
  return (
    <View style={styles.panelStack}>
      <MissionResultContent object={object} result={result} />
      <DecisionReportPanel context="mission" object={object} missionEstimate={result} />
    </View>
  );
}

const styles = StyleSheet.create({
  panelStack: {
    gap: spacing[5],
  },
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
    gap: spacing[1],
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
  target: {
    ...typography.bodySmall,
    color: colors.text.muted,
  },
  explanation: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  metric: {
    flexBasis: 160,
    flexGrow: 1,
  },
  scoreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  factorList: {
    gap: spacing[3],
  },
  factorTitle: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  factor: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing[2],
    padding: spacing[3],
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
    ...typography.bodySmall,
    color: colors.semantic.success,
    fontWeight: '700',
  },
  factorPenalty: {
    color: colors.semantic.warning,
  },
  factorDescription: {
    ...typography.caption,
    color: colors.text.secondary,
  },
});
