import { MentorDashboardClient } from './MentorDashboardClient';

export const metadata = {
  title: 'Dashboard | Mentor',
  description: 'Overview do cohort e progresso dos alunos',
};

export default function MentorDashboardPage() {
  return <MentorDashboardClient />;
}
