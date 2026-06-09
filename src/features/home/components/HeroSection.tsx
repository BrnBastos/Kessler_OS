import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Badge, Button } from '@/components/ui';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, spacing, typography } from '@/theme';

import { EarthHeroVisual } from './EarthHeroVisual';

export function HeroSection() {
  const { isDesktop, isPhone } = useBreakpoint();

  return (
    <View style={[styles.hero, isDesktop && styles.heroDesktop]}>
      <View style={styles.copy}>
        <Badge label="Estimativa do sistema" tone="simulated" />
        <Text style={[styles.title, isPhone && styles.titlePhone]}>
          A órbita da Terra está ficando cheia.
        </Text>
        <Text style={styles.subtitle}>
          O Kessler OS ajuda a visualizar objetos abandonados no espaço, entender riscos e imaginar
          como parte desse material pode ser reaproveitada no futuro.
        </Text>
        <View style={styles.actions}>
          <Button onPress={() => router.push('/orbit')}>Explorar mapa orbital</Button>
          <Button variant="secondary" onPress={() => router.push('/priority')}>
            Ver prioridades
          </Button>
        </View>
      </View>

      <EarthHeroVisual />
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: spacing[8],
  },
  heroDesktop: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  copy: {
    flex: 1,
    gap: spacing[5],
  },
  title: {
    ...typography.display,
    color: colors.text.primary,
    letterSpacing: 0,
    maxWidth: 680,
  },
  titlePhone: {
    fontSize: 36,
    lineHeight: 44,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    maxWidth: 560,
  },
  actions: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
});
