import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui';
import { colors, spacing, typography } from '@/theme';

const features = [
  {
    description: 'Veja quais objetos estão próximos demais, antigos demais ou perigosos demais.',
    eyebrow: 'Risco',
    title: 'Análise de risco',
  },
  {
    description: 'Teste inspeção, remoção, desvio ou monitoramento antes de escolher um caminho.',
    eyebrow: 'Missão',
    title: 'Simulação de missão',
  },
  {
    description: 'Entenda quando um objeto abandonado pode virar recurso para novas missões.',
    eyebrow: 'Reuso',
    title: 'Reaproveitamento orbital',
  },
];

export function FeatureCards() {
  return (
    <View style={styles.grid}>
      {features.map((feature) => (
        <Card key={feature.title} variant="feature" style={styles.card}>
          <Text style={styles.eyebrow}>{feature.eyebrow}</Text>
          <Text style={styles.title}>{feature.title}</Text>
          <Text style={styles.description}>{feature.description}</Text>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],
  },
  card: {
    flexBasis: 260,
    flexGrow: 1,
    gap: spacing[3],
  },
  eyebrow: {
    ...typography.caption,
    color: colors.accent.cyan,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
  },
  description: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
});
