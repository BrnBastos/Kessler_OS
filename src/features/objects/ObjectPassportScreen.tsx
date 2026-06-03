import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge, Button, Card } from '@/components/ui';
import { visualAssets } from '@/config/visualAssets';
import { getScoredOrbitalObjectById } from '@/domain/repositories';
import { DecisionReportPanel } from '@/features/reports/DecisionReportPanel';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, layout, radius, spacing, typography, useKesslerTheme } from '@/theme';

import { DataConfidenceNote } from './components/DataConfidenceNote';
import { ObjectScorePanel } from './components/ObjectScorePanel';
import { ObjectSummaryCard } from './components/ObjectSummaryCard';
import { ObjectTechnicalDetails } from './components/ObjectTechnicalDetails';
import {
  formatObjectStatus,
  formatObjectType,
  getConfidenceLabel,
  getConfidenceTone,
  getScoreTone,
} from './object-formatters';
import { getObjectVisualAsset } from './object-visuals';

type ObjectPassportScreenProps = {
  objectId: string;
};

export function ObjectPassportScreen({ objectId }: ObjectPassportScreenProps) {
  const { isDesktop, isPhone } = useBreakpoint();
  const theme = useKesslerTheme();
  const object = getScoredOrbitalObjectById(objectId);
  const pageBackgroundStyle = { backgroundColor: theme.colors.background.app };
  const heroOverlayColors = [
    'rgba(2, 6, 23, 0.97)',
    'rgba(2, 6, 23, 0.56)',
    'rgba(2, 6, 23, 0.95)',
  ] as const;

  if (!object) {
    return (
      <View style={[styles.root, pageBackgroundStyle]}>
        <ScrollView
          style={[styles.scroll, pageBackgroundStyle]}
          contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}>
          <SafeAreaView>
            <Card style={styles.notFoundCard}>
              <Text style={styles.notFoundTitle}>Objeto não encontrado.</Text>
              <Text style={styles.notFoundBody}>
                Este objeto não está disponível no repositório local. Volte ao explorador e escolha
                outro item.
              </Text>
              <Button onPress={() => router.push('/orbit')}>Voltar ao mapa orbital</Button>
            </Card>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.root, pageBackgroundStyle]}>
      <ScrollView
        style={[styles.scroll, pageBackgroundStyle]}
        contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}>
        <SafeAreaView>
          <View style={styles.stack}>
            <View
              style={[
                styles.heroPanel,
                {
                  backgroundColor: theme.colors.background.surface,
                  borderColor: theme.colors.border.subtle,
                },
              ]}>
              <Image
                source={visualAssets.backgrounds.satelliteOverEarth}
                contentFit="cover"
                style={styles.heroImage}
              />
              <LinearGradient
                colors={heroOverlayColors}
                start={{ x: 0, y: 0.1 }}
                end={{ x: 1, y: 1 }}
                style={styles.heroOverlay}
              />

              <View style={[styles.heroContent, isDesktop && styles.heroContentDesktop]}>
                <View style={styles.heroCopy}>
                  <View style={styles.heroBadges}>
                    <Badge label="Ficha do objeto" tone="simulated" />
                    <Badge
                      label={getConfidenceLabel(object.dataConfidence)}
                      tone={getConfidenceTone(object.dataConfidence)}
                    />
                  </View>
                  <Text style={[styles.heroTitle, isPhone && styles.heroTitlePhone]}>
                    {object.name}
                  </Text>
                  <Text style={styles.heroMeta}>
                    {formatObjectType(object.type)} · {object.orbitRegion} ·{' '}
                    {formatObjectStatus(object.status)}
                  </Text>
                  <Text style={styles.heroDescription}>
                    Antes de decidir uma missão, veja a história, o risco, a prioridade e o potencial
                    de reaproveitamento deste objeto orbital.
                  </Text>
                  <View style={[styles.heroActions, isPhone && styles.heroActionsPhone]}>
                    <Button fullWidth={isPhone} variant="secondary" onPress={() => router.push('/orbit')}>
                      Voltar ao mapa
                    </Button>
                    <Button
                      fullWidth={isPhone}
                      onPress={() =>
                        router.push({
                          pathname: '/missions',
                          params: { objectId: object.id },
                        })
                      }>
                      Simular missão
                    </Button>
                  </View>
                </View>

                <View
                  style={[
                    styles.heroObjectCard,
                    {
                      backgroundColor: theme.isLightMode
                        ? 'rgba(52, 91, 118, 0.84)'
                        : 'rgba(2, 6, 23, 0.62)',
                      borderColor: theme.colors.border.subtle,
                    },
                  ]}>
                  <View
                    style={[
                      styles.heroObjectStage,
                      {
                        backgroundColor: theme.isLightMode
                          ? 'rgba(64, 109, 140, 0.56)'
                          : 'rgba(7, 17, 30, 0.48)',
                        borderColor: theme.colors.border.subtle,
                      },
                    ]}>
                    <View style={[styles.heroOrbitRing, styles.heroOrbitOuter]} />
                    <View style={[styles.heroOrbitRing, styles.heroOrbitInner]} />
                    <Image
                      source={getObjectVisualAsset(object)}
                      contentFit="contain"
                      style={styles.heroObjectImage}
                    />
                  </View>
                  <View style={styles.heroScoreRow}>
                    <Badge
                      label="Risco"
                      score={object.scores.risk.score}
                      tone={getScoreTone(object.scores.risk.level)}
                      style={styles.heroScoreBadge}
                    />
                    <Badge
                      label="Prioridade"
                      score={object.scores.priority.score}
                      tone={getScoreTone(object.scores.priority.level)}
                      style={styles.heroScoreBadge}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.grid, isDesktop && styles.gridDesktop]}>
              <View style={styles.mainColumn}>
                <ObjectSummaryCard object={object} />
                <ObjectScorePanel object={object} />
                <DecisionReportPanel context="object-passport" object={object} />
              </View>

              <View style={styles.sideColumn}>
                <ObjectTechnicalDetails object={object} />
                <DataConfidenceNote confidence={object.dataConfidence} />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.background.app,
    flex: 1,
  },
  scroll: {
    backgroundColor: colors.background.app,
    flex: 1,
  },
  content: {
    alignSelf: 'center',
    maxWidth: layout.maxContentWidth,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[8],
    width: '100%',
  },
  contentDesktop: {
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[10],
  },
  stack: {
    gap: spacing[6],
  },
  heroPanel: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.xl,
    borderWidth: 1,
    minHeight: 520,
    overflow: 'hidden',
  },
  heroImage: {
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
  heroOverlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  heroContent: {
    gap: spacing[8],
    justifyContent: 'space-between',
    minHeight: 520,
    padding: spacing[5],
  },
  heroContentDesktop: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing[8],
  },
  heroCopy: {
    flex: 1,
    gap: spacing[4],
    maxWidth: 700,
  },
  heroBadges: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  heroTitle: {
    ...typography.display,
    color: colors.text.primary,
    letterSpacing: 0,
  },
  heroTitlePhone: {
    fontSize: 40,
    lineHeight: 46,
  },
  heroMeta: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  heroDescription: {
    ...typography.body,
    color: colors.text.secondary,
    maxWidth: 660,
  },
  heroActions: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  heroActionsPhone: {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  heroObjectCard: {
    backgroundColor: 'rgba(2, 6, 23, 0.62)',
    borderColor: colors.border.subtle,
    borderRadius: radius.xl,
    borderWidth: 1,
    flex: 0.72,
    gap: spacing[4],
    minHeight: 320,
    overflow: 'hidden',
    padding: spacing[4],
  },
  heroObjectStage: {
    backgroundColor: 'rgba(7, 17, 30, 0.48)',
    borderColor: colors.border.subtle,
    borderRadius: radius.lg,
    borderWidth: 1,
    flex: 1,
    minHeight: 210,
    overflow: 'hidden',
  },
  heroOrbitRing: {
    borderColor: 'rgba(56, 232, 255, 0.22)',
    borderRadius: radius.pill,
    borderWidth: 1,
    position: 'absolute',
  },
  heroOrbitOuter: {
    bottom: -104,
    height: 320,
    right: -62,
    transform: [{ rotate: '-18deg' }, { scaleX: 1.26 }],
    width: 232,
  },
  heroOrbitInner: {
    bottom: -48,
    height: 210,
    right: 30,
    transform: [{ rotate: '28deg' }, { scaleX: 1.2 }],
    width: 146,
  },
  heroObjectImage: {
    bottom: -22,
    height: '88%',
    position: 'absolute',
    right: -18,
    width: '78%',
  },
  heroScoreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  heroScoreBadge: {
    flexGrow: 1,
  },
  grid: {
    gap: spacing[5],
  },
  gridDesktop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  mainColumn: {
    flex: 1.18,
    gap: spacing[5],
  },
  sideColumn: {
    flex: 0.82,
    gap: spacing[5],
  },
  notFoundCard: {
    gap: spacing[4],
  },
  notFoundTitle: {
    ...typography.h2,
    color: colors.text.primary,
  },
  notFoundBody: {
    ...typography.body,
    color: colors.text.secondary,
  },
});
