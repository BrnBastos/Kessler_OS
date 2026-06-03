import {
  DataConfidence,
  MissionType,
  OrbitalObjectStatus,
  OrbitalObjectType,
  ReuseMaterialCategory,
  ReusePath,
  ReusePotential,
} from '@/domain/models';

export const ptBR = {
  common: {
    all: 'Todos',
    high: 'Alto',
    low: 'Baixo',
    medium: 'Médio',
    noTargetSelected: 'Nenhum alvo selecionado',
    notAvailable: 'Desconhecido',
    reset: 'Limpar',
  },
  navigation: [
    {
      description: 'Visão geral do Kessler OS',
      href: '/',
      label: 'Início',
    },
    {
      description: 'Explore objetos em órbita',
      href: '/orbit',
      label: 'Mapa Orbital',
    },
    {
      description: 'Priorize objetos que merecem atenção',
      href: '/priority',
      label: 'Prioridades',
    },
    {
      description: 'Simule decisões de missão',
      href: '/missions',
      label: 'Missões',
    },
    {
      description: 'Avalie potencial de reaproveitamento',
      href: '/circular',
      label: 'Reaproveitamento',
    },
    {
      description: 'Entenda práticas de prevenção',
      href: '/prevention',
      label: 'Prevenção',
    },
    {
      description: 'Mostre o impacto do projeto',
      href: '/impact',
      label: 'Impacto',
    },
  ],
} as const;

export function formatDataConfidenceLabel(confidence: DataConfidence) {
  const labels: Record<DataConfidence, string> = {
    confirmed: 'Dados públicos confirmados',
    estimated: 'Estimativa do sistema',
    simulated: 'Simulado',
    unknown: 'Desconhecido',
  };

  return labels[confidence];
}

export function formatMissionTypeLabel(type: MissionType) {
  const labels: Record<MissionType, string> = {
    avoid: 'Evitar',
    capture: 'Capturar',
    deorbit: 'Retirar de órbita',
    inspect: 'Inspecionar',
    monitor: 'Monitorar',
    move_to_safer_orbit: 'Mover para órbita segura',
    recycle: 'Reciclar',
  };

  return labels[type];
}

export function formatObjectStatusLabel(status: OrbitalObjectStatus) {
  const labels: Record<OrbitalObjectStatus, string> = {
    active: 'Ativo',
    fragment: 'Fragmento',
    inactive: 'Inativo',
    unknown: 'Desconhecido',
  };

  return labels[status];
}

export function formatObjectTypeLabel(type: OrbitalObjectType) {
  const labels: Record<OrbitalObjectType, string> = {
    debris: 'Fragmento',
    rocket_body: 'Corpo de foguete',
    satellite: 'Satélite',
    unknown: 'Não identificado',
  };

  return labels[type];
}

export function formatObjectTypePluralLabel(type: OrbitalObjectType | 'all') {
  const labels: Record<OrbitalObjectType | 'all', string> = {
    all: ptBR.common.all,
    debris: 'Fragmentos',
    rocket_body: 'Corpos de foguete',
    satellite: 'Satélites',
    unknown: 'Não identificados',
  };

  return labels[type];
}

export function formatReuseMaterialLabel(material: ReuseMaterialCategory) {
  const labels: Record<ReuseMaterialCategory, string> = {
    aluminum: 'Alumínio',
    composite: 'Composto',
    electronics: 'Eletrônicos',
    titanium: 'Titânio',
    unknown: 'Desconhecido',
  };

  return labels[material];
}

export function formatReusePathLabel(path: ReusePath) {
  const labels: Record<ReusePath, string> = {
    deorbit: 'Saída de órbita',
    recycle: 'Reciclagem',
    refuel: 'Reabastecimento',
    repair: 'Reparo',
  };

  return labels[path];
}

export function formatReusePotentialLabel(potential: ReusePotential) {
  const labels: Record<ReusePotential, string> = {
    high: ptBR.common.high,
    low: ptBR.common.low,
    medium: ptBR.common.medium,
  };

  return labels[potential];
}
