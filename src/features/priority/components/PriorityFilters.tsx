import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui';
import { OrbitalObjectType, OrbitRegion } from '@/domain/models';
import { colors, radius, spacing, typography } from '@/theme';

export type PriorityDecisionFilter = string | 'all';
export type PriorityObjectTypeFilter = OrbitalObjectType | 'all';
export type PriorityOrbitFilter = OrbitRegion | 'all';
export type PrioritySortMode = 'priority' | 'risk' | 'forge';

type PriorityFiltersProps = {
  decision: PriorityDecisionFilter;
  decisionOptions: string[];
  objectType: PriorityObjectTypeFilter;
  onDecisionChange: (decision: PriorityDecisionFilter) => void;
  onObjectTypeChange: (type: PriorityObjectTypeFilter) => void;
  onOrbitRegionChange: (region: PriorityOrbitFilter) => void;
  onReset: () => void;
  onSortModeChange: (sortMode: PrioritySortMode) => void;
  orbitRegion: PriorityOrbitFilter;
  resultCount: number;
  sortMode: PrioritySortMode;
};

const objectTypeOptions: { label: string; value: PriorityObjectTypeFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Satellites', value: 'satellite' },
  { label: 'Rocket bodies', value: 'rocket_body' },
  { label: 'Debris', value: 'debris' },
  { label: 'Unknown', value: 'unknown' },
];

const orbitRegionOptions: { label: string; value: PriorityOrbitFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'LEO', value: 'LEO' },
  { label: 'MEO', value: 'MEO' },
  { label: 'GEO', value: 'GEO' },
  { label: 'HEO', value: 'HEO' },
];

const sortOptions: { label: string; value: PrioritySortMode }[] = [
  { label: 'Priority', value: 'priority' },
  { label: 'Risk', value: 'risk' },
  { label: 'Forge value', value: 'forge' },
];

function FilterChips<TValue extends string>({
  activeValue,
  label,
  onChange,
  options,
}: {
  activeValue: TValue;
  label: string;
  onChange: (value: TValue) => void;
  options: { label: string; value: TValue }[];
}) {
  return (
    <View style={styles.filterGroup}>
      <Text style={styles.filterLabel}>{label}</Text>
      <View style={styles.chips}>
        {options.map((option) => {
          const active = activeValue === option.value;

          return (
            <Pressable
              accessibilityRole="button"
              key={option.value}
              onPress={() => onChange(option.value)}
              style={({ pressed }) => [
                styles.chip,
                active && styles.chipActive,
                pressed && styles.pressed,
              ]}>
              <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function PriorityFilters({
  decision,
  decisionOptions,
  objectType,
  onDecisionChange,
  onObjectTypeChange,
  onOrbitRegionChange,
  onReset,
  onSortModeChange,
  orbitRegion,
  resultCount,
  sortMode,
}: PriorityFiltersProps) {
  const decisionFilterOptions = [
    { label: 'All', value: 'all' },
    ...decisionOptions.map((value) => ({ label: value, value })),
  ];

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Priority filters</Text>
          <Text style={styles.resultCount}>{resultCount} ranked objects</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={onReset} style={styles.resetButton}>
          <Text style={styles.resetLabel}>Reset</Text>
        </Pressable>
      </View>

      <FilterChips
        activeValue={sortMode}
        label="Sort by"
        onChange={onSortModeChange}
        options={sortOptions}
      />
      <FilterChips
        activeValue={objectType}
        label="Type"
        onChange={onObjectTypeChange}
        options={objectTypeOptions}
      />
      <FilterChips
        activeValue={orbitRegion}
        label="Orbit region"
        onChange={onOrbitRegionChange}
        options={orbitRegionOptions}
      />
      <FilterChips
        activeValue={decision}
        label="Decision"
        onChange={onDecisionChange}
        options={decisionFilterOptions}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing[5],
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
  },
  resultCount: {
    ...typography.caption,
    color: colors.text.muted,
  },
  resetButton: {
    borderColor: colors.border.subtle,
    borderRadius: radius.pill,
    borderWidth: 1,
    minHeight: 44,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  resetLabel: {
    ...typography.bodySmall,
    color: colors.accent.cyan,
    fontWeight: '700',
  },
  filterGroup: {
    gap: spacing[3],
  },
  filterLabel: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  chip: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.pill,
    borderWidth: 1,
    minHeight: 44,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  chipActive: {
    backgroundColor: 'rgba(34, 211, 238, 0.14)',
    borderColor: 'rgba(34, 211, 238, 0.34)',
  },
  chipLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  chipLabelActive: {
    color: colors.text.primary,
  },
  pressed: {
    opacity: 0.72,
  },
});
