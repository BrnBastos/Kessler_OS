import { StyleSheet, Text, View } from 'react-native';

import { Badge, Card } from '@/components/ui';
import { DataConfidence } from '@/domain/models';
import { colors, spacing, typography } from '@/theme';

import { getConfidenceLabel, getConfidenceTone } from '../object-formatters';

type DataConfidenceNoteProps = {
  confidence: DataConfidence;
};

function getConfidenceExplanation(confidence: DataConfidence) {
  switch (confidence) {
    case 'confirmed':
      return 'This field is treated as public reference data in the prototype. Scores still use simplified models.';
    case 'estimated':
      return 'Some values are estimated from public-style metadata. Treat results as planning signals, not confirmed operational truth.';
    case 'simulated':
      return 'This object or value exists to test product behavior. It should not be presented as a real operational catalog item.';
    case 'unknown':
      return 'Important data is missing. Kessler should recommend review or inspection before strong conclusions.';
  }
}

export function DataConfidenceNote({ confidence }: DataConfidenceNoteProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Data confidence</Text>
        <Badge label={getConfidenceLabel(confidence)} tone={getConfidenceTone(confidence)} />
      </View>
      <Text style={styles.body}>{getConfidenceExplanation(confidence)}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing[4],
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
  },
  body: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
});
