import { MentorProjectReviewClient } from './MentorProjectReviewClient';

export const metadata = {
  title: 'Revisar Projeto | Mentor Dashboard',
  description: 'Avalie e dê feedback no projeto do aluno',
};

export default function MentorProjectReviewPage({ params }: { params: { id: string } }) {
  return <MentorProjectReviewClient submissionId={params.id} />;
}
