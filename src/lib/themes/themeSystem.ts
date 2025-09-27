import { supabase } from '@/lib/supabase/client'

interface Theme {
  id: string
  name: string
  description: string
  preview: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    muted: string
    card: string
    border: string
  }
  effects: {
    glassmorphism: boolean
    animations: boolean
    particles: boolean
    gradients: boolean
  }
  category: 'dark' | 'light' | 'gaming' | 'minimal' | 'colorful'
}

interface UserPreferences {
  theme: string
  reducedMotion: boolean
  fontSize: 'small' | 'medium' | 'large'
  codeTheme: 'dark' | 'light' | 'high-contrast'
  soundEffects: boolean
  notifications: boolean
  autoSave: boolean
  compactMode: boolean
  language: 'pt' | 'en'
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
}

class ThemeSystem {
  private themes: Theme[] = [
    {
      id: 'carbon-dark',
      name: 'Carbon Dark (Padrão)',
      description: 'Tema escuro profissional inspirado no Carbon Design',
      preview: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
      colors: {
        primary: '216 100% 60%',
        secondary: '0 0% 12%',
        accent: '142 71% 45%',
        background: '0 0% 4%',
        foreground: '0 0% 96%',
        muted: '0 0% 10%',
        card: '0 0% 6.5%',
        border: '0 0% 14%'
      },
      effects: {
        glassmorphism: true,
        animations: true,
        particles: false,
        gradients: true
      },
      category: 'dark'
    },
    {
      id: 'neon-gaming',
      name: 'Neon Gaming',
      description: 'Tema gaming com efeitos neon e cores vibrantes',
      preview: 'linear-gradient(135deg, #0f0f23 0%, #1a0033 50%, #000000 100%)',
      colors: {
        primary: '280 100% 70%',
        secondary: '280 50% 15%',
        accent: '300 100% 60%',
        background: '280 60% 5%',
        foreground: '300 50% 95%',
        muted: '280 30% 12%',
        card: '280 40% 8%',
        border: '280 50% 20%'
      },
      effects: {
        glassmorphism: true,
        animations: true,
        particles: true,
        gradients: true
      },
      category: 'gaming'
    },
    {
      id: 'ocean-blue',
      name: 'Ocean Blue',
      description: 'Tema azul oceano calmo e relaxante',
      preview: 'linear-gradient(135deg, #001122 0%, #003366 50%, #004488 100%)',
      colors: {
        primary: '200 100% 60%',
        secondary: '210 40% 15%',
        accent: '180 70% 50%',
        background: '220 60% 8%',
        foreground: '200 20% 95%',
        muted: '210 30% 12%',
        card: '215 40% 10%',
        border: '210 30% 18%'
      },
      effects: {
        glassmorphism: true,
        animations: true,
        particles: false,
        gradients: true
      },
      category: 'dark'
    },
    {
      id: 'forest-green',
      name: 'Forest Green',
      description: 'Tema verde floresta, focado e natural',
      preview: 'linear-gradient(135deg, #0a1a0a 0%, #1a3d1a 50%, #0f2f0f 100%)',
      colors: {
        primary: '120 60% 50%',
        secondary: '120 30% 15%',
        accent: '80 70% 45%',
        background: '120 40% 6%',
        foreground: '120 15% 95%',
        muted: '120 25% 12%',
        card: '120 35% 8%',
        border: '120 25% 18%'
      },
      effects: {
        glassmorphism: true,
        animations: true,
        particles: false,
        gradients: true
      },
      category: 'dark'
    },
    {
      id: 'sunset-warm',
      name: 'Sunset Warm',
      description: 'Tema quente inspirado no pôr do sol',
      preview: 'linear-gradient(135deg, #2a1810 0%, #4a2c1a 50%, #3a2015 100%)',
      colors: {
        primary: '25 70% 55%',
        secondary: '20 40% 15%',
        accent: '40 80% 60%',
        background: '20 60% 8%',
        foreground: '30 20% 95%',
        muted: '25 30% 12%',
        card: '22 40% 10%',
        border: '25 30% 18%'
      },
      effects: {
        glassmorphism: true,
        animations: true,
        particles: false,
        gradients: true
      },
      category: 'dark'
    },
    {
      id: 'minimal-light',
      name: 'Minimal Light',
      description: 'Tema claro minimalista para estudo focado',
      preview: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      colors: {
        primary: '210 100% 50%',
        secondary: '210 20% 85%',
        accent: '160 60% 45%',
        background: '0 0% 100%',
        foreground: '210 20% 10%',
        muted: '210 15% 90%',
        card: '0 0% 98%',
        border: '210 20% 85%'
      },
      effects: {
        glassmorphism: false,
        animations: true,
        particles: false,
        gradients: false
      },
      category: 'light'
    }
  ]

  private defaultPreferences: UserPreferences = {
    theme: 'carbon-dark',
    reducedMotion: false,
    fontSize: 'medium',
    codeTheme: 'dark',
    soundEffects: true,
    notifications: true,
    autoSave: true,
    compactMode: false,
    language: 'pt',
    learningStyle: 'visual'
  }

  // Aplicar tema
  applyTheme(themeId: string) {
    const theme = this.themes.find(t => t.id === themeId)
    if (!theme) return

    const root = document.documentElement

    // Aplicar cores CSS customizadas
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })

    // Aplicar efeitos
    root.classList.toggle('no-glassmorphism', !theme.effects.glassmorphism)
    root.classList.toggle('no-animations', !theme.effects.animations)
    root.classList.toggle('particles-enabled', theme.effects.particles)
    root.classList.toggle('gradients-disabled', !theme.effects.gradients)

    // Salvar preferência
    localStorage.setItem('selected_theme', themeId)

    console.log('🎨 Tema aplicado:', theme.name)
  }

  // Obter todos os temas
  getThemes(): Theme[] {
    return this.themes
  }

  // Obter tema específico
  getTheme(themeId: string): Theme | undefined {
    return this.themes.find(t => t.id === themeId)
  }

  // Obter tema atual
  getCurrentTheme(): string {
    return localStorage.getItem('selected_theme') || this.defaultPreferences.theme
  }

  // Salvar preferências do usuário
  async savePreferences(studentId: string, preferences: Partial<UserPreferences>) {
    const currentPrefs = await this.getPreferences(studentId)
    const newPrefs = { ...currentPrefs, ...preferences }

    // Salvar no Supabase
    const { error } = await supabase
      .from('user_preferences')
      .upsert([{
        student_id: studentId,
        theme_id: newPrefs.theme,
        reduced_motion: newPrefs.reducedMotion,
        font_size: newPrefs.fontSize,
        code_theme: newPrefs.codeTheme,
        sound_effects: newPrefs.soundEffects,
        notifications: newPrefs.notifications,
        auto_save: newPrefs.autoSave,
        compact_mode: newPrefs.compactMode,
        language: newPrefs.language,
        learning_style: newPrefs.learningStyle,
        updated_at: new Date().toISOString()
      }])

    if (error) {
      console.error('Erro ao salvar preferências:', error)
      return
    }

    // Aplicar preferências imediatamente
    this.applyPreferences(newPrefs)

    console.log('⚙️ Preferências salvas:', newPrefs)
  }

  // Obter preferências do usuário
  async getPreferences(studentId: string): Promise<UserPreferences> {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('student_id', studentId)
      .single()

    if (error || !data) {
      // Retornar preferências padrão se não existir
      return this.defaultPreferences
    }

    return {
      theme: data.theme_id,
      reducedMotion: data.reduced_motion,
      fontSize: data.font_size,
      codeTheme: data.code_theme,
      soundEffects: data.sound_effects,
      notifications: data.notifications,
      autoSave: data.auto_save,
      compactMode: data.compact_mode,
      language: data.language,
      learningStyle: data.learning_style
    }
  }

  // Aplicar preferências
  applyPreferences(preferences: UserPreferences) {
    const root = document.documentElement

    // Aplicar tema
    this.applyTheme(preferences.theme)

    // Aplicar fonte
    root.classList.remove('font-small', 'font-medium', 'font-large')
    root.classList.add(`font-${preferences.fontSize}`)

    // Aplicar movimento reduzido
    if (preferences.reducedMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }

    // Aplicar modo compacto
    if (preferences.compactMode) {
      root.classList.add('compact-mode')
    } else {
      root.classList.remove('compact-mode')
    }

    // Salvar tema do código
    localStorage.setItem('code_theme', preferences.codeTheme)
  }

  // Criar tema personalizado
  async createCustomTheme(studentId: string, name: string, baseTheme: string, customizations: Partial<Theme>): Promise<Theme> {
    const base = this.getTheme(baseTheme)
    if (!base) throw new Error('Tema base não encontrado')

    const themeId = `custom_${Date.now()}`
    const customTheme: Theme = {
      ...base,
      id: themeId,
      name,
      description: `Tema personalizado baseado em ${base.name}`,
      ...customizations
    }

    // Salvar tema personalizado no Supabase
    const { error } = await supabase
      .from('custom_themes')
      .insert([{
        student_id: studentId,
        theme_id: themeId,
        name: customTheme.name,
        description: customTheme.description,
        colors: customTheme.colors,
        effects: customTheme.effects,
        category: customTheme.category
      }])

    if (error) {
      console.error('Erro ao salvar tema personalizado:', error)
      throw new Error('Não foi possível salvar o tema personalizado')
    }

    this.themes.push(customTheme)
    return customTheme
  }

  // Carregar temas customizados
  async loadCustomThemes(studentId?: string) {
    if (!studentId) return

    const { data, error } = await supabase
      .from('custom_themes')
      .select('*')
      .or(`student_id.eq.${studentId},is_public.eq.true`)

    if (error) {
      console.error('Erro ao carregar temas personalizados:', error)
      return
    }

    if (data) {
      const customThemes: Theme[] = data.map(theme => ({
        id: theme.theme_id,
        name: theme.name,
        description: theme.description,
        preview: theme.colors.primary ? `linear-gradient(135deg, hsl(${theme.colors.primary}) 0%, hsl(${theme.colors.background}) 100%)` : '',
        colors: theme.colors,
        effects: theme.effects,
        category: theme.category
      }))

      // Adicionar apenas temas que ainda não existem
      customThemes.forEach(customTheme => {
        if (!this.themes.find(t => t.id === customTheme.id)) {
          this.themes.push(customTheme)
        }
      })
    }
  }

  // Exportar configurações
  async exportSettings(studentId: string): Promise<string> {
    const preferences = await this.getPreferences(studentId)
    const currentTheme = this.getCurrentTheme()

    const settings = {
      preferences,
      theme: currentTheme,
      exportDate: new Date().toISOString(),
      version: '1.0'
    }

    return JSON.stringify(settings, null, 2)
  }

  // Importar configurações
  async importSettings(studentId: string, settingsJson: string): Promise<boolean> {
    try {
      const settings = JSON.parse(settingsJson)

      if (settings.preferences) {
        await this.savePreferences(studentId, settings.preferences)
      }

      if (settings.theme) {
        this.applyTheme(settings.theme)
      }

      return true
    } catch (error) {
      console.error('Erro ao importar configurações:', error)
      return false
    }
  }

  // Reset para padrões
  async resetToDefaults(studentId: string) {
    // Deletar preferências do banco
    await supabase
      .from('user_preferences')
      .delete()
      .eq('student_id', studentId)

    // Limpar cache local
    localStorage.removeItem('selected_theme')

    // Aplicar preferências padrão
    this.applyPreferences(this.defaultPreferences)
  }
}

export const themeSystem = new ThemeSystem()
export type { Theme, UserPreferences }