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

import { Badge, Button } from '@/components/ui';
import { visualAssets } from '@/config/visualAssets';
import { mockMissions, mockOrbitalObjects } from '@/data';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, layout, radius, shadows, spacing, typography } from '@/theme';

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
  return (
    <View style={styles.heroMetric}>
      <Text style={styles.heroMetricValue}>{value}</Text>
      <Text style={styles.heroMetricLabel}>{label}</Text>
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
  return (
    <View style={[styles.sectionTitle, align === 'center' && styles.sectionTitleCenter]}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={[styles.sectionHeading, align === 'center' && styles.textCenter]}>{title}</Text>
      {subtitle && (
        <Text style={[styles.sectionSubtitle, align === 'center' && styles.textCenter]}>
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
  return (
    <View style={styles.visualPanel}>
      <Image source={source} contentFit="cover" style={styles.visualImage} />
      <LinearGradient
        colors={['rgba(2, 6, 23, 0.10)', 'rgba(2, 6, 23, 0.78)']}
        style={styles.visualOverlay}
      />
      {children}
    </View>
  );
}

function OrbitPreview() {
  return (
    <View style={styles.orbitPreview}>
      <View style={styles.orbitGlow} />
      <View style={[styles.orbitRing, styles.orbitRingOuter]} />
      <View style={[styles.orbitRing, styles.orbitRingMiddle]} />
      <View style={[styles.orbitRing, styles.orbitRingInner]} />
      <Image
        source={visualAssets.backgrounds.satelliteOverEarth}
        contentFit="cover"
        style={styles.orbitEarth}
      />
      <Image
        source={visualAssets.objects.damagedSatellite}
        contentFit="contain"
        style={styles.orbitObject}
      />
      <View style={[styles.orbitDot, styles.orbitDotDanger]} />
      <View style={[styles.orbitDot, styles.orbitDotCyan]} />
      <View style={[styles.orbitDot, styles.orbitDotTeal]} />
      <View style={styles.orbitCaption}>
        <Text style={styles.orbitCaptionTitle}>Mapa orbital</Text>
        <Text style={styles.orbitCaptionText}>
          Cada ponto representa um objeto, uma origem e uma decisão possível.
        </Text>
      </View>
    </View>
  );
}

export function HomeScreen() {
  const { height } = useWindowDimensions();
  const { isDesktop, isPhone } = useBreakpoint();
  const heroMinHeight = Math.min(Math.max(650, height * (isPhone ? 0.82 : 0.76)), isPhone ? 700 : 760);

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: spacing[16] }]}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { minHeight: heroMinHeight }]}>
          <Image
            source={visualAssets.backgrounds.heroOrbit}
            contentFit="cover"
            style={styles.heroImage}
          />
          <LinearGradient
            colors={['rgba(2, 6, 23, 0.98)', 'rgba(2, 6, 23, 0)', 'rgba(2, 6, 23, 0.92)']}
            start={{ x: 0, y: 0.35 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroOverlay}
          />

          <SafeAreaView style={styles.heroSafe}>
            <View style={[styles.inner, styles.heroInner, isDesktop && styles.heroInnerDesktop]}>
              <View style={styles.heroCopy}>
                <Badge label="Kessler OS" tone="simulated" />
                <Text style={[styles.heroTitle, isPhone && styles.heroTitlePhone]}>
                  A órbita da Terra está ficando cheia.
                </Text>
                <Text style={styles.heroSubtitle}>
                  Visualize objetos abandonados no espaço, entenda riscos e imagine como parte desse
                  material pode voltar a ter valor.
                </Text>
                <View style={[styles.actions, isPhone && styles.actionsPhone]}>
                  <Button fullWidth={isPhone} onPress={() => router.push('/orbit')}>
                    Explorar mapa orbital
                  </Button>
                  <Button
                    fullWidth={isPhone}
                    variant="secondary"
                    onPress={() => router.push('/prevention')}>
                    Entender o problema
                  </Button>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>

        <View style={styles.sectionBand}>
          <View style={[styles.inner, styles.problemGrid, isDesktop && styles.twoColumnGrid]}>
            <View style={styles.sectionCopy}>
              <SectionTitle
                eyebrow="O problema acima de nós"
                title="O lixo espacial não aparece no céu como fumaça, mas ele continua lá."
                subtitle="Satélites antigos, pedaços de foguetes e fragmentos pequenos seguem circulando a Terra por anos. Alguns são invisíveis para nós, mas perigosos para missões, comunicação, GPS, internet e monitoramento climático."
              />
              <View style={styles.cardGrid}>
                {problemCards.map((card) => (
                  <View key={card.title} style={styles.storyCard}>
                    <Text style={styles.storyCardTitle}>{card.title}</Text>
                    <Text style={styles.storyCardBody}>{card.body}</Text>
                  </View>
                ))}
              </View>
            </View>

            <VisualPanel source={visualAssets.backgrounds.skyFamily}>
              <Text style={styles.visualKicker}>O espaço também é infraestrutura da vida diária.</Text>
            </VisualPanel>
          </View>
        </View>

        <View style={[styles.sectionBand, styles.sectionBandRaised]}>
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

        <View style={styles.sectionBand}>
          <View style={styles.inner}>
            <SectionTitle
              align="center"
              eyebrow="Do dado à decisão"
              title="O Kessler organiza sinais para mostrar o que merece atenção primeiro."
              subtitle="Menos jargão, mais clareza: risco, prioridade e missão viram uma sequência de decisão que qualquer pessoa consegue acompanhar."
            />
            <View style={[styles.decisionGrid, isDesktop && styles.decisionGridDesktop]}>
              {decisionCards.map((card) => (
                <View key={card.label} style={styles.decisionCard}>
                  <Text style={styles.decisionLabel}>{card.label}</Text>
                  <Text style={styles.decisionBody}>{card.body}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={[styles.sectionBand, styles.reuseBand]}>
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
                  <View key={item} style={styles.reuseChip}>
                    <Text style={styles.reuseChipText}>{item}</Text>
                  </View>
                ))}
              </View>
              <Button variant="secondary" onPress={() => router.push('/circular')}>
                Explorar reaproveitamento
              </Button>
            </View>
          </View>
        </View>

        <View style={styles.sectionBand}>
          <View style={styles.inner}>
            <SectionTitle
              align="center"
              eyebrow="Para quem serve"
              title="Criado para transformar um tema complexo em algo explorável, visual e apresentável."
            />
            <View style={styles.audienceGrid}>
              {audienceCards.map((audience) => (
                <View key={audience} style={styles.audienceChip}>
                  <Text style={styles.audienceText}>{audience}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.finalCta}>
          <Image source={visualAssets.backgrounds.cityImpact} contentFit="cover" style={styles.heroImage} />
          <LinearGradient
            colors={['rgba(2, 6, 23, 0.86)', 'rgba(2, 6, 23, 0.58)', 'rgba(2, 6, 23, 0.92)']}
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
              <Button fullWidth={isPhone} onPress={() => router.push('/orbit')}>
                Começar exploração
              </Button>
              <Button
                fullWidth={isPhone}
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
    fontSize: 40,
    lineHeight: 46,
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
    alignItems: 'stretch',
    flexDirection: 'column',
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
    gap: spacing[3],
  },
  storyCard: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.lg,
    borderWidth: 1,
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
  visualKicker: {
    ...typography.bodySmall,
    backgroundColor: 'rgba(2, 6, 23, 0.64)',
    borderColor: colors.border.subtle,
    borderRadius: radius.pill,
    borderWidth: 1,
    bottom: spacing[4],
    color: colors.text.primary,
    fontWeight: '700',
    left: spacing[4],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    position: 'absolute',
    right: spacing[4],
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
    opacity: 0.78,
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
  orbitCaption: {
    backgroundColor: 'rgba(2, 6, 23, 0.70)',
    borderColor: colors.border.subtle,
    borderRadius: radius.lg,
    borderWidth: 1,
    bottom: spacing[4],
    gap: spacing[1],
    left: spacing[4],
    padding: spacing[4],
    position: 'absolute',
    right: spacing[4],
  },
  orbitCaptionTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  orbitCaptionText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  inlineMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  decisionGrid: {
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
    flex: 1,
    gap: spacing[3],
    minHeight: 150,
    padding: spacing[5],
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
    alignSelf: 'stretch',
    flexDirection: 'column',
  },
});
