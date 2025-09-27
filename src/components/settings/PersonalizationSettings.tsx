'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { themeSystem, Theme, UserPreferences } from '@/lib/themes/themeSystem'
import { Palette, Settings, Volume2, VolumeX, Eye, Monitor, Smartphone, Download, Upload, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PersonalizationSettingsProps {
  studentId: string
  onClose?: () => void
  className?: string
}

export function PersonalizationSettings({ studentId, onClose, className = '' }: PersonalizationSettingsProps) {
  const [activeTab, setActiveTab] = useState<'themes' | 'preferences' | 'advanced'>('themes')
  const [themes, setThemes] = useState<Theme[]>([])
  const [currentTheme, setCurrentTheme] = useState('')
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [previewTheme, setPreviewTheme] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [studentId])

  const loadSettings = () => {
    themeSystem.loadCustomThemes()
    const availableThemes = themeSystem.getThemes()
    const current = themeSystem.getCurrentTheme()
    const prefs = themeSystem.getPreferences(studentId)

    setThemes(availableThemes)
    setCurrentTheme(current)
    setPreferences(prefs)
  }

  const handleThemeSelect = (themeId: string) => {
    setCurrentTheme(themeId)
    themeSystem.applyTheme(themeId)
  }

  const handleThemePreview = (themeId: string | null) => {
    setPreviewTheme(themeId)
    if (themeId) {
      themeSystem.applyTheme(themeId)
    } else {
      themeSystem.applyTheme(currentTheme)
    }
  }

  const updatePreference = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    if (!preferences) return

    const newPrefs = { ...preferences, [key]: value }
    setPreferences(newPrefs)
    themeSystem.savePreferences(studentId, { [key]: value })
  }

  const exportSettings = async () => {
    setIsExporting(true)
    try {
      const settings = themeSystem.exportSettings(studentId)
      const blob = new Blob([settings], { type: 'application/json' })
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `dev-playground-settings-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      alert('✅ Configurações exportadas com sucesso!')
    } catch (error) {
      alert('❌ Erro ao exportar configurações.')
    } finally {
      setIsExporting(false)
    }
  }

  const importSettings = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          const success = themeSystem.importSettings(studentId, content)

          if (success) {
            alert('✅ Configurações importadas com sucesso!')
            loadSettings()
          } else {
            alert('❌ Erro ao importar configurações.')
          }
        } catch (error) {
          alert('❌ Arquivo inválido.')
        }
      }
      reader.readAsText(file)
    }

    input.click()
  }

  const resetSettings = () => {
    const confirm = window.confirm('Tem certeza que deseja resetar todas as configurações para o padrão?')
    if (confirm) {
      themeSystem.resetToDefaults(studentId)
      loadSettings()
      alert('✅ Configurações resetadas!')
    }
  }

  const getThemesByCategory = (category: string) => {
    return themes.filter(theme => theme.category === category)
  }

  if (!preferences) return null

  return (
    <div className={`glass-card rounded-xl p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Palette className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Personalização</h3>
            <p className="text-xs text-muted-foreground">
              Customize sua experiência de aprendizado
            </p>
          </div>
        </div>

        {onClose && (
          <Button onClick={onClose} variant="outline" size="sm">
            Fechar
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-6">
        {[
          { id: 'themes', label: 'Temas', icon: <Palette className="h-4 w-4" /> },
          { id: 'preferences', label: 'Preferências', icon: <Settings className="h-4 w-4" /> },
          { id: 'advanced', label: 'Avançado', icon: <Monitor className="h-4 w-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Themes Tab */}
      {activeTab === 'themes' && (
        <div className="space-y-6">
          {/* Current Theme */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Tema Atual</h4>
            <div className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-lg border-2 border-primary"
                style={{ background: themes.find(t => t.id === currentTheme)?.preview }}
              />
              <div>
                <p className="font-medium text-foreground">
                  {themes.find(t => t.id === currentTheme)?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {themes.find(t => t.id === currentTheme)?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Theme Categories */}
          {['dark', 'light', 'gaming', 'colorful'].map(category => {
            const categoryThemes = getThemesByCategory(category)
            if (categoryThemes.length === 0) return null

            return (
              <div key={category}>
                <h4 className="font-medium text-foreground mb-3 capitalize">
                  {category === 'dark' ? 'Escuros' :
                   category === 'light' ? 'Claros' :
                   category === 'gaming' ? 'Gaming' : 'Coloridos'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categoryThemes.map((theme) => (
                    <div
                      key={theme.id}
                      className={cn(
                        "glass-card rounded-lg p-4 cursor-pointer border-2 transition-all premium-hover",
                        currentTheme === theme.id
                          ? "border-primary bg-primary/10"
                          : "border-transparent hover:border-border"
                      )}
                      onClick={() => handleThemeSelect(theme.id)}
                      onMouseEnter={() => handleThemePreview(theme.id)}
                      onMouseLeave={() => handleThemePreview(null)}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-12 h-12 rounded-lg border border-border"
                          style={{ background: theme.preview }}
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-foreground text-sm">
                            {theme.name}
                          </h5>
                          <p className="text-xs text-muted-foreground leading-tight">
                            {theme.description}
                          </p>

                          {/* Theme Features */}
                          <div className="flex space-x-1 mt-2">
                            {theme.effects.glassmorphism && (
                              <span className="text-xs bg-blue-500/20 text-blue-500 px-1.5 py-0.5 rounded">
                                Glass
                              </span>
                            )}
                            {theme.effects.particles && (
                              <span className="text-xs bg-purple-500/20 text-purple-500 px-1.5 py-0.5 rounded">
                                Particles
                              </span>
                            )}
                            {theme.effects.gradients && (
                              <span className="text-xs bg-green-500/20 text-green-500 px-1.5 py-0.5 rounded">
                                Gradients
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="space-y-6">
          {/* Display Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Display</h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">Tamanho da Fonte</p>
                  <p className="text-xs text-muted-foreground">Ajuste o tamanho do texto</p>
                </div>
                <select
                  value={preferences.fontSize}
                  onChange={(e) => updatePreference('fontSize', e.target.value as any)}
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="small">Pequeno</option>
                  <option value="medium">Médio</option>
                  <option value="large">Grande</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">Modo Compacto</p>
                  <p className="text-xs text-muted-foreground">Interface mais densa</p>
                </div>
                <button
                  onClick={() => updatePreference('compactMode', !preferences.compactMode)}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    preferences.compactMode ? "bg-primary" : "bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      preferences.compactMode ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">Reduzir Animações</p>
                  <p className="text-xs text-muted-foreground">Para melhor performance</p>
                </div>
                <button
                  onClick={() => updatePreference('reducedMotion', !preferences.reducedMotion)}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    preferences.reducedMotion ? "bg-primary" : "bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      preferences.reducedMotion ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Audio Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Áudio</h4>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {preferences.soundEffects ?
                  <Volume2 className="h-4 w-4 text-primary" /> :
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                }
                <div>
                  <p className="font-medium text-foreground text-sm">Efeitos Sonoros</p>
                  <p className="text-xs text-muted-foreground">Sons de celebração e notificações</p>
                </div>
              </div>
              <button
                onClick={() => updatePreference('soundEffects', !preferences.soundEffects)}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                  preferences.soundEffects ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    preferences.soundEffects ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Learning Style */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Estilo de Aprendizagem</h4>

            <div>
              <p className="text-sm text-muted-foreground mb-3">
                Escolha seu estilo preferido para personalizar dicas e conteúdo
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'visual', label: 'Visual', desc: 'Diagramas e imagens' },
                  { id: 'auditory', label: 'Auditivo', desc: 'Explicações faladas' },
                  { id: 'kinesthetic', label: 'Cinestésico', desc: 'Prática hands-on' },
                  { id: 'reading', label: 'Leitura', desc: 'Texto e documentação' }
                ].map(style => (
                  <button
                    key={style.id}
                    onClick={() => updatePreference('learningStyle', style.id as any)}
                    className={cn(
                      "text-left p-3 rounded-lg border-2 transition-all",
                      preferences.learningStyle === style.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-border/70"
                    )}
                  >
                    <p className="font-medium text-foreground text-sm">{style.label}</p>
                    <p className="text-xs text-muted-foreground">{style.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Tab */}
      {activeTab === 'advanced' && (
        <div className="space-y-6">
          {/* Import/Export */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Backup & Restore</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                onClick={exportSettings}
                disabled={isExporting}
                variant="outline"
                className="glass-card premium-hover"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>

              <Button
                onClick={importSettings}
                variant="outline"
                className="glass-card premium-hover"
              >
                <Upload className="h-4 w-4 mr-2" />
                Importar
              </Button>

              <Button
                onClick={resetSettings}
                variant="outline"
                className="text-destructive hover:bg-destructive/10"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Exporte suas configurações para fazer backup ou transferir para outro dispositivo.
            </p>
          </div>

          {/* System Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Informações do Sistema</h4>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tema Atual:</span>
                <span className="text-foreground font-medium">
                  {themes.find(t => t.id === currentTheme)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Versão:</span>
                <span className="text-foreground font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Navegador:</span>
                <span className="text-foreground font-medium">
                  {navigator.userAgent.split(' ')[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}