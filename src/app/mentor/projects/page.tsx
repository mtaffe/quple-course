import { MentorProjectsClient } from './MentorProjectsClient';

export const metadata = {
  title: 'Projetos para Revisar | Mentor Dashboard',
  description: 'Revise projetos semanais dos alunos',
};

export default function MentorProjectsPage() {
  return <MentorProjectsClient />;
}
