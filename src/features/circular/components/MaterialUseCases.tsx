import { StyleSheet, Text, View } from 'react-native';

import { Badge, Card, DisclosureSection } from '@/components/ui';
import { ReuseMaterialEstimate } from '@/domain/models';
import { colors, radius, spacing, typography } from '@/theme';

type MaterialUseCasesProps = {
  estimates: ReuseMaterialEstimate[];
};

type UseCase = {
  body: string;
  category: string;
  preferredMaterials: ReuseMaterialEstimate['material'][];
  signal: string;
};

const useCases: UseCase[] = [
  {
    body: 'Painéis, tanques ou estruturas recuperadas podem virar blindagem, treliças ou estoque de fabricação para futuras estações.',
    category: 'Material estrutural',
    preferredMaterials: ['aluminum', 'titanium', 'composite'],
    signal: 'Massa alta e estrutura estável ajudam',
  },
  {
    body: 'Materiais densos ou em camadas podem ser avaliados como massa protetora para habitats ou veículos de serviço.',
    category: 'Blindagem contra radiação',
    preferredMaterials: ['aluminum', 'titanium', 'composite'],
    signal: 'Útil quando reparo direto é improvável',
  },
  {
    body: 'Material recuperado pode servir como entrada para experimentos de fabricação orbital e planejamento de matéria-prima.',
    category: 'Matéria-prima de fabricação',
    preferredMaterials: ['aluminum', 'titanium'],
    signal: 'Exige viabilidade de captura e processamento',
  },
  {
    body: 'Objetos inativos podem virar alvos de prática para inspeção, acoplamento, robótica ou operações de proximidade.',
    category: 'Plataforma de testes',
    preferredMaterials: ['electronics', 'unknown', 'composite'],
    signal: 'Bom encaixe antes de promessas de recuperação',
  },
  {
    body: 'Subsistemas utilizáveis podem apoiar diagnósticos, aprendizado ou experimentos supervisionados de recuperação.',
    category: 'Recuperação de componentes',
    preferredMaterials: ['electronics'],
    signal: 'Depende muito da confiança da inspeção',
  },
  {
    body: 'Quando o valor de reuso é baixo ou a incerteza é alta, o descarte seguro ainda pode ser o melhor resultado circular.',
    category: 'Descarte controlado',
    preferredMaterials: ['unknown'],
    signal: 'Previne criação futura de detritos',
  },
];

function getUseCaseTone(matches: number) {
  if (matches >= 2) {
    return 'success';
  }

  if (matches === 1) {
    return 'warning';
  }

  return 'neutral';
}

export function MaterialUseCases({ estimates }: MaterialUseCasesProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Usos possíveis dos materiais</Text>
        <Text style={styles.description}>
          Estas categorias mantêm o reuso prático e sinalizado por confiança para o MVP.
        </Text>
      </View>

      <View style={styles.grid}>
        {useCases.map((useCase) => {
          const matches = estimates.filter((estimate) =>
            useCase.preferredMaterials.includes(estimate.material)
          ).length;

          return (
            <View key={useCase.category} style={styles.useCase}>
              <View style={styles.useCaseHeader}>
                <Text style={styles.useCaseTitle}>{useCase.category}</Text>
                <Badge
                  label={matches > 0 ? `${matches} ${matches > 1 ? 'sinais' : 'sinal'}` : 'observar'}
                  tone={getUseCaseTone(matches)}
                />
              </View>
              <DisclosureSection title="Detalhes do uso">
                <Text style={styles.body}>{useCase.body}</Text>
                <Text style={styles.signal}>{useCase.signal}</Text>
              </DisclosureSection>
            </View>
          );
        })}
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
  useCase: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    flexBasis: 148,
    flexGrow: 1,
    gap: spacing[2],
    padding: spacing[3],
  },
  useCaseHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  useCaseTitle: {
    ...typography.bodySmall,
    color: colors.text.primary,
    flex: 1,
    fontWeight: '700',
    minWidth: 112,
  },
  body: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  signal: {
    ...typography.caption,
    color: colors.accent.cyan,
    textTransform: 'uppercase',
  },
});
