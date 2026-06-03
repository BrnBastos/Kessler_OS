import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Badge, Card } from '@/components/ui';
import { ScoredOrbitalObject, ScoreLevel } from '@/domain/scoring';
import { colors, radius, spacing, typography } from '@/theme';

import {
  formatEstimate,
  formatObjectStatus,
  formatObjectType,
  getScoreTone,
} from '../object-formatters';

type OrbitalVisualProps = {
  objects: ScoredOrbitalObject[];
  selectedObject?: ScoredOrbitalObject;
  onSelectObject?: (object: ScoredOrbitalObject) => void;
};

function getRiskColor(level: ScoreLevel) {
  switch (level) {
    case 'high':
      return colors.semantic.danger;
    case 'medium':
      return colors.semantic.warning;
    case 'low':
      return colors.accent.cyan;
  }
}

function getOrbitRadius(object: ScoredOrbitalObject) {
  switch (object.orbitRegion) {
    case 'LEO':
      return 22;
    case 'MEO':
      return 32;
    case 'GEO':
      return 42;
    case 'HEO':
      return 46;
  }
}

function getMarkerPosition(object: ScoredOrbitalObject, index: number, total: number) {
  const orbitOffset = object.orbitRegion === 'GEO' ? 26 : object.orbitRegion === 'MEO' ? 12 : 0;
  const inclinationOffset = typeof object.inclinationDeg === 'number' ? object.inclinationDeg / 5 : 0;
  const angle = ((index / Math.max(total, 1)) * 360 + orbitOffset + inclinationOffset) * (Math.PI / 180);
  const radius = getOrbitRadius(object);
  const left = 50 + Math.cos(angle) * radius * 1.12;
  const top = 50 + Math.sin(angle) * radius * 0.72;

  return {
    left: `${left.toFixed(2)}%` as `${number}%`,
    top: `${top.toFixed(2)}%` as `${number}%`,
  };
}

export function OrbitalVisual({ objects, onSelectObject, selectedObject }: OrbitalVisualProps) {
  const mappedObjects = objects.slice(0, 10);

  return (
    <Card style={styles.card}>
      <View style={styles.visual}>
        <View style={styles.glow} />
        <View style={[styles.orbitRing, styles.geoOrbit]} />
        <View style={[styles.orbitRing, styles.meoOrbit]} />
        <View style={[styles.orbitRing, styles.leoOrbit]} />
        <Text style={[styles.orbitLabel, styles.leoLabel]}>LEO</Text>
        <Text style={[styles.orbitLabel, styles.meoLabel]}>MEO</Text>
        <Text style={[styles.orbitLabel, styles.geoLabel]}>GEO</Text>

        <LinearGradient
          colors={[colors.accent.blueBright, colors.accent.blue, '#0F3E8F']}
          start={{ x: 0.25, y: 0.1 }}
          end={{ x: 0.8, y: 0.9 }}
          style={styles.earth}>
          <View style={styles.earthHighlight} />
          <View style={styles.earthBandOne} />
          <View style={styles.earthBandTwo} />
        </LinearGradient>

        {mappedObjects.map((object, index) => {
          const selected = selectedObject?.id === object.id;
          const riskColor = getRiskColor(object.scores.risk.level);
          const markerPosition = getMarkerPosition(object, index, mappedObjects.length);

          return (
            <Pressable
              accessibilityLabel={`Selecionar ${object.name}`}
              accessibilityRole="button"
              key={object.id}
              onPress={() => onSelectObject?.(object)}
              style={[
                styles.markerButton,
                markerPosition,
                selected && styles.markerButtonSelected,
              ]}>
              {selected && <View style={[styles.markerHalo, { borderColor: riskColor }]} />}
              <View
                style={[
                  styles.marker,
                  { backgroundColor: riskColor },
                  object.status === 'active' && styles.markerActive,
                  selected && styles.markerSelected,
                ]}
              />
            </Pressable>
          );
        })}

        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Cor do risco</Text>
          <View style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: colors.semantic.danger }]} />
            <Text style={styles.legendText}>Alto</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: colors.semantic.warning }]} />
            <Text style={styles.legendText}>Médio</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: colors.accent.cyan }]} />
            <Text style={styles.legendText}>Baixo</Text>
          </View>
        </View>
      </View>

      <View style={styles.detailPanel}>
        <View style={styles.detailHeader}>
          <View style={styles.detailCopy}>
            <Text style={styles.kicker}>Objeto selecionado</Text>
            <Text style={styles.title}>{selectedObject?.name ?? 'Escolha um objeto'}</Text>
            <Text style={styles.description}>
              {selectedObject
                ? `${formatObjectType(selectedObject.type)} · ${selectedObject.orbitRegion} · ${formatObjectStatus(
                    selectedObject.status
                  )} · ${formatEstimate(selectedObject.altitudeKm, ' km')}`
                : 'Toque em um card ou marcador do mapa para focar o visual orbital e abrir um resumo local.'}
            </Text>
          </View>

          {selectedObject && (
            <Badge
              label="Risco"
              score={selectedObject.scores.risk.score}
              tone={getScoreTone(selectedObject.scores.risk.level)}
            />
          )}
        </View>
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
    backgroundColor: 'rgba(34, 211, 238, 0.12)',
    borderRadius: 999,
    height: '82%',
    position: 'absolute',
    width: '66%',
  },
  orbitRing: {
    borderRadius: 999,
    borderWidth: 1,
    position: 'absolute',
  },
  geoOrbit: {
    borderColor: 'rgba(34, 211, 238, 0.26)',
    height: '82%',
    transform: [{ rotate: '-12deg' }, { scaleX: 1.3 }],
    width: '56%',
  },
  meoOrbit: {
    borderColor: 'rgba(59, 130, 246, 0.32)',
    height: '62%',
    transform: [{ rotate: '24deg' }, { scaleX: 1.24 }],
    width: '42%',
  },
  leoOrbit: {
    borderColor: 'rgba(20, 184, 166, 0.34)',
    height: '44%',
    transform: [{ rotate: '52deg' }, { scaleX: 1.28 }],
    width: '30%',
  },
  orbitLabel: {
    ...typography.caption,
    color: colors.text.muted,
    position: 'absolute',
  },
  leoLabel: {
    left: '56%',
    top: '34%',
  },
  meoLabel: {
    left: '67%',
    top: '26%',
  },
  geoLabel: {
    left: '77%',
    top: '18%',
  },
  earth: {
    alignItems: 'center',
    borderColor: 'rgba(248, 250, 252, 0.14)',
    borderRadius: 999,
    borderWidth: 1,
    height: '26%',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '20%',
  },
  earthHighlight: {
    backgroundColor: 'rgba(248, 250, 252, 0.22)',
    borderRadius: 999,
    height: '18%',
    left: '24%',
    position: 'absolute',
    top: '18%',
    width: '28%',
  },
  earthBandOne: {
    backgroundColor: 'rgba(20, 184, 166, 0.3)',
    borderRadius: 999,
    height: '20%',
    position: 'absolute',
    top: '42%',
    transform: [{ rotate: '-18deg' }],
    width: '92%',
  },
  earthBandTwo: {
    backgroundColor: 'rgba(34, 211, 238, 0.22)',
    borderRadius: 999,
    height: '14%',
    position: 'absolute',
    top: '62%',
    transform: [{ rotate: '22deg' }],
    width: '82%',
  },
  markerButton: {
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    marginLeft: -15,
    marginTop: -15,
    position: 'absolute',
    width: 30,
  },
  markerButtonSelected: {
    zIndex: 5,
  },
  markerHalo: {
    borderRadius: 999,
    borderWidth: 1,
    height: 26,
    position: 'absolute',
    width: 26,
  },
  marker: {
    borderColor: colors.background.app,
    borderRadius: 999,
    borderWidth: 2,
    height: 12,
    width: 12,
  },
  markerActive: {
    borderColor: colors.accent.cyan,
  },
  markerSelected: {
    height: 16,
    width: 16,
  },
  legend: {
    backgroundColor: 'rgba(3, 7, 18, 0.72)',
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing[2],
    left: spacing[3],
    padding: spacing[3],
    position: 'absolute',
    top: spacing[3],
  },
  legendTitle: {
    ...typography.caption,
    color: colors.text.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  legendRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing[2],
  },
  legendDot: {
    borderRadius: 999,
    height: 8,
    width: 8,
  },
  legendText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  detailPanel: {
    gap: spacing[2],
  },
  detailHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  detailCopy: {
    flex: 1,
    gap: spacing[2],
    minWidth: 200,
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
