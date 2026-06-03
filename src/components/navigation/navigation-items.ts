import { ptBR } from '@/content/pt-br';

export type NavigationItem = {
  description: string;
  href: '/' | '/orbit' | '/priority' | '/missions' | '/circular' | '/prevention' | '/impact';
  label: string;
};

export const navigationItems: readonly NavigationItem[] = ptBR.navigation;
