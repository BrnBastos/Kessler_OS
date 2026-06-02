export type NavigationItem = {
  description: string;
  href: '/' | '/orbit' | '/priority' | '/missions' | '/circular' | '/prevention' | '/impact';
  label: string;
};

export const navigationItems: NavigationItem[] = [
  {
    description: 'Kessler overview',
    href: '/',
    label: 'Home',
  },
  {
    description: 'Explore orbital objects',
    href: '/orbit',
    label: 'Orbit',
  },
  {
    description: 'Rank attention queues',
    href: '/priority',
    label: 'Priority',
  },
  {
    description: 'Simulate mission decisions',
    href: '/missions',
    label: 'Missions',
  },
  {
    description: 'Evaluate reuse potential',
    href: '/circular',
    label: 'Circular',
  },
  {
    description: 'Learn prevention rules',
    href: '/prevention',
    label: 'Prevention',
  },
  {
    description: 'Present project impact',
    href: '/impact',
    label: 'Impact',
  },
];
