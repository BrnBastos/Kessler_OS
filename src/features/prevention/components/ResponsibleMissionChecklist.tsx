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
    body: 'A defined disposal target and timeline exists before the mission begins.',
    key: 'disposalPlan',
    label: 'End-of-life disposal plan',
    points: 30,
  },
  {
    body: 'Stored energy sources are made safe after the operational mission ends.',
    key: 'passivationPlan',
    label: 'Passivation plan',
    points: 25,
  },
  {
    body: 'The object can be tracked, identified and shared with catalog users.',
    key: 'trackingPlan',
    label: 'Tracking and cataloging plan',
    points: 20,
  },
  {
    body: 'The mission has a maneuver policy for conjunction warnings.',
    key: 'collisionAvoidancePlan',
    label: 'Collision avoidance plan',
    points: 25,
  },
];

export function ResponsibleMissionChecklist({ onToggle, value }: ResponsibleMissionChecklistProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Responsible mission checklist</Text>
        <Text style={styles.description}>
          Toggle the fictional mission controls to see how prevention choices affect the score.
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
                  {enabled ? 'ON' : 'OFF'}
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
