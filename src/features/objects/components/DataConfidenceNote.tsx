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
      return 'Este campo é tratado como dado público de referência no protótipo. As pontuações ainda usam modelos simplificados.';
    case 'estimated':
      return 'Alguns valores são estimados a partir de metadados públicos. Trate os resultados como sinais de planejamento, não como verdade operacional confirmada.';
    case 'simulated':
      return 'Este objeto ou valor existe para testar o comportamento do produto. Ele não deve ser apresentado como item operacional real.';
    case 'unknown':
      return 'Dados importantes estão ausentes. O Kessler deve recomendar revisão ou inspeção antes de conclusões fortes.';
  }
}

export function DataConfidenceNote({ confidence }: DataConfidenceNoteProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Confiança dos dados</Text>
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
