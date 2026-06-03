import { StyleSheet, Text, View } from 'react-native';

import { Badge, Card } from '@/components/ui';
import { colors, spacing, typography } from '@/theme';

type PreventionPrinciple = {
  body: string;
  category: string;
  impact: string;
  title: string;
};

const principles: PreventionPrinciple[] = [
  {
    body: 'Remover energia armazenada de baterias, tanques e sistemas pressurizados após o fim da missão útil.',
    category: 'Projeto',
    impact: 'Reduz risco de fragmentação',
    title: 'Passivação',
  },
  {
    body: 'Definir escolhas de descarte antes do lançamento, incluindo órbita-alvo, prazo e responsabilidade operacional.',
    category: 'Planejamento',
    impact: 'Evita ativos abandonados',
    title: 'Planejamento de fim de vida',
  },
  {
    body: 'Usar descarte atmosférico previsível quando um objeto pode ser trazido de volta com segurança e intenção.',
    category: 'Descarte',
    impact: 'Reduz tempo em órbita',
    title: 'Reentrada controlada',
  },
  {
    body: 'Mover naves em órbitas altas para longe de regiões operacionais protegidas quando reentrada não é prática.',
    category: 'Descarte',
    impact: 'Protege faixas ativas',
    title: 'Órbita cemitério',
  },
  {
    body: 'Manter objetos observáveis por atualizações de catálogo, dados de identificação e consciência situacional compartilhada.',
    category: 'Operações',
    impact: 'Melhora coordenação',
    title: 'Rastreamento e catalogação',
  },
  {
    body: 'Planejar manobras e janelas de decisão antes que alertas de aproximação virem pressão operacional urgente.',
    category: 'Operações',
    impact: 'Reduz probabilidade de colisão',
    title: 'Desvio de colisão',
  },
  {
    body: 'Tratar vida orbital, recuperação de material e descarte como requisitos da missão, não como detalhe final.',
    category: 'Desenho de missão',
    impact: 'Conecta prevenção ao valor circular',
    title: 'Desenho responsável de missão',
  },
];

export function PreventionPrinciples() {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Princípios de prevenção</Text>
        <Text style={styles.description}>
          Estas práticas reduzem a criação de detritos antes que um objeto vire candidato à remoção.
        </Text>
      </View>

      <View style={styles.grid}>
        {principles.map((principle) => (
          <View key={principle.title} style={styles.principle}>
            <View style={styles.principleHeader}>
              <Text style={styles.principleTitle}>{principle.title}</Text>
              <Badge label={principle.category} tone="info" />
            </View>
            <Text style={styles.body}>{principle.body}</Text>
            <Text style={styles.impact}>{principle.impact}</Text>
          </View>
        ))}
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  principle: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: 16,
    borderWidth: 1,
    flexBasis: 260,
    flexGrow: 1,
    gap: spacing[3],
    padding: spacing[4],
  },
  principleHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  principleTitle: {
    ...typography.bodySmall,
    color: colors.text.primary,
    flex: 1,
    fontWeight: '700',
    minWidth: 140,
  },
  body: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  impact: {
    ...typography.caption,
    color: colors.accent.cyan,
    textTransform: 'uppercase',
  },
});
