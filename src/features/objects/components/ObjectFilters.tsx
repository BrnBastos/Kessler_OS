import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Card } from '@/components/ui';
import { formatObjectTypePluralLabel, ptBR } from '@/content/pt-br';
import { OrbitalObjectType, OrbitRegion } from '@/domain/models';
import { colors, radius, spacing, typography } from '@/theme';

export type ObjectTypeFilter = OrbitalObjectType | 'all';
export type OrbitRegionFilter = OrbitRegion | 'all';

type ObjectFiltersProps = {
  objectType: ObjectTypeFilter;
  onObjectTypeChange: (type: ObjectTypeFilter) => void;
  onOrbitRegionChange: (region: OrbitRegionFilter) => void;
  onReset: () => void;
  onSearchQueryChange: (query: string) => void;
  orbitRegion: OrbitRegionFilter;
  resultCount: number;
  searchQuery: string;
};

const objectTypeOptions: { label: string; value: ObjectTypeFilter }[] = [
  { label: formatObjectTypePluralLabel('all'), value: 'all' },
  { label: formatObjectTypePluralLabel('satellite'), value: 'satellite' },
  { label: formatObjectTypePluralLabel('rocket_body'), value: 'rocket_body' },
  { label: formatObjectTypePluralLabel('debris'), value: 'debris' },
  { label: formatObjectTypePluralLabel('unknown'), value: 'unknown' },
];

const orbitRegionOptions: { label: string; value: OrbitRegionFilter }[] = [
  { label: ptBR.common.all, value: 'all' },
  { label: 'LEO', value: 'LEO' },
  { label: 'MEO', value: 'MEO' },
  { label: 'GEO', value: 'GEO' },
  { label: 'HEO', value: 'HEO' },
];

export function ObjectFilters({
  objectType,
  onObjectTypeChange,
  onOrbitRegionChange,
  onReset,
  onSearchQueryChange,
  orbitRegion,
  resultCount,
  searchQuery,
}: ObjectFiltersProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>Filtros de objetos</Text>
          <Text style={styles.resultCount}>{resultCount} objetos encontrados</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={onReset} style={styles.resetButton}>
          <Text style={styles.resetLabel}>{ptBR.common.reset}</Text>
        </Pressable>
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Busca</Text>
        <TextInput
          accessibilityLabel="Buscar objetos orbitais"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={onSearchQueryChange}
          placeholder="Buscar por nome, NORAD, tipo ou região"
          placeholderTextColor={colors.text.disabled}
          returnKeyType="search"
          selectionColor={colors.accent.cyan}
          style={styles.searchInput}
          value={searchQuery}
        />
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Tipo</Text>
        <View style={styles.chips}>
          {objectTypeOptions.map((option) => {
            const active = objectType === option.value;

            return (
              <Pressable
                accessibilityRole="button"
                key={option.value}
                onPress={() => onObjectTypeChange(option.value)}
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

      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Região orbital</Text>
        <View style={styles.chips}>
          {orbitRegionOptions.map((option) => {
            const active = orbitRegion === option.value;

            return (
              <Pressable
                accessibilityRole="button"
                key={option.value}
                onPress={() => onOrbitRegionChange(option.value)}
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
