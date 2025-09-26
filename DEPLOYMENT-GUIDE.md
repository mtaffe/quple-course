# 🚀 Guia de Deploy no Vercel - React Learning Playground

## 📋 Pré-requisitos

Antes de fazer o deploy, certifique-se de que:

- [x] ✅ Projeto está funcionando localmente (`npm run dev`)
- [x] ✅ Build local funciona sem erros (`npm run build`)
- [x] ✅ Supabase configurado e funcionando
- [x] ✅ Variáveis de ambiente configuradas no `.env.local`
- [x] ✅ Código commitado no Git (GitHub/GitLab)

## 🔧 Passo 1: Preparação do Projeto

### 1.1 Verificar Build Local
```bash
npm run build
npm run start
```
Se houver erros, corrigir antes de prosseguir.

### 1.2 Verificar Scripts no package.json
Confirmar que os scripts estão corretos:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

### 1.3 Verificar Next.js Config
O arquivo `next.config.ts` já está otimizado para deploy:
```typescript
const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  outputFileTracingIncludes: {
    '/': ['./src/**/*']
  }
};
```

## 🌐 Passo 2: Configurar Repository no GitHub

### 2.1 Criar Repository (se não existir)
```bash
# Se ainda não tem repository remoto
git remote add origin https://github.com/SEU_USUARIO/react-learning-playground.git
git branch -M main
git push -u origin main
```

### 2.2 Verificar se está tudo commitado
```bash
git status
git add .
git commit -m "feat: prepare for vercel deployment 🚀"
git push
```

## 📱 Passo 3: Deploy no Vercel

### 3.1 Acessar Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em "New Project"

### 3.2 Importar Projeto
1. Selecione o repositório `react-learning-playground`
2. Clique em "Import"
3. Configurar projeto:
   - **Project Name**: `react-learning-playground` (ou nome desejado)
   - **Framework Preset**: Next.js (detectado automaticamente)
   - **Root Directory**: `./` (raiz)
   - **Build Command**: `npm run build` (padrão)
   - **Output Directory**: `.next` (padrão)

### 3.3 Configurar Variáveis de Ambiente
Na seção "Environment Variables", adicionar:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://upupwwgoqqdehgvifhrs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwdXB3d2dvcXFkZWhndmlmaHJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MTA2MjAsImV4cCI6MjA3NDM4NjYyMH0.TxqSR8WJH4JjNx8jgRqEpcEv7dNARNiUlkJFKj-wiy4
```

**⚠️ IMPORTANTE**: Para produção, considere:
- Remover `NEXT_PUBLIC_DEMO_MODE=true` (modo demo)
- Usar chaves Supabase específicas para produção
- Configurar domínio personalizado no Supabase

### 3.4 Deploy
1. Clique em "Deploy"
2. Aguardar build completar (2-5 minutos)
3. Projeto será disponibilizado em: `https://seu-projeto.vercel.app`

## 🔐 Passo 4: Configurar Supabase para Produção

### 4.1 Configurar Authentication URLs
No painel do Supabase:
1. Acesse "Authentication" → "Settings"
2. Em "Site URL", adicionar: `https://seu-projeto.vercel.app`
3. Em "Redirect URLs", adicionar:
   - `https://seu-projeto.vercel.app/auth/callback`
   - `https://seu-projeto.vercel.app/dashboard`

### 4.2 Verificar RLS (Row Level Security)
Confirmar que as políticas RLS estão ativas:
```sql
-- Verificar se RLS está habilitado
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('students', 'submissions');
```

## 🚀 Passo 5: Configurações Avançadas (Opcional)

### 5.1 Domínio Personalizado
1. No dashboard Vercel: Settings → Domains
2. Adicionar domínio personalizado
3. Configurar DNS conforme instruções

### 5.2 Configurar Analytics
1. No dashboard Vercel: Analytics
2. Habilitar Vercel Analytics
3. Adicionar código de tracking se necessário

### 5.3 Configurar Monitoring
1. Instalar Vercel CLI: `npm i -g vercel`
2. Configurar alerts no dashboard
3. Monitorar performance e erros

## 🧪 Passo 6: Testes Pós-Deploy

### 6.1 Checklist de Funcionalidades
- [ ] Landing page carrega corretamente
- [ ] Sistema de login/registro funciona
- [ ] Dashboard gamificado exibe dados
- [ ] Avaliação de nível funciona
- [ ] Desafios carregam corretamente
- [ ] Monaco Editor funciona
- [ ] Preview dos desafios funciona
- [ ] Leaderboard carrega
- [ ] Design responsivo no mobile
- [ ] Performance: Lighthouse Score > 90

### 6.2 Teste de Performance
```bash
# Usar Lighthouse CLI
npm install -g lighthouse
lighthouse https://seu-projeto.vercel.app --view
```

### 6.3 Teste em Dispositivos
- Desktop: Chrome, Firefox, Safari
- Mobile: iOS Safari, Chrome Mobile
- Tablet: iPad, Android tablets

## 📊 Passo 7: Monitoring e Manutenção

### 7.1 Vercel Dashboard
Monitorar regularmente:
- Build logs
- Function logs
- Performance metrics
- Error rates

### 7.2 Supabase Dashboard
Acompanhar:
- Database usage
- Auth metrics
- API requests
- Storage usage

### 7.3 Atualizações
```bash
# Para atualizações futuras
git add .
git commit -m "feat: nova funcionalidade"
git push
# Deploy automático no Vercel
```

## ⚡ Comandos Úteis

### Deploy Manual (se necessário)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Logs em Tempo Real
```bash
# Ver logs de função
vercel logs https://seu-projeto.vercel.app

# Ver builds
vercel inspect https://seu-projeto.vercel.app
```

### Rollback
```bash
# Listar deployments
vercel list

# Promover deployment anterior
vercel promote [deployment-url]
```

## 🔍 Troubleshooting Comum

### Build Falha
```bash
# Verificar dependências
npm ci
npm run build

# Verificar TypeScript
npm run type-check
```

### Erro 500
- Verificar variáveis de ambiente
- Verificar logs no Vercel dashboard
- Verificar conectividade com Supabase

### Erro de Auth
- Verificar URLs no Supabase
- Verificar chaves de API
- Verificar RLS policies

### Performance Issues
- Verificar imagens (usar next/image)
- Verificar bundle size
- Implementar lazy loading

## 📈 Métricas de Sucesso

### Performance Targets
- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Funcional Targets
- **Uptime**: > 99.9%
- **Error Rate**: < 0.1%
- **Build Time**: < 3 minutos

## 🎯 Próximos Passos

Após deploy bem-sucedido:

1. **SEO**: Configurar meta tags e sitemap
2. **PWA**: Implementar Service Worker
3. **Analytics**: Integrar Google Analytics
4. **Feedback**: Sistema de coleta de feedback
5. **A/B Testing**: Implementar testes A/B

## 📞 Suporte

### Links Úteis
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deploy Guide](https://nextjs.org/docs/deployment)
- [Supabase Production Checklist](https://supabase.com/docs/guides/platform/going-into-prod)

### Troubleshooting
Se encontrar problemas:
1. Verificar logs no Vercel dashboard
2. Testar build local
3. Verificar variáveis de ambiente
4. Consultar documentação oficial

---

## ✅ Checklist Final

### Antes do Deploy
- [ ] Projeto funciona localmente
- [ ] Build local sem erros
- [ ] Código commitado no Git
- [ ] Variáveis de ambiente documentadas

### Durante o Deploy
- [ ] Repository importado corretamente
- [ ] Variáveis de ambiente configuradas
- [ ] Build completou com sucesso
- [ ] URL do projeto funcionando

### Após o Deploy
- [ ] Todas funcionalidades testadas
- [ ] Supabase configurado para produção
- [ ] Performance otimizada
- [ ] Monitoring configurado

**🎉 Parabéns! Seu React Learning Playground está no ar!**

URL do projeto: `https://react-learning-playground.vercel.app` (exemplo)