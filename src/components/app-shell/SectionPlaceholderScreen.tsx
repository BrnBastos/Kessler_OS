import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge, Button, Card, SectionHeader } from '@/components/ui';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, layout, spacing, typography } from '@/theme';

type PlaceholderCard = {
  body: string;
  title: string;
};

type SectionPlaceholderScreenProps = {
  badge: string;
  cards: PlaceholderCard[];
  description: string;
  eyebrow: string;
  primaryActionHref?: '/' | '/orbit' | '/priority' | '/missions' | '/circular' | '/prevention';
  primaryActionLabel?: string;
  title: string;
};

export function SectionPlaceholderScreen({
  badge,
  cards,
  description,
  eyebrow,
  primaryActionHref = '/',
  primaryActionLabel = 'Voltar ao início',
  title,
}: SectionPlaceholderScreenProps) {
  const { isDesktop } = useBreakpoint();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}>
        <SafeAreaView>
          <View style={styles.stack}>
            <View style={styles.hero}>
              <Badge label={badge} tone="simulated" />
              <SectionHeader eyebrow={eyebrow} title={title} description={description} />
              <Button onPress={() => router.push(primaryActionHref)}>{primaryActionLabel}</Button>
            </View>

            <View style={[styles.cardGrid, isDesktop && styles.cardGridDesktop]}>
              {cards.map((card) => (
                <Card key={card.title} style={styles.card}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardBody}>{card.body}</Text>
                </Card>
              ))}
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
  hero: {
    gap: spacing[5],
  },
  cardGrid: {
    gap: spacing[4],
  },
  cardGridDesktop: {
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    gap: spacing[3],
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  cardBody: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
});
