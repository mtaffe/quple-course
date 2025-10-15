/**
 * Mapeamento centralizado de recursos relacionados para cada semana
 * Conecta módulos semanais com materiais de apoio da biblioteca
 */

export const weeklyResourcesMap: Record<number, string[]> = {
  1: ['html-fundamentals'],
  
  2: ['html-fundamentals', 'css-basics'],
  
  3: ['css-basics', 'css-advanced'],
  
  4: ['css-advanced', 'css-basics'],
  
  5: ['javascript-fundamentals'],
  
  6: ['javascript-fundamentals', 'dom-manipulation'],
  
  7: ['dom-manipulation', 'javascript-fundamentals'],
  
  8: ['javascript-advanced', 'dom-manipulation'],
  
  9: ['javascript-advanced'],
  
  10: ['react-fundamentals'],
  
  11: ['react-fundamentals', 'react-hooks'],
  
  12: ['react-fundamentals', 'react-hooks', 'deployment'],
};

/**
 * Retorna os IDs dos recursos relacionados para uma semana específica
 */
export function getResourcesForWeek(weekNumber: number): string[] {
  return weeklyResourcesMap[weekNumber] || [];
}

/**
 * Verifica se uma semana tem recursos relacionados
 */
export function hasResources(weekNumber: number): boolean {
  const resources = weeklyResourcesMap[weekNumber];
  return resources !== undefined && resources.length > 0;
}

/**
 * Conta total de recursos únicos no mapa
 */
export function getTotalUniqueResources(): number {
  const allResources = Object.values(weeklyResourcesMap).flat();
  return new Set(allResources).size;
}
