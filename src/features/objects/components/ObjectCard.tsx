import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Badge, Button, Card } from '@/components/ui';
import { ScoredOrbitalObject } from '@/domain/scoring';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, radius, spacing, typography, useKesslerTheme } from '@/theme';

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
  const theme = useKesslerTheme();

  return (
    <View
      style={[
        styles.signal,
        {
          backgroundColor: theme.colors.background.surface,
          borderColor: theme.colors.border.subtle,
        },
      ]}>
      <Text style={[styles.signalValue, { color: theme.colors.text.primary }]}>{value}</Text>
      <Text style={[styles.signalLabel, { color: theme.colors.text.muted }]}>{label}</Text>
    </View>
  );
}

export function ObjectCard({ object, onOpenPassport, onSelect, selected }: ObjectCardProps) {
  const { isPhone } = useBreakpoint();
  const theme = useKesslerTheme();
  const riskTone = getScoreTone(object.scores.risk.level);

  return (
    <Card
      variant="action"
      style={[styles.card, selected && { borderColor: theme.colors.border.strong }]}>
      <View
        style={[
          styles.visualStage,
          {
            backgroundColor: theme.isLightMode
              ? 'rgba(64, 109, 140, 0.66)'
              : 'rgba(2, 6, 23, 0.50)',
            borderBottomColor: theme.colors.border.subtle,
          },
        ]}>
        <View style={[styles.orbitRing, styles.orbitRingOuter]} />
        <View style={[styles.orbitRing, styles.orbitRingInner]} />
        <Image source={getObjectVisualAsset(object)} contentFit="contain" style={styles.objectImage} />
        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: theme.isLightMode
                ? 'rgba(52, 91, 118, 0.88)'
                : 'rgba(7, 17, 30, 0.76)',
              borderColor: theme.colors.border.subtle,
            },
          ]}>
          <Text style={[styles.statusPillText, { color: theme.colors.text.primary }]}>
            {getStatusLead(object.status)}
          </Text>
        </View>
        <View
          style={[
            styles.riskPlate,
            {
              backgroundColor: theme.isLightMode
                ? 'rgba(186, 230, 253, 0.22)'
                : 'rgba(14, 165, 233, 0.16)',
              borderColor: theme.colors.border.strong,
            },
            riskTone === 'danger' && styles.riskPlateDanger,
          ]}>
          <Text style={[styles.riskScore, { color: theme.colors.text.primary }]}>
            {object.scores.risk.score}
          </Text>
          <Text style={[styles.riskLabel, { color: theme.colors.text.secondary }]}>
            risco {formatRiskLevel(object.scores.risk.level)}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.header}>
          <View style={styles.titleGroup}>
            <Text numberOfLines={2} style={[styles.name, { color: theme.colors.text.primary }]}>
              {object.name}
            </Text>
            <Text style={[styles.meta, { color: theme.colors.text.muted }]}>
              {formatObjectType(object.type)} · {object.orbitRegion} ·{' '}
              {formatObjectStatus(object.status)}
            </Text>
          </View>
          <Badge
            label={getConfidenceLabel(object.dataConfidence)}
            tone={getConfidenceTone(object.dataConfidence)}
          />
        </View>

        <Text numberOfLines={3} style={[styles.summary, { color: theme.colors.text.secondary }]}>
          {object.summary}
        </Text>

        <View style={styles.signalRow}>
          <Signal label="prioridade" value={object.scores.priority.score.toString()} />
          <Signal label="reuso" value={object.scores.forgeValue.score.toString()} />
          <Signal label="altitude" value={formatEstimate(object.altitudeKm, ' km')} />
        </View>

        <View
          style={[
            styles.decisionPanel,
            {
              backgroundColor: theme.isLightMode
                ? 'rgba(153, 246, 228, 0.16)'
                : 'rgba(45, 212, 191, 0.08)',
              borderColor: theme.isLightMode
                ? 'rgba(153, 246, 228, 0.38)'
                : 'rgba(45, 212, 191, 0.20)',
            },
          ]}>
          <Text style={[styles.decisionLabel, { color: theme.colors.accent.teal }]}>
            Sinal principal
          </Text>
          <Text numberOfLines={2} style={[styles.decision, { color: theme.colors.text.primary }]}>
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
