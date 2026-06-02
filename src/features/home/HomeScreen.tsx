import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useBreakpoint } from '@/hooks/use-breakpoint';
import { colors, layout, spacing } from '@/theme';

import { FeatureCards } from './components/FeatureCards';
import { HeroSection } from './components/HeroSection';
import { HomeMetrics } from './components/HomeMetrics';
import { HomePreviewPanels } from './components/HomePreviewPanels';

export function HomeScreen() {
  const { isDesktop } = useBreakpoint();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          isDesktop && styles.contentDesktop,
          { paddingBottom: spacing[10] },
        ]}>
        <SafeAreaView>
          <View style={styles.stack}>
            <HeroSection />
            <FeatureCards />
            <HomeMetrics />
            <HomePreviewPanels />
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
    paddingTop: spacing[8],
    width: '100%',
  },
  contentDesktop: {
    paddingHorizontal: spacing[8],
    paddingTop: spacing[10],
  },
  stack: {
    gap: spacing[8],
  },
});
