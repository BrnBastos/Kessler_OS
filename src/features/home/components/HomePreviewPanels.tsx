import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Badge, Button, Card, SectionHeader } from '@/components/ui';
import { formatReusePathLabel } from '@/content/pt-br';
import { mockOrbitalObjects, mockReuseMaterials } from '@/data';
import { formatObjectStatus } from '@/features/objects/object-formatters';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, radius, spacing, typography } from '@/theme';

const priorityPreview = mockOrbitalObjects
  .filter((object) => object.status !== 'active')
  .slice(0, 3)
  .map((object, index) => ({
    object,
    score: [82, 76, 68][index] ?? 62,
  }));

const materialPreview = mockReuseMaterials.slice(0, 3);

export function HomePreviewPanels() {
  const { isDesktop } = useBreakpoint();

  return (
    <View style={[styles.grid, isDesktop && styles.gridDesktop]}>
      <Card variant="score" style={styles.panel}>
        <SectionHeader
          eyebrow="Fila de Prioridade"
          title="Prévia de atenção"
          description="Exemplos priorizados a partir do catálogo local de objetos."
        />

        <View style={styles.priorityList}>
          {priorityPreview.map(({ object, score }) => (
            <View key={object.id} style={styles.priorityRow}>
              <View style={styles.priorityCopy}>
                <Text style={styles.rowTitle}>{object.name}</Text>
                <Text style={styles.rowMeta}>
                  {object.orbitRegion} · {formatObjectStatus(object.status)}
                </Text>
              </View>
              <Badge label="Prioridade" score={score} tone={score >= 70 ? 'danger' : 'warning'} />
            </View>
          ))}
        </View>

        <Button variant="secondary" onPress={() => router.push('/priority')}>
          Ver prioridades
        </Button>
      </Card>

      <Card variant="action" style={styles.panel}>
        <SectionHeader
          eyebrow="Reaproveitamento orbital"
          title="Potencial dos materiais"
          description="Categorias simples de reuso com estimativas sinalizadas por confiança."
        />

        <View style={styles.economyRow}>
          <View style={styles.donut}>
            <View style={styles.donutSegmentBlue} />
            <View style={styles.donutSegmentCyan} />
            <View style={styles.donutSegmentTeal} />
            <View style={styles.donutHole}>
              <Text style={styles.donutText}>42%</Text>
            </View>
          </View>

          <View style={styles.materialList}>
            {materialPreview.map((material) => (
              <View key={material.id} style={styles.materialItem}>
                <View style={styles.materialHeader}>
                  <View style={styles.materialDot} />
                  <Text style={styles.rowTitle}>{material.material}</Text>
                </View>
                <Text style={styles.rowMeta}>
                  {material.estimatedSharePct}% · {formatReusePathLabel(material.preferredPath)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Button variant="secondary" onPress={() => router.push('/circular')}>
          Ver detalhes
        </Button>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: spacing[4],
  },
  gridDesktop: {
    flexDirection: 'row',
  },
  panel: {
    flex: 1,
    gap: spacing[5],
  },
  priorityList: {
    gap: spacing[3],
  },
  priorityRow: {
    alignItems: 'center',
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing[3],
    justifyContent: 'space-between',
    padding: spacing[3],
  },
  priorityCopy: {
    flex: 1,
    gap: spacing[1],
  },
  rowTitle: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  rowMeta: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  economyRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[5],
  },
  donut: {
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: colors.chart.blue,
    borderColor: colors.border.strong,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
    minWidth: 132,
    overflow: 'hidden',
    width: 132,
  },
  donutSegmentBlue: {
    backgroundColor: colors.chart.blue,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  donutSegmentCyan: {
    backgroundColor: colors.chart.cyan,
    height: '50%',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50%',
  },
  donutSegmentTeal: {
    backgroundColor: colors.chart.teal,
    bottom: 0,
    height: '50%',
    position: 'absolute',
    right: 0,
    width: '50%',
  },
  donutHole: {
    alignItems: 'center',
    backgroundColor: colors.background.surfaceElevated,
    borderRadius: 999,
    height: 76,
    justifyContent: 'center',
    width: 76,
  },
  donutText: {
    ...typography.h3,
    color: colors.text.primary,
  },
  materialList: {
    flex: 1,
    gap: spacing[3],
    minWidth: 190,
  },
  materialItem: {
    gap: spacing[1],
  },
  materialHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing[2],
  },
  materialDot: {
    backgroundColor: colors.accent.cyan,
    borderRadius: 999,
    height: 8,
    width: 8,
  },
});
