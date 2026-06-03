import { StyleSheet, Text, View } from 'react-native';

import { Button, Card } from '@/components/ui';
import { formatMissionTypeLabel } from '@/content/pt-br';
import { SavedMissionScenario } from '@/services/persistence';
import { colors, radius, spacing, typography } from '@/theme';

type SavedMissionScenariosProps = {
  onApplyScenario: (scenario: SavedMissionScenario) => void;
  onRemoveScenario: (scenarioId: string) => void;
  scenarios: SavedMissionScenario[];
};

function formatSavedAt(savedAt: string) {
  return new Date(savedAt).toLocaleString('pt-BR');
}

export function SavedMissionScenarios({
  onApplyScenario,
  onRemoveScenario,
  scenarios,
}: SavedMissionScenariosProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Cenários salvos</Text>
        <Text style={styles.description}>{scenarios.length} registros locais de missão</Text>
      </View>

      {scenarios.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Nenhum cenário salvo ainda.</Text>
          <Text style={styles.emptyBody}>
            Salve um resultado de simulação para manter um registro local leve para comparação.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {scenarios.map((scenario) => (
            <View key={scenario.id} style={styles.item}>
              <View style={styles.itemCopy}>
                <Text style={styles.itemTitle}>
                  {formatMissionTypeLabel(scenario.missionType)} · {scenario.objectName}
                </Text>
                <Text style={styles.itemMeta}>{formatSavedAt(scenario.savedAt)}</Text>
                <Text style={styles.itemDecision}>{scenario.decision}</Text>
              </View>

              <View style={styles.scoreRow}>
                <View style={styles.scoreBox}>
                  <Text style={styles.scoreLabel}>Viabilidade</Text>
                  <Text style={styles.scoreValue}>{scenario.feasibilityScore}</Text>
                </View>
                <View style={styles.scoreBox}>
                  <Text style={styles.scoreLabel}>Redução de risco</Text>
                  <Text style={styles.scoreValue}>{scenario.riskReductionScore}</Text>
                </View>
                <View style={styles.scoreBox}>
                  <Text style={styles.scoreLabel}>Valor circular</Text>
                  <Text style={styles.scoreValue}>{scenario.circularValueScore}</Text>
                </View>
              </View>

              <View style={styles.actions}>
                <Button
                  size="small"
                  variant="secondary"
                  onPress={() => onApplyScenario(scenario)}>
                  Carregar
                </Button>
                <Button
                  size="small"
                  variant="danger"
                  onPress={() => onRemoveScenario(scenario.id)}>
                  Remover
                </Button>
              </View>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing[5],
  },
  header: {
    gap: spacing[2],
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
  },
  description: {
    ...typography.caption,
    color: colors.text.muted,
  },
  emptyState: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing[2],
    padding: spacing[4],
  },
  emptyTitle: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  emptyBody: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  list: {
    gap: spacing[3],
  },
  item: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing[4],
    padding: spacing[4],
  },
  itemCopy: {
    gap: spacing[1],
  },
  itemTitle: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  itemMeta: {
    ...typography.caption,
    color: colors.text.muted,
  },
  itemDecision: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  scoreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  scoreBox: {
    backgroundColor: colors.background.surfaceElevated,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    flexBasis: 118,
    flexGrow: 1,
    gap: spacing[1],
    padding: spacing[3],
  },
  scoreLabel: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  scoreValue: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  actions: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
});
