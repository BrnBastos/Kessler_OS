import { useWindowDimensions } from 'react-native';

import { breakpoints } from '@/theme';

export function useBreakpoint() {
  const { width } = useWindowDimensions();
  const isWide = width >= breakpoints.wide;
  const isDesktop = width >= breakpoints.desktop;
  const isTablet = width >= breakpoints.tablet && width < breakpoints.desktop;
  const isPhone = width < breakpoints.tablet;

  return {
    breakpoint: isWide ? 'wide' : isDesktop ? 'desktop' : isTablet ? 'tablet' : 'phone',
    isDesktop,
    isPhone,
    isTablet,
    isWide,
    width,
  };
}
