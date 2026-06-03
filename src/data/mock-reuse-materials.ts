import { ReuseMaterialEstimate } from '@/domain/models';

export const mockReuseMaterials: ReuseMaterialEstimate[] = [
  {
    dataConfidence: 'estimated',
    estimatedSharePct: 42,
    id: 'reuse-satellite-aluminum',
    material: 'aluminum',
    notes: 'Categoria comum de estrutura espacial para estimativas iniciais de economia circular.',
    objectType: 'satellite',
    potential: 'high',
    preferredPath: 'recycle',
  },
  {
    dataConfidence: 'estimated',
    estimatedSharePct: 18,
    id: 'reuse-satellite-electronics',
    material: 'electronics',
    notes: 'Sistemas sensíveis podem ser mais úteis para inspeção e aprendizado do que para reuso direto.',
    objectType: 'satellite',
    potential: 'medium',
    preferredPath: 'repair',
  },
  {
    dataConfidence: 'simulated',
    estimatedSharePct: 34,
    id: 'reuse-rocket-body-titanium',
    material: 'titanium',
    notes: 'Exemplos de estágio superior ajudam a comparar materiais duráveis com decisões de retirada de órbita.',
    objectType: 'rocket_body',
    potential: 'medium',
    preferredPath: 'recycle',
  },
  {
    dataConfidence: 'unknown',
    estimatedSharePct: 10,
    id: 'reuse-debris-unknown',
    material: 'unknown',
    notes: 'Fragmentos pequenos devem deixar a incerteza clara antes de qualquer afirmação de reuso.',
    objectType: 'debris',
    potential: 'low',
    preferredPath: 'deorbit',
  },
];
