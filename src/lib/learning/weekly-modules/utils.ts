import { WeeklyModule, WeeklyChallenge, WeeklyProject, DifficultyLevel, PreClassChecklist } from '@/types/weekly-modules';

/**
 * Factory para criar módulos semanais de forma consistente
 * Segue princípio DRY e facilita manutenção
 */

interface ModuleConfig {
  weekNumber: number;
  title: string;
  subtitle: string;
  description: string;
  difficulty?: DifficultyLevel;
  estimatedStudyHours?: number;
  learningObjectives: string[];
  prerequisites?: string[];
}

interface ChallengeConfig {
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  starterCode: string;
  solution: string;
  hints: string[];
  xpReward: number;
  validationRules?: string[];
}

interface ProjectConfig {
  title: string;
  description: string;
  objectives: string[];
  starterCode: string;
  completionCriteria: string[];
  xpReward: number;
  badgeId: string;
}

/**
 * Cria ID único para o módulo baseado no número da semana
 */
export function createModuleId(weekNumber: number, slug: string): string {
  return `week-${weekNumber.toString().padStart(2, '0')}-${slug}`;
}

/**
 * Cria ID único para desafio
 */
export function createChallengeId(weekNumber: number, challengeIndex: number): string {
  return `week-${weekNumber}-challenge-${challengeIndex}`;
}

/**
 * Cria esqueleto base de um módulo semanal
 */
export function createWeeklyModuleBase(config: ModuleConfig): Partial<WeeklyModule> {
  const { weekNumber, title, subtitle, description, learningObjectives, prerequisites = [] } = config;
  
  const id = createModuleId(weekNumber, title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
  
  return {
    id,
    weekNumber,
    title,
    subtitle,
    description,
    difficulty: config.difficulty || 'beginner',
    estimatedStudyHours: config.estimatedStudyHours || 6,
    learningObjectives,
    prerequisites,
    previousWeekId: weekNumber > 1 ? `week-${(weekNumber - 1).toString().padStart(2, '0')}` : undefined,
    nextWeekId: weekNumber < 12 ? `week-${(weekNumber + 1).toString().padStart(2, '0')}` : undefined,
  };
}

/**
 * Cria um desafio com configuração completa
 */
export function createChallenge(weekNumber: number, index: number, config: ChallengeConfig): WeeklyChallenge {
  return {
    id: createChallengeId(weekNumber, index),
    type: 'coding',
    title: config.title,
    description: config.description,
    difficulty: config.difficulty,
    estimatedMinutes: config.estimatedMinutes,
    steps: [{
      id: `${createChallengeId(weekNumber, index)}-step-1`,
      title: config.title,
      instruction: config.description,
      starterCode: config.starterCode,
      solution: config.solution,
      hints: config.hints,
      validationCriteria: config.validationRules || [],
      xpReward: config.xpReward,
    }],
    totalXP: config.xpReward,
  };
}

/**
 * Cria projeto semanal
 */
export function createWeeklyProject(weekNumber: number, config: ProjectConfig): WeeklyProject {
  return {
    id: `week-${weekNumber}-project`,
    title: config.title,
    description: config.description,
    learningObjectives: config.objectives,
    starterCode: config.starterCode,
    completionCriteria: config.completionCriteria,
    portfolioPiece: true,
    estimatedHours: 3,
    xpReward: config.xpReward,
    badgeId: config.badgeId,
  };
}

/**
 * Calcula XP total do módulo
 */
export function calculateTotalXP(challenges: WeeklyChallenge[], project: WeeklyProject): number {
  const challengesXP = challenges.reduce((total, challenge) => total + challenge.totalXP, 0);
  return challengesXP + project.xpReward;
}

/**
 * Valida se um módulo está completo e correto
 */
export function validateModule(module: WeeklyModule): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validar número de desafios
  if (module.challenges.length !== 5) {
    errors.push(`Módulo deve ter exatamente 5 desafios. Encontrado: ${module.challenges.length}`);
  }
  
  // Validar teoria
  if (!module.theoryContent || module.theoryContent.sections.length === 0) {
    errors.push('Módulo deve ter conteúdo teórico');
  }
  
  // Validar projeto
  if (!module.weeklyProject) {
    errors.push('Módulo deve ter projeto semanal');
  }
  
  // Validar checklist pré-aula
  if (!module.preClassChecklist || !module.preClassChecklist.items || module.preClassChecklist.items.length === 0) {
    errors.push('Módulo deve ter checklist pré-aula');
  }
  
  // Validar objetivos de aprendizagem
  if (module.learningObjectives.length < 3) {
    errors.push('Módulo deve ter pelo menos 3 objetivos de aprendizagem');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Gera checklist pré-aula padrão baseado no conteúdo
 */
export function generatePreClassChecklist(
  theoryTime: number,
  challengeCount: number,
  hasProject: boolean
): Array<{ id: string; task: string; estimatedMinutes: number }> {
  const checklist = [
    {
      id: 'read-theory',
      task: 'Ler todo o conteúdo teórico da semana',
      estimatedMinutes: theoryTime,
    },
    {
      id: 'try-examples',
      task: 'Testar os exemplos de código no seu editor',
      estimatedMinutes: 15,
    },
    {
      id: 'attempt-challenges',
      task: `Tentar pelo menos ${Math.min(3, challengeCount)} desafios práticos`,
      estimatedMinutes: 45,
    },
  ];
  
  if (hasProject) {
    checklist.push({
      id: 'review-project',
      task: 'Ler os requisitos do projeto semanal',
      estimatedMinutes: 10,
    });
  }
  
  checklist.push({
    id: 'prepare-questions',
    task: 'Anotar dúvidas para a aula ao vivo',
    estimatedMinutes: 10,
  });
  
  return checklist;
}

/**
 * Template de recursos externos por categoria
 */
export const resourceTemplates = {
  mdn: (topic: string) => ({
    type: 'reading' as const,
    title: `MDN: ${topic}`,
    url: `https://developer.mozilla.org/pt-BR/docs/Web/${topic}`,
  }),
  
  video: (title: string, url: string) => ({
    type: 'video' as const,
    title,
    url,
  }),
  
  interactive: (title: string, url: string) => ({
    type: 'interactive' as const,
    title,
    url,
  }),
  
  cheatsheet: (title: string, content: string) => ({
    type: 'reading' as const,
    title: `Cheatsheet: ${title}`,
    content,
  }),
};
