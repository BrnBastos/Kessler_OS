import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui';
import { ResponsibleOrbitInput } from '@/domain/scoring';
import { colors, radius, spacing, typography } from '@/theme';

type ResponsibleMissionChecklistProps = {
  value: ResponsibleOrbitInput;
  onToggle: (key: keyof ResponsibleOrbitInput) => void;
};

type ChecklistItem = {
  body: string;
  key: keyof ResponsibleOrbitInput;
  label: string;
  points: number;
};

const checklistItems: ChecklistItem[] = [
  {
    body: 'Existe um alvo e um prazo de descarte definidos antes de a missão começar.',
    key: 'disposalPlan',
    label: 'Plano de descarte no fim da vida útil',
    points: 30,
  },
  {
    body: 'Fontes de energia armazenada são tornadas seguras após o fim da missão operacional.',
    key: 'passivationPlan',
    label: 'Plano de passivação',
    points: 25,
  },
  {
    body: 'O objeto pode ser rastreado, identificado e compartilhado com usuários do catálogo.',
    key: 'trackingPlan',
    label: 'Plano de rastreamento e catalogação',
    points: 20,
  },
  {
    body: 'A missão tem política de manobra para alertas de aproximação.',
    key: 'collisionAvoidancePlan',
    label: 'Plano de desvio de colisão',
    points: 25,
  },
];

export function ResponsibleMissionChecklist({ onToggle, value }: ResponsibleMissionChecklistProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Checklist de missão responsável</Text>
        <Text style={styles.description}>
          Ative ou desative controles fictícios para ver como escolhas de prevenção afetam a
          pontuação.
        </Text>
      </View>

      <View style={styles.list}>
        {checklistItems.map((item) => {
          const enabled = value[item.key];

          return (
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: enabled }}
              key={item.key}
              onPress={() => onToggle(item.key)}
              style={({ pressed }) => [
                styles.item,
                enabled && styles.itemEnabled,
                pressed && styles.itemPressed,
              ]}>
              <View style={[styles.toggle, enabled && styles.toggleEnabled]}>
                <Text style={[styles.toggleText, enabled && styles.toggleTextEnabled]}>
                  {enabled ? 'SIM' : 'NÃO'}
                </Text>
              </View>

              <View style={styles.itemCopy}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{item.label}</Text>
                  <Text style={styles.points}>{item.points} pts</Text>
                </View>
                <Text style={styles.itemBody}>{item.body}</Text>
              </View>
            </Pressable>
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
    gap: spacing[2],
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
  },
  description: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  list: {
    gap: spacing[3],
  },
  item: {
    alignItems: 'flex-start',
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing[3],
    padding: spacing[4],
  },
  itemEnabled: {
    borderColor: 'rgba(34, 197, 94, 0.38)',
  },
  itemPressed: {
    opacity: 0.78,
  },
  toggle: {
    alignItems: 'center',
    backgroundColor: colors.background.surfaceElevated,
    borderColor: colors.border.strong,
    borderRadius: radius.pill,
    borderWidth: 1,
    minWidth: 56,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  toggleEnabled: {
    backgroundColor: 'rgba(34, 197, 94, 0.14)',
    borderColor: 'rgba(34, 197, 94, 0.38)',
  },
  toggleText: {
    ...typography.caption,
    color: colors.text.muted,
    fontWeight: '700',
  },
  toggleTextEnabled: {
    color: colors.semantic.success,
  },
  itemCopy: {
    flex: 1,
    gap: spacing[2],
    minWidth: 0,
  },
  itemHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
    justifyContent: 'space-between',
  },
  itemTitle: {
    ...typography.bodySmall,
    color: colors.text.primary,
    flex: 1,
    fontWeight: '700',
    minWidth: 180,
  },
  points: {
    ...typography.caption,
    color: colors.accent.cyan,
  },
  itemBody: {
    ...typography.caption,
    color: colors.text.secondary,
  },
});
