import { notFound } from 'next/navigation'
import { getChallengeById } from '@/lib/challenges'
import ChallengeClient from './ChallengeClient'

interface ChallengePageProps {
  params: Promise<{ id: string }>
}

export default async function ChallengePage({ params }: ChallengePageProps) {
  const { id } = await params
  const challengeId = parseInt(id)
  const challenge = getChallengeById(challengeId)

  if (!challenge) {
    notFound()
  }

  return <ChallengeClient challenge={challenge} />
}

export async function generateStaticParams() {
  // Generate static paths for challenges 1-5
  return Array.from({ length: 5 }, (_, i) => ({
    id: (i + 1).toString(),
  }))
}

export async function generateMetadata({ params }: ChallengePageProps) {
  const { id } = await params
  const challengeId = parseInt(id)
  const challenge = getChallengeById(challengeId)

  if (!challenge) {
    return {
      title: 'Desafio não encontrado'
    }
  }

  return {
    title: `${challenge.title} - React Learning Playground`,
    description: challenge.description
  }
}