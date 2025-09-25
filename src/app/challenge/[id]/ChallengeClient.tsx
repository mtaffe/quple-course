'use client'

import { Challenge } from '@/types'
import { ChallengeLayout } from '@/components/challenge/ChallengeLayout'

interface ChallengeClientProps {
  challenge: Challenge
}

export default function ChallengeClient({ challenge }: ChallengeClientProps) {
  const handleComplete = (result: any) => {
    console.log('Challenge completed!', result)
    // TODO: Save completion to database
  }

  const handleSaveProgress = (state: any) => {
    console.log('Saving progress...', state)
    // TODO: Save progress to database
  }

  return (
    <div className="min-h-screen">
      <ChallengeLayout
        challenge={challenge}
        onComplete={handleComplete}
        onSaveProgress={handleSaveProgress}
      />
    </div>
  )
}