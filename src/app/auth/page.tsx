import Link from 'next/link';

export default function AuthPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="mb-4 inline-block btn-primary-gradient px-4 py-2 rounded-full text-sm">
              ✨ React Learning Playground
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Bem-vindo de volta!
            </h1>
            <p className="text-muted-foreground">
              Continue sua jornada de aprendizado em desenvolvimento web
            </p>
          </div>

          {/* Auth Options */}
          <div className="glass-card rounded-lg p-8 mb-6">
            <div className="space-y-4">
              <Link
                href="/auth/login"
                className="w-full btn-primary-gradient text-white py-3 px-6 rounded-lg font-semibold premium-hover transition-colors text-center block"
              >
                🔐 Fazer Login
              </Link>

              <div className="text-center text-muted-foreground text-sm">
                ou
              </div>

              <Link
                href="/auth/register"
                className="w-full border border-border glass-card text-foreground py-3 px-6 rounded-lg font-semibold premium-hover transition-colors text-center block"
              >
                ✨ Criar Conta Nova
              </Link>
            </div>
          </div>

          {/* Features Preview */}
          <div className="glass-card rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4 text-center">
              O que você vai encontrar:
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm">
                  🎯
                </div>
                <span className="text-sm text-muted-foreground">5 desafios progressivos</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent text-sm">
                  🏆
                </div>
                <span className="text-sm text-muted-foreground">Sistema de XP e badges</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple/20 rounded-full flex items-center justify-center text-purple text-sm">
                  💻
                </div>
                <span className="text-sm text-muted-foreground">Editor de código integrado</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center text-warning text-sm">
                  📊
                </div>
                <span className="text-sm text-muted-foreground">Progresso personalizado</span>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="text-primary premium-hover text-sm transition-colors"
            >
              ← Voltar para início
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}