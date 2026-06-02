import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { ScoreLevel } from '@/domain/scoring';
import { colors, radius, spacing, typography } from '@/theme';

type ScoreRingProps = {
  label: string;
  level: ScoreLevel;
  score: number;
  style?: StyleProp<ViewStyle>;
};

function getLevelColor(level: ScoreLevel) {
  switch (level) {
    case 'high':
      return colors.semantic.danger;
    case 'medium':
      return colors.semantic.warning;
    case 'low':
      return colors.semantic.info;
  }
}

export function ScoreRing({ label, level, score, style }: ScoreRingProps) {
  const levelColor = getLevelColor(level);

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.ring, { borderColor: levelColor }]}>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.level}>{level}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing[3],
  },
  ring: {
    alignItems: 'center',
    backgroundColor: colors.background.surface,
    borderRadius: radius.pill,
    borderWidth: 8,
    height: 112,
    justifyContent: 'center',
    width: 112,
  },
  score: {
    ...typography.h2,
    color: colors.text.primary,
  },
  level: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  label: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '700',
    textAlign: 'center',
  },
});
