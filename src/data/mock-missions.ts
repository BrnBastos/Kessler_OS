import { MissionScenario } from '@/domain/models';

export const mockMissions: MissionScenario[] = [
  {
    dataConfidence: 'simulated',
    estimatedDeltaVMps: 120,
    estimatedDurationDays: 18,
    id: 'mission-inspect-envisat',
    name: 'Passagem de inspeção do ENVISAT',
    objective: 'Inspecionar atitude, rotação e possíveis pontos de captura antes de qualquer plano de remoção.',
    riskLevel: 'medium',
    targetObjectId: 'obj-envisat',
    type: 'inspect',
  },
  {
    dataConfidence: 'simulated',
    estimatedDeltaVMps: 260,
    estimatedDurationDays: 42,
    id: 'mission-deorbit-cosmos-frag',
    name: 'Teste de retirada de fragmento',
    objective: 'Modelar uma missão de remoção de objeto pequeno para um fragmento LEO de alta atenção.',
    riskLevel: 'high',
    targetObjectId: 'obj-cosmos-2251-frag',
    type: 'deorbit',
  },
  {
    dataConfidence: 'simulated',
    estimatedDeltaVMps: 80,
    estimatedDurationDays: 9,
    id: 'mission-avoidance-hubble',
    name: 'Checagem de desvio operacional',
    objective: 'Comparar uma decisão de desvio de baixo impacto com a manutenção das operações da missão.',
    riskLevel: 'low',
    targetObjectId: 'obj-hubble',
    type: 'avoid',
  },
];
