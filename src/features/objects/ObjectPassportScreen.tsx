import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge, Button, Card, SectionHeader } from '@/components/ui';
import { getScoredOrbitalObjectById } from '@/domain/repositories';
import { DecisionReportPanel } from '@/features/reports/DecisionReportPanel';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, layout, spacing, typography } from '@/theme';

import { DataConfidenceNote } from './components/DataConfidenceNote';
import { ObjectScorePanel } from './components/ObjectScorePanel';
import { ObjectSummaryCard } from './components/ObjectSummaryCard';
import { ObjectTechnicalDetails } from './components/ObjectTechnicalDetails';

type ObjectPassportScreenProps = {
  objectId: string;
};

export function ObjectPassportScreen({ objectId }: ObjectPassportScreenProps) {
  const { isDesktop } = useBreakpoint();
  const object = getScoredOrbitalObjectById(objectId);

  if (!object) {
    return (
      <View style={styles.root}>
        <ScrollView
          style={styles.scroll}
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
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}>
        <SafeAreaView>
          <View style={styles.stack}>
            <View style={styles.hero}>
              <Badge label="Ficha do objeto" tone="simulated" />
              <SectionHeader
                eyebrow="Sinais conhecidos, estimados e simulados"
                title="Entenda um objeto antes de decidir o próximo passo."
                description="A ficha reúne metadados técnicos, confiança dos dados, pontuações determinísticas e a próxima ação recomendada para um objeto orbital."
                action={
                  isDesktop ? (
                    <View style={styles.heroActions}>
                      <Button variant="secondary" onPress={() => router.push('/orbit')}>
                        Voltar ao mapa
                      </Button>
                      <Button
                        onPress={() =>
                          router.push({
                            pathname: '/missions',
                            params: { objectId: object.id },
                          })
                        }>
                        Simular missão
                      </Button>
                    </View>
                  ) : undefined
                }
              />
              {!isDesktop && (
                <View style={styles.heroActions}>
                  <Button variant="secondary" onPress={() => router.push('/orbit')}>
                    Voltar ao mapa
                  </Button>
                  <Button
                    onPress={() =>
                      router.push({
                        pathname: '/missions',
                        params: { objectId: object.id },
                      })
                    }>
                    Simular missão
                  </Button>
                </View>
              )}
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
  hero: {
    gap: spacing[5],
  },
  heroActions: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
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
