import { StyleSheet, Text, View } from 'react-native';

import { Card, DisclosureSection } from '@/components/ui';
import { ScoredOrbitalObject } from '@/domain/scoring';
import { colors, spacing, typography } from '@/theme';

import { formatEstimate, formatObjectStatus } from '../object-formatters';

type ObjectTechnicalDetailsProps = {
  object: ScoredOrbitalObject;
};

const unknown = 'Desconhecido';

export function ObjectTechnicalDetails({ object }: ObjectTechnicalDetailsProps) {
  const facts = [
    { label: 'NORAD ID', value: object.noradId ?? unknown },
    { label: 'Região orbital', value: object.orbitRegion },
    { label: 'Altitude', value: formatEstimate(object.altitudeKm, ' km') },
    { label: 'Inclinação', value: formatEstimate(object.inclinationDeg, '°') },
    { label: 'Massa estimada', value: formatEstimate(object.estimatedMassKg, ' kg') },
    { label: 'Tamanho estimado', value: formatEstimate(object.estimatedSizeM, ' m') },
    { label: 'Ano de lançamento', value: object.launchYear?.toString() ?? unknown },
    { label: 'Status', value: formatObjectStatus(object.status) },
  ];

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Detalhes técnicos</Text>
      <DisclosureSection title="Exibir dados técnicos">
        <View style={styles.grid}>
          {facts.map((fact) => (
            <View key={fact.label} style={styles.fact}>
              <Text style={styles.label}>{fact.label}</Text>
              <Text style={styles.value}>{fact.value}</Text>
            </View>
          ))}
        </View>
      </DisclosureSection>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing[5],
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  fact: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: 12,
    borderWidth: 1,
    flexBasis: 140,
    flexGrow: 1,
    gap: spacing[1],
    padding: spacing[3],
  },
  label: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  value: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
