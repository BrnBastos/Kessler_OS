import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui';
import { OrbitalObject } from '@/domain/models';
import { colors, radius, spacing, typography } from '@/theme';

import { formatEstimate, formatObjectType } from '../object-formatters';

type OrbitalVisualProps = {
  objects: OrbitalObject[];
  selectedObject?: OrbitalObject;
};

const markerPositions = [
  { left: '72%', top: '22%' },
  { left: '23%', top: '70%' },
  { left: '66%', top: '72%' },
  { left: '18%', top: '30%' },
  { left: '48%', top: '16%' },
  { left: '82%', top: '48%' },
  { left: '36%', top: '82%' },
  { left: '12%', top: '52%' },
] as const;

export function OrbitalVisual({ objects, selectedObject }: OrbitalVisualProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.visual}>
        <View style={styles.glow} />
        <View style={styles.orbitOuter} />
        <View style={styles.orbitMiddle} />
        <View style={styles.orbitInner} />
        <View style={styles.earth} />

        {objects.slice(0, markerPositions.length).map((object, index) => {
          const selected = selectedObject?.id === object.id;

          return (
            <View
              key={object.id}
              style={[
                styles.marker,
                markerPositions[index],
                selected && styles.markerSelected,
                object.status === 'active' && styles.markerActive,
              ]}
            />
          );
        })}
      </View>

      <View style={styles.detailPanel}>
        <Text style={styles.kicker}>Selected object</Text>
        <Text style={styles.title}>{selectedObject?.name ?? 'Choose an object'}</Text>
        <Text style={styles.description}>
          {selectedObject
            ? `${formatObjectType(selectedObject.type)} in ${selectedObject.orbitRegion} at ${formatEstimate(
                selectedObject.altitudeKm,
                ' km'
              )}.`
            : 'Tap an object card to focus the orbit visual and open a local detail summary.'}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing[5],
  },
  visual: {
    alignItems: 'center',
    aspectRatio: 1.35,
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.lg,
    borderWidth: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  glow: {
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    borderRadius: 999,
    height: '74%',
    position: 'absolute',
    width: '54%',
  },
  orbitOuter: {
    borderColor: 'rgba(34, 211, 238, 0.26)',
    borderRadius: 999,
    borderWidth: 1,
    height: '80%',
    position: 'absolute',
    transform: [{ rotate: '-18deg' }, { scaleX: 1.28 }],
    width: '54%',
  },
  orbitMiddle: {
    borderColor: 'rgba(59, 130, 246, 0.3)',
    borderRadius: 999,
    borderWidth: 1,
    height: '62%',
    position: 'absolute',
    transform: [{ rotate: '24deg' }, { scaleX: 1.22 }],
    width: '42%',
  },
  orbitInner: {
    borderColor: 'rgba(20, 184, 166, 0.22)',
    borderRadius: 999,
    borderWidth: 1,
    height: '44%',
    position: 'absolute',
    transform: [{ rotate: '52deg' }, { scaleX: 1.28 }],
    width: '30%',
  },
  earth: {
    backgroundColor: colors.accent.blue,
    borderColor: 'rgba(248, 250, 252, 0.14)',
    borderRadius: 999,
    borderWidth: 1,
    height: '26%',
    width: '20%',
  },
  marker: {
    backgroundColor: colors.semantic.warning,
    borderColor: colors.background.app,
    borderRadius: 999,
    borderWidth: 2,
    height: 12,
    position: 'absolute',
    width: 12,
  },
  markerActive: {
    backgroundColor: colors.accent.cyan,
  },
  markerSelected: {
    backgroundColor: colors.semantic.danger,
    height: 18,
    width: 18,
  },
  detailPanel: {
    gap: spacing[2],
  },
  kicker: {
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
