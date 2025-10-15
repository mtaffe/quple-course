import Link from 'next/link'
import { TopicPageClient } from './TopicPageClient'
import { getTopicBySlug } from '@/lib/learning'

interface TopicPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params

  // Get topic from /lib/learning instead of hardcoded data
  const topic = getTopicBySlug(slug)

  if (!topic) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📖</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Tópico não encontrado</h1>
          <Link href="/learn" className="text-primary premium-hover">← Voltar aos conteúdos</Link>
        </div>
      </div>
    )
  }

  return <TopicPageClient topic={topic} slug={slug} />
}
