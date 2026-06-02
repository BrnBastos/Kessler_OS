import { Platform } from 'react-native';

import { useBreakpoint } from './use-breakpoint';

export function usePlatformLayout() {
  const breakpoint = useBreakpoint();
  const showTopNavigation = Platform.OS === 'web' && breakpoint.isDesktop;

  return {
    ...breakpoint,
    navigationPlacement: showTopNavigation ? 'top' : 'bottom',
    showBottomTabs: !showTopNavigation,
    showTopNavigation,
  };
}
