import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Badge, Card } from '@/components/ui';
import { MissionType } from '@/domain/models';
import { missionProfiles, ScoredOrbitalObject } from '@/domain/scoring';
import { colors, radius, spacing, typography } from '@/theme';

import {
  formatObjectStatus,
  formatObjectType,
  getConfidenceLabel,
  getConfidenceTone,
} from '../../objects/object-formatters';

type MissionSimulatorFormProps = {
  missionType: MissionType;
  objects: ScoredOrbitalObject[];
  onMissionTypeChange: (missionType: MissionType) => void;
  onObjectChange: (objectId: string) => void;
  selectedObjectId?: string;
};

const missionTypeOptions = Object.keys(missionProfiles) as MissionType[];

export function MissionSimulatorForm({
  missionType,
  objects,
  onMissionTypeChange,
  onObjectChange,
  selectedObjectId,
}: MissionSimulatorFormProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Mission inputs</Text>
        <Text style={styles.description}>
          Choose a target object and response type to generate a deterministic prototype estimate.
        </Text>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupLabel}>Target object</Text>
        <View style={styles.objectGrid}>
          {objects.map((object) => {
            const selected = selectedObjectId === object.id;

            return (
              <Pressable
                accessibilityRole="button"
                key={object.id}
                onPress={() => onObjectChange(object.id)}
                style={({ pressed }) => [
                  styles.objectOption,
                  selected && styles.optionActive,
                  pressed && styles.pressed,
                ]}>
                <View style={styles.objectHeader}>
                  <Text style={[styles.objectName, selected && styles.optionTextActive]}>
                    {object.name}
                  </Text>
                  <Badge
                    label={getConfidenceLabel(object.dataConfidence)}
                    tone={getConfidenceTone(object.dataConfidence)}
                  />
                </View>
                <Text style={styles.objectMeta}>
                  {formatObjectType(object.type)} · {object.orbitRegion} ·{' '}
                  {formatObjectStatus(object.status)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupLabel}>Mission type</Text>
        <View style={styles.missionGrid}>
          {missionTypeOptions.map((option) => {
            const selected = missionType === option;
            const profile = missionProfiles[option];

            return (
              <Pressable
                accessibilityRole="button"
                key={option}
                onPress={() => onMissionTypeChange(option)}
                style={({ pressed }) => [
                  styles.missionOption,
                  selected && styles.optionActive,
                  pressed && styles.pressed,
                ]}>
                <Text style={[styles.missionLabel, selected && styles.optionTextActive]}>
                  {profile.label}
                </Text>
                <Text style={styles.missionBody}>{profile.objective}</Text>
              </Pressable>
            );
          })}
        </View>
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
  group: {
    gap: spacing[3],
  },
  groupLabel: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  objectGrid: {
    gap: spacing[3],
  },
  objectOption: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing[2],
    minHeight: 92,
    padding: spacing[4],
  },
  objectHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  objectName: {
    ...typography.bodySmall,
    color: colors.text.primary,
    flex: 1,
    fontWeight: '700',
    minWidth: 160,
  },
  objectMeta: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  missionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  missionOption: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    flexBasis: 220,
    flexGrow: 1,
    gap: spacing[2],
    minHeight: 116,
    padding: spacing[4],
  },
  missionLabel: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  missionBody: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  optionActive: {
    backgroundColor: 'rgba(34, 211, 238, 0.14)',
    borderColor: 'rgba(34, 211, 238, 0.34)',
  },
  optionTextActive: {
    color: colors.text.primary,
  },
  pressed: {
    opacity: 0.72,
  },
});
