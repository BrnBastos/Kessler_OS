import { StyleSheet, Text, View } from 'react-native';

import { Badge, Card } from '@/components/ui';
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
    body: 'Recovered panels, tanks or frames could become future station shielding, truss parts or fabrication stock.',
    category: 'Structural material',
    preferredMaterials: ['aluminum', 'titanium', 'composite'],
    signal: 'High mass and stable structure help',
  },
  {
    body: 'Dense or layered material can be evaluated as protective mass for future habitats or service vehicles.',
    category: 'Radiation shielding',
    preferredMaterials: ['aluminum', 'titanium', 'composite'],
    signal: 'Useful when direct repair is unlikely',
  },
  {
    body: 'Recovered material can be treated as input for orbital manufacturing experiments and feedstock planning.',
    category: 'Manufacturing feedstock',
    preferredMaterials: ['aluminum', 'titanium'],
    signal: 'Requires capture and processing feasibility',
  },
  {
    body: 'Inactive objects can become inspection, docking, robotics or proximity-operation practice targets.',
    category: 'Testing platform',
    preferredMaterials: ['electronics', 'unknown', 'composite'],
    signal: 'Good fit before full recovery claims',
  },
  {
    body: 'Usable subsystems might support diagnostics, learning or supervised recovery experiments.',
    category: 'Component recovery',
    preferredMaterials: ['electronics'],
    signal: 'Depends heavily on inspection confidence',
  },
  {
    body: 'When reuse value is weak or uncertainty is high, safe disposal may still be the best circular outcome.',
    category: 'Controlled disposal',
    preferredMaterials: ['unknown'],
    signal: 'Prevents future debris creation',
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
        <Text style={styles.title}>Material use cases</Text>
        <Text style={styles.description}>
          These categories keep reuse language practical and confidence-aware for an MVP.
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
                  label={matches > 0 ? `${matches} signal${matches > 1 ? 's' : ''}` : 'watch'}
                  tone={getUseCaseTone(matches)}
                />
              </View>
              <Text style={styles.body}>{useCase.body}</Text>
              <Text style={styles.signal}>{useCase.signal}</Text>
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
    flexBasis: 260,
    flexGrow: 1,
    gap: spacing[3],
    padding: spacing[4],
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
    minWidth: 150,
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
