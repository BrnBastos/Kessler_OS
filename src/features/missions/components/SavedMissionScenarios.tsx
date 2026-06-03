import { StyleSheet, Text, View } from 'react-native';

import { Badge, Button, Card, DisclosureSection } from '@/components/ui';
import { formatMissionTypeLabel } from '@/content/pt-br';
import { useBreakpoint } from '@/hooks/use-breakpoint';
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
  const { isPhone } = useBreakpoint();

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Badge label="AsyncStorage" tone="success" />
          <Text style={styles.title}>Histórico recente</Text>
          <Text style={styles.description}>
            Informações salvas localmente neste dispositivo para comparar decisões depois.
          </Text>
        </View>

        <View style={styles.countPill}>
          <Text style={styles.countValue}>{scenarios.length}</Text>
          <Text style={styles.countLabel}>salvos</Text>
        </View>
      </View>

      {scenarios.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Nenhum registro local ainda.</Text>
          <Text style={styles.emptyBody}>
            Salve uma simulação para criar um histórico recente no aparelho e mostrar a
            persistência local do app.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {scenarios.map((scenario) => (
            <View key={scenario.id} style={styles.item}>
              <View style={styles.itemHeader}>
                <View style={styles.itemCopy}>
                  <Text style={styles.itemTitle}>
                    {formatMissionTypeLabel(scenario.missionType)} · {scenario.objectName}
                  </Text>
                  <Text style={styles.itemMeta}>Salvo em {formatSavedAt(scenario.savedAt)}</Text>
                  <Text style={styles.itemDecision}>{scenario.decision}</Text>
                </View>

                <Badge label="Registro local" tone="info" />
              </View>

              <DisclosureSection title="Pontuações salvas">
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
              </DisclosureSection>

              <View style={[styles.actions, isPhone && styles.actionsPhone]}>
                <Button
                  fullWidth={isPhone}
                  size="small"
                  variant="secondary"
                  onPress={() => onApplyScenario(scenario)}>
                  Carregar
                </Button>
                <Button
                  fullWidth={isPhone}
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
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
    justifyContent: 'space-between',
  },
  headerCopy: {
    flex: 1,
    gap: spacing[2],
    minWidth: 220,
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
  },
  description: {
    ...typography.caption,
    color: colors.text.muted,
    maxWidth: 560,
  },
  countPill: {
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
    borderRadius: radius.md,
    borderWidth: 1,
    minWidth: 84,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  countValue: {
    ...typography.h3,
    color: colors.text.primary,
  },
  countLabel: {
    ...typography.caption,
    color: colors.semantic.success,
    textTransform: 'uppercase',
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
  itemHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  itemCopy: {
    flex: 1,
    gap: spacing[1],
    minWidth: 220,
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
  actionsPhone: {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
});
