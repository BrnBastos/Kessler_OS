import { StyleSheet, View } from 'react-native';

import { Metric } from '@/components/ui';
import { mockMissions, mockOrbitalObjects, mockReuseMaterials } from '@/data';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { spacing } from '@/theme';

const highRiskCandidates = mockOrbitalObjects.filter(
  (object) =>
    object.orbitRegion === 'LEO' &&
    (object.status === 'fragment' || object.status === 'inactive' || object.status === 'unknown')
);

const reusableMassPotential =
  Math.round(
    mockReuseMaterials.reduce((total, material) => total + material.estimatedSharePct, 0) /
      mockReuseMaterials.length
  ) || 0;

export function HomeMetrics() {
  const { isDesktop } = useBreakpoint();

  const baseMetrics = [
    {
      detail: 'Local prototype catalog',
      label: 'Tracked Objects',
      tone: 'cyan',
      value: mockOrbitalObjects.length.toString(),
    },
    {
      detail: 'LEO inactive, fragment or unknown',
      label: 'High-Risk Objects',
      tone: 'danger',
      value: highRiskCandidates.length.toString(),
    },
    {
      detail: 'Average estimate across material profiles',
      label: 'Reusable Mass Potential',
      tone: 'teal',
      value: `${reusableMassPotential}%`,
    },
  ] as const;
  const desktopMetrics = [
    ...baseMetrics,
    {
      detail: 'Ready for simulator flow',
      label: 'Simulated Missions',
      tone: 'blue',
      value: mockMissions.length.toString(),
    },
  ] as const;
  const metrics = isDesktop ? desktopMetrics : baseMetrics;

  return (
    <View style={styles.grid}>
      {metrics.map((metric) => (
        <Metric
          key={metric.label}
          detail={metric.detail}
          label={metric.label}
          tone={metric.tone}
          value={metric.value}
          style={styles.card}
        />
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
    flexBasis: 220,
    flexGrow: 1,
  },
});
