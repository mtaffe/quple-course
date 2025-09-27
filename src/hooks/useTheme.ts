'use client'

import { useEffect } from 'react'
import { themeSystem } from '@/lib/themes/themeSystem'

export function useTheme(studentId?: string) {
  useEffect(() => {
    // Carregar temas customizados
    themeSystem.loadCustomThemes()

    // Aplicar tema salvo ou padrão
    const currentTheme = themeSystem.getCurrentTheme()
    themeSystem.applyTheme(currentTheme)

    // Aplicar preferências se tiver studentId
    if (studentId) {
      const applyPrefs = async () => {
        const preferences = await themeSystem.getPreferences(studentId)
        themeSystem.applyPreferences(preferences)
      }
      applyPrefs()
    }
  }, [studentId])

  return {
    applyTheme: themeSystem.applyTheme.bind(themeSystem),
    getThemes: themeSystem.getThemes.bind(themeSystem),
    getCurrentTheme: themeSystem.getCurrentTheme.bind(themeSystem),
    savePreferences: (preferences: { theme?: string; fontSize?: 'small' | 'medium' | 'large'; animations?: boolean; soundEnabled?: boolean; learningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'reading' }) => studentId && themeSystem.savePreferences(studentId, preferences),
    getPreferences: () => studentId ? themeSystem.getPreferences(studentId) : null
  }
}