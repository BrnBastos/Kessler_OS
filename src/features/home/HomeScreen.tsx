import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui';
import { visualAssets } from '@/config/visualAssets';
import { mockMissions, mockOrbitalObjects } from '@/data';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, layout, radius, shadows, spacing, typography, useKesslerTheme } from '@/theme';

const problemCards = [
  {
    body: 'Satélites antigos e fragmentos pequenos continuam viajando a milhares de quilômetros por hora.',
    title: 'Órbita congestionada',
  },
  {
    body: 'Uma colisão pode gerar mais fragmentos e aumentar o risco para missões que ainda funcionam.',
    title: 'Risco em cadeia',
  },
  {
    body: 'Comunicação, GPS, internet, clima e ciência dependem de uma órbita mais segura.',
    title: 'Impacto na Terra',
  },
];

const decisionCards = [
  {
    body: 'Quais objetos estão próximos demais, antigos demais ou perigosos demais para ignorar?',
    label: 'Risco',
  },
  {
    body: 'O que merece atenção primeiro quando dados, incerteza e viabilidade entram na conta?',
    label: 'Prioridade',
  },
  {
    body: 'Vale simular inspeção, remoção, desvio ou reaproveitamento antes de agir?',
    label: 'Missão',
  },
];

const reuseCards = [
  'Metal recuperável',
  'Peças reaproveitáveis',
  'Infraestrutura orbital',
  'Menos desperdício na Terra',
];

const audienceCards = [
  'Estudantes',
  'Professores',
  'Pesquisadores',
  'Equipes de inovação',
  'Público curioso',
  'Gestores de risco orbital',
];

const inactiveObjects = mockOrbitalObjects.filter((object) => object.status !== 'active');

function HeroMetric({ label, value }: { label: string; value: string }) {
  const theme = useKesslerTheme();

  return (
    <View
      style={[
        styles.heroMetric,
        {
          backgroundColor: theme.isLightMode
            ? 'rgba(52, 91, 118, 0.84)'
            : 'rgba(7, 17, 30, 0.76)',
          borderColor: theme.colors.border.subtle,
        },
      ]}>
      <Text style={[styles.heroMetricValue, { color: theme.colors.text.primary }]}>{value}</Text>
      <Text style={[styles.heroMetricLabel, { color: theme.colors.text.muted }]}>{label}</Text>
    </View>
  );
}

function SectionTitle({
  align = 'left',
  eyebrow,
  subtitle,
  title,
}: {
  align?: 'center' | 'left';
  eyebrow: string;
  subtitle?: string;
  title: string;
}) {
  const theme = useKesslerTheme();

  return (
    <View style={[styles.sectionTitle, align === 'center' && styles.sectionTitleCenter]}>
      <Text style={[styles.eyebrow, { color: theme.colors.accent.cyan }]}>{eyebrow}</Text>
      <Text
        style={[
          styles.sectionHeading,
          { color: theme.colors.text.primary },
          align === 'center' && styles.textCenter,
        ]}>
        {title}
      </Text>
      {subtitle && (
        <Text
          style={[
            styles.sectionSubtitle,
            { color: theme.colors.text.secondary },
            align === 'center' && styles.textCenter,
          ]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

function VisualPanel({
  children,
  source,
}: {
  children?: ReactNode;
  source: ImageSourcePropType;
}) {
  const theme = useKesslerTheme();
  const { isPhone } = useBreakpoint();
  const visualOverlayColors = ['rgba(2, 6, 23, 0.10)', 'rgba(2, 6, 23, 0.78)'] as const;

  return (
    <View
      style={[
        styles.visualPanel,
        {
          backgroundColor: theme.colors.background.surface,
          borderColor: theme.colors.border.subtle,
        },
        isPhone && styles.visualPanelPhone,
      ]}>
      <Image source={source} contentFit="cover" style={styles.visualImage} />
      <LinearGradient
        colors={visualOverlayColors}
        style={styles.visualOverlay}
      />
      {children}
    </View>
  );
}

function OrbitPreview() {
  const theme = useKesslerTheme();
  const { isPhone } = useBreakpoint();

  return (
    <View
      style={[
        styles.orbitPreview,
        {
          backgroundColor: theme.colors.background.surface,
          borderColor: theme.colors.border.subtle,
        },
        isPhone && styles.orbitPreviewPhone,
      ]}>
      <View
        style={[
          styles.orbitGlow,
          {
            backgroundColor: theme.isLightMode
              ? 'rgba(186, 230, 253, 0.22)'
              : 'rgba(56, 232, 255, 0.12)',
          },
        ]}
      />
      <View style={[styles.orbitRing, styles.orbitRingOuter]} />
      <View style={[styles.orbitRing, styles.orbitRingMiddle]} />
      <View style={[styles.orbitRing, styles.orbitRingInner]} />
      {/* <Image
        source={visualAssets.backgrounds.satelliteOverEarth}
        contentFit="cover"
        style={styles.orbitEarth}
      /> */}
      <Image
        source={visualAssets.objects.damagedSatellite}
        contentFit="contain"
        style={styles.orbitObject}
      />
      <View style={[styles.orbitDot, { borderColor: theme.colors.background.app }, styles.orbitDotDanger]} />
      <View style={[styles.orbitDot, { borderColor: theme.colors.background.app }, styles.orbitDotCyan]} />
      <View style={[styles.orbitDot, { borderColor: theme.colors.background.app }, styles.orbitDotTeal]} />
    </View>
  );
}

export function HomeScreen() {
  const { height } = useWindowDimensions();
  const { isDesktop, isPhone } = useBreakpoint();
  const theme = useKesslerTheme();
  const heroMinHeight = isPhone
    ? Math.min(Math.max(480, height * 0.64), 560)
    : Math.min(Math.max(650, height * 0.76), 760);
  const pageBackgroundStyle = { backgroundColor: theme.colors.background.app };
  const heroOverlayColors = [
    'rgba(2, 6, 23, 0.98)',
    'rgba(2, 6, 23, 0)',
    'rgba(2, 6, 23, 0.92)',
  ] as const;
  const finalOverlayColors = [
    'rgba(2, 6, 23, 0.86)',
    'rgba(2, 6, 23, 0.58)',
    'rgba(2, 6, 23, 0.92)',
  ] as const;

  return (
    <View style={[styles.root, pageBackgroundStyle]}>
      <ScrollView
        style={[styles.scroll, pageBackgroundStyle]}
        contentContainerStyle={[styles.scrollContent, pageBackgroundStyle, { paddingBottom: spacing[16] }]}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, pageBackgroundStyle, { minHeight: heroMinHeight }]}>
          <Image
            source={visualAssets.backgrounds.heroOrbit}
            contentFit="cover"
            style={styles.heroImage}
          />
          <LinearGradient
            colors={heroOverlayColors}
            start={{ x: 0, y: 0.35 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroOverlay}
          />

          <SafeAreaView style={styles.heroSafe}>
            <View style={[styles.inner, styles.heroInner, isDesktop && styles.heroInnerDesktop]}>
              <View style={styles.heroCopy}>
                <Text style={[styles.heroTitle, isPhone && styles.heroTitlePhone]}>
                  A órbita da Terra está ficando cheia.
                </Text>
                <Text style={styles.heroSubtitle}>
                  Visualize objetos abandonados no espaço, entenda riscos e imagine como parte desse
                  material pode voltar a ter valor.
                </Text>
                <View style={[styles.actions, isPhone && styles.actionsPhone]}>
                  <Button onPress={() => router.push('/orbit')}>
                    Explorar mapa orbital
                  </Button>
                  <Button
                    variant="secondary"
                    onPress={() => router.push('/prevention')}>
                    Entender o problema
                  </Button>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>

        <View style={[styles.sectionBand, pageBackgroundStyle, isPhone && styles.sectionBandPhone]}>
          <View style={[styles.inner, styles.problemGrid, isDesktop && styles.twoColumnGrid]}>
            <View style={styles.sectionCopy}>
              <SectionTitle
                eyebrow="O problema acima de nós"
                title="O lixo espacial não aparece no céu como fumaça, mas ele continua lá."
                subtitle="Satélites antigos, pedaços de foguetes e fragmentos pequenos seguem circulando a Terra por anos. Alguns são invisíveis para nós, mas perigosos para missões, comunicação, GPS, internet e monitoramento climático."
              />
              <View style={styles.cardGrid}>
                {problemCards.map((card) => (
                  <View
                    key={card.title}
                    style={[
                      styles.storyCard,
                      {
                        backgroundColor: theme.colors.background.surface,
                        borderColor: theme.colors.border.subtle,
                      },
                    ]}>
                    <Text style={[styles.storyCardTitle, { color: theme.colors.text.primary }]}>
                      {card.title}
                    </Text>
                    <Text style={[styles.storyCardBody, { color: theme.colors.text.secondary }]}>
                      {card.body}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <VisualPanel source={visualAssets.backgrounds.skyFamily} />
          </View>
        </View>

        <View
          style={[
            styles.sectionBand,
            { backgroundColor: theme.colors.background.surfaceGlow },
            isPhone && styles.sectionBandPhone,
          ]}>
          <View style={[styles.inner, styles.orbitSection, isDesktop && styles.twoColumnGrid]}>
            <OrbitPreview />
            <View style={styles.sectionCopy}>
              <SectionTitle
                eyebrow="Veja o que está em órbita"
                title="Cada ponto tem uma história: lançamento, missão encerrada, peça esquecida ou risco."
                subtitle="Explore objetos monitorados e entenda o que cada um representa: satélite ativo, satélite morto, corpo de foguete, fragmento ou candidato a reaproveitamento."
              />
              <View style={styles.inlineMetrics}>
                <HeroMetric label="inativos ou fragmentos" value={inactiveObjects.length.toString()} />
                <HeroMetric label="missões simuláveis" value={mockMissions.length.toString()} />
              </View>
              <Button onPress={() => router.push('/orbit')}>Abrir mapa orbital</Button>
            </View>
          </View>
        </View>

        <View style={[styles.sectionBand, pageBackgroundStyle, isPhone && styles.sectionBandPhone]}>
          <View style={styles.inner}>
            <SectionTitle
              align="center"
              eyebrow="Do dado à decisão"
              title="O Kessler organiza sinais para mostrar o que merece atenção primeiro."
              subtitle="Menos jargão, mais clareza: risco, prioridade e missão viram uma sequência de decisão que qualquer pessoa consegue acompanhar."
            />
            <View style={[styles.decisionGrid, isDesktop && styles.decisionGridDesktop]}>
              {decisionCards.map((card) => (
                <View
                  key={card.label}
                  style={[
                    styles.decisionCard,
                    {
                      backgroundColor: theme.colors.background.surface,
                      borderColor: theme.colors.border.subtle,
                    },
                  ]}>
                  <Text style={[styles.decisionLabel, { color: theme.colors.accent.cyan }]}>
                    {card.label}
                  </Text>
                  <Text style={[styles.decisionBody, { color: theme.colors.text.secondary }]}>
                    {card.body}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View
          style={[
            styles.sectionBand,
            {
              backgroundColor: theme.isLightMode
                ? 'rgba(153, 246, 228, 0.16)'
                : 'rgba(45, 212, 191, 0.05)',
            },
            isPhone && styles.sectionBandPhone,
          ]}>
          <View style={[styles.inner, styles.reuseGrid, isDesktop && styles.twoColumnGrid]}>
            <VisualPanel source={visualAssets.backgrounds.reuseLab}>
              <Image
                source={visualAssets.objects.recyclingModule}
                contentFit="contain"
                style={styles.reuseObject}
              />
            </VisualPanel>

            <View style={styles.sectionCopy}>
              <SectionTitle
                eyebrow="Nem todo lixo é só lixo"
                title="Alguns objetos abandonados podem carregar materiais úteis."
                subtitle="O Kessler OS imagina como transformar parte desse abandono em recurso para futuras missões: inspeção, separação, material útil e nova estrutura orbital."
              />
              <View style={styles.reuseCards}>
                {reuseCards.map((item) => (
                  <View
                    key={item}
                    style={[
                      styles.reuseChip,
                      {
                        backgroundColor: theme.isLightMode
                          ? 'rgba(153, 246, 228, 0.18)'
                          : 'rgba(45, 212, 191, 0.10)',
                        borderColor: theme.isLightMode
                          ? 'rgba(153, 246, 228, 0.42)'
                          : 'rgba(45, 212, 191, 0.26)',
                      },
                    ]}>
                    <Text style={[styles.reuseChipText, { color: theme.colors.text.primary }]}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
              <Button variant="secondary" onPress={() => router.push('/circular')}>
                Explorar reaproveitamento
              </Button>
            </View>
          </View>
        </View>

        <View style={[styles.sectionBand, pageBackgroundStyle, isPhone && styles.sectionBandPhone]}>
          <View style={styles.inner}>
            <SectionTitle
              align="center"
              eyebrow="Para quem serve"
              title="Criado para transformar um tema complexo em algo explorável, visual e apresentável."
            />
            <View style={styles.audienceGrid}>
              {audienceCards.map((audience) => (
                <View
                  key={audience}
                  style={[
                    styles.audienceChip,
                    {
                      backgroundColor: theme.colors.background.surface,
                      borderColor: theme.colors.border.subtle,
                    },
                  ]}>
                  <Text style={[styles.audienceText, { color: theme.colors.text.secondary }]}>
                    {audience}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={[styles.finalCta, pageBackgroundStyle, isPhone && styles.finalCtaPhone]}>
          <Image source={visualAssets.backgrounds.cityImpact} contentFit="cover" style={styles.heroImage} />
          <LinearGradient
            colors={finalOverlayColors}
            style={styles.heroOverlay}
          />
          <View style={[styles.inner, styles.finalInner]}>
            <SectionTitle
              align="center"
              eyebrow="O futuro da órbita"
              title="O futuro da órbita depende do que fazemos agora."
              subtitle="Comece explorando objetos reais e simulados, depois avance para risco, missão, prevenção e reaproveitamento."
            />
            <View style={[styles.finalActions, isPhone && styles.finalActionsPhone]}>
              <Button onPress={() => router.push('/orbit')}>
                Começar exploração
              </Button>
              <Button
                variant="secondary"
                onPress={() => router.push('/impact')}>
                Ver impacto do projeto
              </Button>
            </View>
          </View>
        </View>
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
  scrollContent: {
    backgroundColor: colors.background.app,
  },
  inner: {
    alignSelf: 'center',
    maxWidth: layout.maxContentWidth,
    paddingHorizontal: spacing[5],
    width: '100%',
  },
  hero: {
    backgroundColor: colors.background.app,
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
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
  heroSafe: {
    flex: 1,
    justifyContent: 'center',
  },
  heroInner: {
    gap: spacing[8],
    justifyContent: 'center',
    paddingBottom: spacing[10],
    paddingTop: spacing[8],
  },
  heroInnerDesktop: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroCopy: {
    gap: spacing[5],
    maxWidth: 690,
  },
  heroTitle: {
    ...typography.display,
    color: colors.text.primary,
    letterSpacing: 0,
  },
  heroTitlePhone: {
    fontSize: 34,
    lineHeight: 40,
  },
  heroSubtitle: {
    ...typography.body,
    color: colors.text.secondary,
    maxWidth: 620,
  },
  actions: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  actionsPhone: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  heroMetric: {
    backgroundColor: 'rgba(7, 17, 30, 0.76)',
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    flexBasis: 132,
    flexGrow: 1,
    gap: spacing[1],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  heroMetricValue: {
    ...typography.h2,
    color: colors.text.primary,
  },
  heroMetricLabel: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  sectionBand: {
    paddingVertical: spacing[12],
    width: '100%',
  },
  sectionBandPhone: {
    paddingVertical: spacing[8],
  },
  sectionBandRaised: {
    backgroundColor: colors.background.surfaceGlow,
  },
  reuseBand: {
    backgroundColor: 'rgba(45, 212, 191, 0.05)',
  },
  problemGrid: {
    gap: spacing[8],
  },
  twoColumnGrid: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  sectionCopy: {
    flex: 1,
    gap: spacing[5],
    minWidth: 0,
  },
  sectionTitle: {
    gap: spacing[3],
    maxWidth: 760,
  },
  sectionTitleCenter: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  eyebrow: {
    ...typography.caption,
    color: colors.accent.cyan,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  sectionHeading: {
    ...typography.h1,
    color: colors.text.primary,
    letterSpacing: 0,
  },
  sectionSubtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  textCenter: {
    textAlign: 'center',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  storyCard: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexBasis: 148,
    flexGrow: 1,
    gap: spacing[2],
    padding: spacing[4],
  },
  storyCardTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  storyCardBody: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  visualPanel: {
    aspectRatio: 1.18,
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.xl,
    borderWidth: 1,
    flex: 1,
    minHeight: 330,
    overflow: 'hidden',
    ...shadows.card,
  },
  visualPanelPhone: {
    aspectRatio: 1.45,
    minHeight: 220,
  },
  visualImage: {
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
  visualOverlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  orbitSection: {
    gap: spacing[8],
  },
  orbitPreview: {
    alignItems: 'center',
    aspectRatio: 1.05,
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.xl,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    minHeight: 360,
    overflow: 'hidden',
    ...shadows.glowBlue,
  },
  orbitPreviewPhone: {
    aspectRatio: 1.28,
    minHeight: 240,
  },
  orbitGlow: {
    backgroundColor: 'rgba(56, 232, 255, 0.12)',
    borderRadius: radius.pill,
    height: '74%',
    position: 'absolute',
    width: '74%',
  },
  orbitRing: {
    borderRadius: radius.pill,
    borderWidth: 1,
    position: 'absolute',
  },
  orbitRingOuter: {
    borderColor: 'rgba(56, 232, 255, 0.30)',
    height: '74%',
    transform: [{ rotate: '-18deg' }, { scaleX: 1.28 }],
    width: '54%',
  },
  orbitRingMiddle: {
    borderColor: 'rgba(96, 165, 250, 0.30)',
    height: '58%',
    transform: [{ rotate: '28deg' }, { scaleX: 1.28 }],
    width: '42%',
  },
  orbitRingInner: {
    borderColor: 'rgba(45, 212, 191, 0.28)',
    height: '42%',
    transform: [{ rotate: '52deg' }, { scaleX: 1.3 }],
    width: '30%',
  },
  orbitEarth: {
    borderRadius: radius.pill,
    height: '30%',
    opacity: 0.88,
    width: '42%',
  },
  orbitObject: {
    height: '43%',
    position: 'absolute',
    right: '-3%',
    top: '8%',
    transform: [{ rotate: '-12deg' }],
    width: '43%',
  },
  orbitDot: {
    borderColor: colors.background.app,
    borderRadius: radius.pill,
    borderWidth: 2,
    height: 14,
    position: 'absolute',
    width: 14,
  },
  orbitDotDanger: {
    backgroundColor: colors.semantic.danger,
    left: '31%',
    top: '26%',
  },
  orbitDotCyan: {
    backgroundColor: colors.accent.cyan,
    bottom: '30%',
    right: '33%',
  },
  orbitDotTeal: {
    backgroundColor: colors.accent.teal,
    bottom: '22%',
    left: '24%',
  },
  inlineMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  decisionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],
    marginTop: spacing[6],
  },
  decisionGridDesktop: {
    flexDirection: 'row',
  },
  decisionCard: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexBasis: 148,
    flexGrow: 1,
    gap: spacing[3],
    minHeight: 132,
    padding: spacing[4],
  },
  decisionLabel: {
    ...typography.h2,
    color: colors.accent.cyan,
  },
  decisionBody: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  reuseGrid: {
    gap: spacing[8],
  },
  reuseObject: {
    bottom: '-8%',
    height: '54%',
    position: 'absolute',
    right: '-7%',
    transform: [{ rotate: '8deg' }],
    width: '54%',
  },
  reuseCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  reuseChip: {
    backgroundColor: 'rgba(45, 212, 191, 0.10)',
    borderColor: 'rgba(45, 212, 191, 0.26)',
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  reuseChipText: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  audienceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'center',
    marginTop: spacing[6],
  },
  audienceChip: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
  },
  audienceText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '700',
  },
  finalCta: {
    justifyContent: 'center',
    minHeight: 520,
    overflow: 'hidden',
    width: '100%',
  },
  finalCtaPhone: {
    minHeight: 420,
  },
  finalInner: {
    alignItems: 'center',
    gap: spacing[6],
    paddingVertical: spacing[12],
  },
  finalActions: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'center',
  },
  finalActionsPhone: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
});
