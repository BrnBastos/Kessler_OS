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
    body: 'Remove stored energy from batteries, tanks and pressurized systems after the useful mission ends.',
    category: 'Design',
    impact: 'Reduces fragmentation risk',
    title: 'Passivation',
  },
  {
    body: 'Define disposal choices before launch, including target orbit, timeline and operational responsibility.',
    category: 'Planning',
    impact: 'Prevents abandoned assets',
    title: 'End-of-life planning',
  },
  {
    body: 'Use predictable atmospheric disposal when an object can be brought down safely and intentionally.',
    category: 'Disposal',
    impact: 'Shortens time in orbit',
    title: 'Controlled reentry',
  },
  {
    body: 'Move higher-orbit spacecraft away from protected operational regions when reentry is not practical.',
    category: 'Disposal',
    impact: 'Protects active lanes',
    title: 'Graveyard orbit',
  },
  {
    body: 'Keep objects observable through catalog updates, identification data and shared situational awareness.',
    category: 'Operations',
    impact: 'Improves coordination',
    title: 'Tracking and cataloging',
  },
  {
    body: 'Plan maneuvers and decision windows before conjunction alerts turn into urgent operational pressure.',
    category: 'Operations',
    impact: 'Reduces collision probability',
    title: 'Collision avoidance',
  },
  {
    body: 'Treat orbital lifetime, material recovery and disposal as mission requirements instead of afterthoughts.',
    category: 'Mission design',
    impact: 'Connects prevention to circular value',
    title: 'Responsible mission design',
  },
];

export function PreventionPrinciples() {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Prevention principles</Text>
        <Text style={styles.description}>
          These practices reduce debris creation upstream, before an object becomes a removal
          candidate.
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
