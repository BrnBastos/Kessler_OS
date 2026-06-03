import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Badge, Button, Card } from '@/components/ui';
import { ScoredOrbitalObject } from '@/domain/scoring';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, radius, spacing, typography } from '@/theme';

import {
  formatEstimate,
  formatObjectStatus,
  formatObjectType,
  getConfidenceLabel,
  getConfidenceTone,
  getScoreTone,
} from '../object-formatters';
import { getObjectVisualAsset } from '../object-visuals';

type ObjectCardProps = {
  object: ScoredOrbitalObject;
  onOpenPassport: (object: ScoredOrbitalObject) => void;
  onSelect: (object: ScoredOrbitalObject) => void;
  selected?: boolean;
};

function formatRiskLevel(level: ScoredOrbitalObject['scores']['risk']['level']) {
  switch (level) {
    case 'high':
      return 'Alto';
    case 'medium':
      return 'Médio';
    case 'low':
      return 'Baixo';
  }
}

function getStatusLead(status: ScoredOrbitalObject['status']) {
  switch (status) {
    case 'active':
      return 'Ativo e acompanhado';
    case 'inactive':
      return 'Inativo em órbita';
    case 'fragment':
      return 'Fragmento monitorado';
    case 'unknown':
      return 'Identidade incerta';
  }
}

function Signal({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.signal}>
      <Text style={styles.signalValue}>{value}</Text>
      <Text style={styles.signalLabel}>{label}</Text>
    </View>
  );
}

export function ObjectCard({ object, onOpenPassport, onSelect, selected }: ObjectCardProps) {
  const { isPhone } = useBreakpoint();
  const riskTone = getScoreTone(object.scores.risk.level);

  return (
    <Card variant="action" style={[styles.card, selected && styles.cardSelected]}>
      <View style={styles.visualStage}>
        <View style={[styles.orbitRing, styles.orbitRingOuter]} />
        <View style={[styles.orbitRing, styles.orbitRingInner]} />
        <Image source={getObjectVisualAsset(object)} contentFit="contain" style={styles.objectImage} />
        <View style={styles.statusPill}>
          <Text style={styles.statusPillText}>{getStatusLead(object.status)}</Text>
        </View>
        <View style={[styles.riskPlate, riskTone === 'danger' && styles.riskPlateDanger]}>
          <Text style={styles.riskScore}>{object.scores.risk.score}</Text>
          <Text style={styles.riskLabel}>risco {formatRiskLevel(object.scores.risk.level)}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.header}>
          <View style={styles.titleGroup}>
            <Text numberOfLines={2} style={styles.name}>
              {object.name}
            </Text>
            <Text style={styles.meta}>
              {formatObjectType(object.type)} · {object.orbitRegion} ·{' '}
              {formatObjectStatus(object.status)}
            </Text>
          </View>
          <Badge
            label={getConfidenceLabel(object.dataConfidence)}
            tone={getConfidenceTone(object.dataConfidence)}
          />
        </View>

        <Text numberOfLines={3} style={styles.summary}>
          {object.summary}
        </Text>

        <View style={styles.signalRow}>
          <Signal label="prioridade" value={object.scores.priority.score.toString()} />
          <Signal label="reuso" value={object.scores.forgeValue.score.toString()} />
          <Signal label="altitude" value={formatEstimate(object.altitudeKm, ' km')} />
        </View>

        <View style={styles.decisionPanel}>
          <Text style={styles.decisionLabel}>Sinal principal</Text>
          <Text numberOfLines={2} style={styles.decision}>
            {object.scores.priority.decision}
          </Text>
        </View>

        <View style={[styles.actions, isPhone && styles.actionsPhone]}>
          <Button
            fullWidth={isPhone}
            size="small"
            variant={selected ? 'ghost' : 'secondary'}
            onPress={() => onSelect(object)}>
            {selected ? 'Em foco' : 'Focar objeto'}
          </Button>
          <Button fullWidth={isPhone} size="small" onPress={() => onOpenPassport(object)}>
            Ver ficha
          </Button>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    padding: 0,
  },
  cardSelected: {
    borderColor: 'rgba(34, 211, 238, 0.48)',
  },
  visualStage: {
    backgroundColor: 'rgba(2, 6, 23, 0.50)',
    borderBottomColor: colors.border.subtle,
    borderBottomWidth: 1,
    height: 188,
    overflow: 'hidden',
  },
  orbitRing: {
    borderColor: 'rgba(56, 232, 255, 0.20)',
    borderRadius: radius.pill,
    borderWidth: 1,
    position: 'absolute',
  },
  orbitRingOuter: {
    bottom: -84,
    height: 260,
    right: -56,
    transform: [{ rotate: '-18deg' }, { scaleX: 1.25 }],
    width: 190,
  },
  orbitRingInner: {
    bottom: -38,
    height: 170,
    right: 18,
    transform: [{ rotate: '28deg' }, { scaleX: 1.2 }],
    width: 118,
  },
  objectImage: {
    bottom: -18,
    height: '86%',
    position: 'absolute',
    right: -8,
    width: '64%',
  },
  statusPill: {
    backgroundColor: 'rgba(7, 17, 30, 0.76)',
    borderColor: colors.border.subtle,
    borderRadius: radius.pill,
    borderWidth: 1,
    left: spacing[4],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    position: 'absolute',
    top: spacing[4],
  },
  statusPillText: {
    ...typography.caption,
    color: colors.text.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  riskPlate: {
    backgroundColor: 'rgba(14, 165, 233, 0.16)',
    borderColor: 'rgba(56, 232, 255, 0.30)',
    borderRadius: radius.lg,
    borderWidth: 1,
    bottom: spacing[4],
    gap: spacing[1],
    left: spacing[4],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    position: 'absolute',
  },
  riskPlateDanger: {
    backgroundColor: 'rgba(239, 68, 68, 0.16)',
    borderColor: 'rgba(239, 68, 68, 0.34)',
  },
  riskScore: {
    ...typography.h2,
    color: colors.text.primary,
  },
  riskLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    textTransform: 'uppercase',
  },
  body: {
    gap: spacing[4],
    padding: spacing[5],
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  titleGroup: {
    flexShrink: 1,
    gap: spacing[1],
    minWidth: 0,
  },
  name: {
    ...typography.h3,
    color: colors.text.primary,
  },
  meta: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  summary: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  signalRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  signal: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    flexBasis: 104,
    flexGrow: 1,
    gap: spacing[1],
    padding: spacing[3],
  },
  signalValue: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  signalLabel: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  decisionPanel: {
    backgroundColor: 'rgba(45, 212, 191, 0.08)',
    borderColor: 'rgba(45, 212, 191, 0.20)',
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing[1],
    padding: spacing[3],
  },
  decisionLabel: {
    ...typography.caption,
    color: colors.accent.teal,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  decision: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  actions: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  actionsPhone: {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
});
