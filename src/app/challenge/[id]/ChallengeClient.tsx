'use client'

import { Challenge, ValidationResult, ChallengeState } from '@/types'
import { ChallengeLayout } from '@/components/challenge/ChallengeLayout'

interface ChallengeClientProps {
  challenge: Challenge
}

export default function ChallengeClient({ challenge }: ChallengeClientProps) {
  const handleComplete = (result: ValidationResult) => {
    console.log('Challenge completed!', result)
    // TODO: Save completion to database
  }

  const handleSaveProgress = (state: ChallengeState) => {
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