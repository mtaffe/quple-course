export { supabase } from './client';
export { WeeklyProgressService } from './weekly-progress-service';
export { CohortService } from './cohort-service';
export { ChallengeSubmissionService } from './challenge-submission-service';
export { ProjectSubmissionService } from './project-submission-service';
export { MentorAnalyticsService } from './mentor-analytics-service';
export type { Cohort, CohortStudent } from './cohort-service';
export type { ChallengeSubmission, SubmissionStats } from './challenge-submission-service';
export type { ProjectSubmission, ProjectSubmissionInput } from './project-submission-service';
export type { 
  PendingSubmission, 
  ReviewedSubmission, 
  ChallengeAnalytics, 
  StudentProgress 
} from './mentor-analytics-service';
