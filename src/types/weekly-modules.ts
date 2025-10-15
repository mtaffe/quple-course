export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type ModuleStatus = 'locked' | 'available' | 'in_progress' | 'completed';
export type ChallengeType = 'coding' | 'quiz' | 'debug' | 'build';

export interface WeeklyChallengeStep {
  id: string;
  title: string;
  instruction: string;
  starterCode?: string;
  solution?: string;
  hints: string[];
  validationCriteria: string[];
  xpReward: number;
}

export interface WeeklyChallenge {
  id: string;
  type: ChallengeType;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  steps: WeeklyChallengeStep[];
  totalXP: number;
}

export interface WeeklyProject {
  id: string;
  title: string;
  description: string;
  learningObjectives: string[];
  starterCode?: string;
  figmaDesign?: string;
  completionCriteria: string[];
  portfolioPiece: boolean;
  estimatedHours: number;
  xpReward: number;
  badgeId?: string;
}

export interface LearningResource {
  id: string;
  type: 'video' | 'reading' | 'interactive' | 'reference';
  title: string;
  url?: string;
  content?: string;
  duration?: number;
  required: boolean;
}

export interface PreClassChecklist {
  id: string;
  weekId: string;
  items: {
    id: string;
    description: string;
    type: 'content' | 'challenge' | 'project';
    estimatedMinutes: number;
    resourceId?: string;
  }[];
}

export interface WeeklyModule {
  id: string;
  weekNumber: number;
  title: string;
  subtitle: string;
  description: string;
  learningObjectives: string[];
  prerequisites: string[];
  
  // Conteúdo teórico (para estudar antes da aula)
  theoryContent: {
    id: string;
    sections: {
      id: string;
      title: string;
      content: string;
      codeExamples?: {
        language: string;
        code: string;
        explanation: string;
      }[];
      interactiveDemo?: string;
    }[];
  };
  
  // Recursos complementares
  resources: LearningResource[];
  
  // 5 desafios práticos
  challenges: WeeklyChallenge[];
  
  // Projeto semanal principal
  weeklyProject: WeeklyProject;
  
  // Checklist pré-aula (para mentoria ao vivo)
  preClassChecklist: PreClassChecklist;
  
  // Discussão da aula ao vivo
  liveClassTopics: string[];
  
  // Metadata
  estimatedStudyHours: number;
  difficulty: DifficultyLevel;
  tags: string[];
  nextWeekId?: string;
  previousWeekId?: string;
}

export interface StudentWeekProgress {
  studentId: string;
  weekId: string;
  status: ModuleStatus;
  startedAt?: Date;
  completedAt?: Date;
  
  // Progresso detalhado
  theoryProgress: {
    sectionsCompleted: string[];
    readingTime: number;
  };
  
  challengesProgress: {
    challengeId: string;
    status: 'not_started' | 'in_progress' | 'completed';
    attempts: number;
    completedAt?: Date;
    xpEarned: number;
  }[];
  
  projectProgress: {
    status: 'not_started' | 'in_progress' | 'submitted' | 'approved';
    submittedAt?: Date;
    feedbackFromMentor?: string;
    grade?: 'excellent' | 'good' | 'needs_improvement';
    repositoryUrl?: string;
    liveUrl?: string;
  };
  
  preClassChecklistCompleted: boolean;
  readyForLiveClass: boolean;
  
  totalXPEarned: number;
  totalTimeSpent: number;
}

export interface CohortSchedule {
  id: string;
  cohortName: string;
  startDate: Date;
  endDate: Date;
  mentorId: string;
  students: string[];
  maxStudents: 5;
  
  weeklySchedule: {
    weekNumber: number;
    weekId: string;
    liveClassDate: Date;
    liveClassDuration: number;
    oneOnOneSlotsAvailable: boolean;
  }[];
  
  timezone: string;
  language: 'pt-BR' | 'en-US';
}
