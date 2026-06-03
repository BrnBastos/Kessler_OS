import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { BottomTabs } from '@/components/navigation/BottomTabs';
import { TopNavigation } from '@/components/navigation/TopNavigation';
import { usePlatformLayout } from '@/hooks/use-platform-layout';
import { colors, useKesslerTheme } from '@/theme';

export function AppShell() {
  const { showBottomTabs, showTopNavigation } = usePlatformLayout();
  const theme = useKesslerTheme();

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background.app }]}>
      {showTopNavigation && <TopNavigation />}
      <View style={styles.content}>
        <Slot />
      </View>
      {showBottomTabs && <BottomTabs />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.background.app,
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
