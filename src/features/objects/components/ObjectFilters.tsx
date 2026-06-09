import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Card } from '@/components/ui';
import { formatObjectTypePluralLabel, ptBR } from '@/content/pt-br';
import { OrbitalObjectType, OrbitRegion } from '@/domain/models';
import { colors, radius, spacing, typography, useKesslerTheme } from '@/theme';

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
  const theme = useKesslerTheme();
  const chipStyle = {
    backgroundColor: theme.colors.background.surface,
    borderColor: theme.colors.border.subtle,
  };
  const activeChipStyle = {
    backgroundColor: theme.isLightMode ? 'rgba(186, 230, 253, 0.24)' : 'rgba(34, 211, 238, 0.14)',
    borderColor: theme.colors.border.strong,
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>Filtros de objetos</Text>
          <Text style={[styles.resultCount, { color: theme.colors.text.muted }]}>
            {resultCount} objetos encontrados
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onReset}
          style={[styles.resetButton, { borderColor: theme.colors.border.subtle }]}>
          <Text style={[styles.resetLabel, { color: theme.colors.accent.cyan }]}>
            {ptBR.common.reset}
          </Text>
        </Pressable>
      </View>

      <View style={styles.filterGroup}>
        <Text style={[styles.filterLabel, { color: theme.colors.text.muted }]}>Busca</Text>
        <TextInput
          accessibilityLabel="Buscar objetos orbitais"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={onSearchQueryChange}
          placeholder="Buscar por nome, NORAD, tipo ou região"
          placeholderTextColor={theme.colors.text.disabled}
          returnKeyType="search"
          selectionColor={theme.colors.accent.cyan}
          style={[
            styles.searchInput,
            {
              backgroundColor: theme.colors.background.surface,
              borderColor: theme.colors.border.subtle,
              color: theme.colors.text.primary,
            },
          ]}
          value={searchQuery}
        />
      </View>

      <View style={styles.filterGroup}>
        <Text style={[styles.filterLabel, { color: theme.colors.text.muted }]}>Tipo</Text>
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
                  chipStyle,
                  active && activeChipStyle,
                  pressed && styles.pressed,
                ]}>
                <Text
                  style={[
                    styles.chipLabel,
                    { color: active ? theme.colors.text.primary : theme.colors.text.secondary },
                  ]}>
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.filterGroup}>
        <Text style={[styles.filterLabel, { color: theme.colors.text.muted }]}>Região orbital</Text>
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
                  chipStyle,
                  active && activeChipStyle,
                  pressed && styles.pressed,
                ]}>
                <Text
                  style={[
                    styles.chipLabel,
                    { color: active ? theme.colors.text.primary : theme.colors.text.secondary },
                  ]}>
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
    minHeight: 40,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
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
    minHeight: 44,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
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
    minHeight: 40,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
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
