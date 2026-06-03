import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Card } from '@/components/ui';
import { formatObjectTypePluralLabel, ptBR } from '@/content/pt-br';
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
  onSearchQueryChange: (query: string) => void;
  onSortModeChange: (sortMode: PrioritySortMode) => void;
  orbitRegion: PriorityOrbitFilter;
  resultCount: number;
  searchQuery: string;
  sortMode: PrioritySortMode;
};

const objectTypeOptions: { label: string; value: PriorityObjectTypeFilter }[] = [
  { label: formatObjectTypePluralLabel('all'), value: 'all' },
  { label: formatObjectTypePluralLabel('satellite'), value: 'satellite' },
  { label: formatObjectTypePluralLabel('rocket_body'), value: 'rocket_body' },
  { label: formatObjectTypePluralLabel('debris'), value: 'debris' },
  { label: formatObjectTypePluralLabel('unknown'), value: 'unknown' },
];

const orbitRegionOptions: { label: string; value: PriorityOrbitFilter }[] = [
  { label: ptBR.common.all, value: 'all' },
  { label: 'LEO', value: 'LEO' },
  { label: 'MEO', value: 'MEO' },
  { label: 'GEO', value: 'GEO' },
  { label: 'HEO', value: 'HEO' },
];

const sortOptions: { label: string; value: PrioritySortMode }[] = [
  { label: 'Prioridade', value: 'priority' },
  { label: 'Risco', value: 'risk' },
  { label: 'Valor de reuso', value: 'forge' },
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
  onSearchQueryChange,
  onSortModeChange,
  orbitRegion,
  resultCount,
  searchQuery,
  sortMode,
}: PriorityFiltersProps) {
  const decisionFilterOptions = [
    { label: ptBR.common.all, value: 'all' },
    ...decisionOptions.map((value) => ({ label: value, value })),
  ];

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>Filtros de prioridade</Text>
          <Text style={styles.resultCount}>{resultCount} objetos priorizados</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={onReset} style={styles.resetButton}>
          <Text style={styles.resetLabel}>{ptBR.common.reset}</Text>
        </Pressable>
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Busca</Text>
        <TextInput
          accessibilityLabel="Buscar na fila de prioridade"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={onSearchQueryChange}
          placeholder="Buscar por nome, NORAD, decisão ou região"
          placeholderTextColor={colors.text.disabled}
          returnKeyType="search"
          selectionColor={colors.accent.cyan}
          style={styles.searchInput}
          value={searchQuery}
        />
      </View>

      <FilterChips
        activeValue={sortMode}
        label="Ordenar por"
        onChange={onSortModeChange}
        options={sortOptions}
      />
      <FilterChips
        activeValue={objectType}
        label="Tipo"
        onChange={onObjectTypeChange}
        options={objectTypeOptions}
      />
      <FilterChips
        activeValue={orbitRegion}
        label="Região orbital"
        onChange={onOrbitRegionChange}
        options={orbitRegionOptions}
      />
      <FilterChips
        activeValue={decision}
        label="Decisão"
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
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  headerCopy: {
    flex: 1,
    minWidth: 190,
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
  searchInput: {
    ...typography.bodySmall,
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.text.primary,
    minHeight: 48,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
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
