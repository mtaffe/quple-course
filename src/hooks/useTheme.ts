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
      const preferences = themeSystem.getPreferences(studentId)
      themeSystem.applyPreferences(preferences)
    }
  }, [studentId])

  return {
    applyTheme: themeSystem.applyTheme.bind(themeSystem),
    getThemes: themeSystem.getThemes.bind(themeSystem),
    getCurrentTheme: themeSystem.getCurrentTheme.bind(themeSystem),
    savePreferences: (preferences: any) => studentId && themeSystem.savePreferences(studentId, preferences),
    getPreferences: () => studentId ? themeSystem.getPreferences(studentId) : null
  }
}