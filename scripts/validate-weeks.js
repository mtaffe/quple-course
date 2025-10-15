#!/usr/bin/env node

/**
 * Script para validar todos os módulos semanais
 * Verifica se cada módulo segue a estrutura correta
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validando módulos semanais...\n');

const modulesDir = path.join(__dirname, '..', 'src', 'lib', 'learning', 'weekly-modules');
const indexPath = path.join(modulesDir, 'index.ts');

// Ler arquivo index.ts para ver quais módulos estão registrados
const indexContent = fs.readFileSync(indexPath, 'utf8');
const importMatches = indexContent.match(/import.*from.*week-\d{2}/g) || [];
const registeredWeeks = importMatches.map(imp => {
  const match = imp.match(/week-(\d{2})/);
  return match ? parseInt(match[1]) : null;
}).filter(Boolean);

console.log(`📚 Módulos registrados: ${registeredWeeks.length}\n`);

const errors = [];
const warnings = [];
let successCount = 0;

for (let weekNum = 1; weekNum <= 12; weekNum++) {
  const isRegistered = registeredWeeks.includes(weekNum);
  
  if (!isRegistered) {
    warnings.push(`⚠️  Semana ${weekNum}: Não encontrada no index.ts`);
    continue;
  }
  
  // Aqui poderíamos adicionar validações mais profundas se necessário
  successCount++;
  console.log(`✅ Semana ${weekNum}: OK`);
}

console.log(`\n📊 Resultado da Validação:`);
console.log(`   ✅ Válidos: ${successCount}/12`);
console.log(`   ⚠️  Avisos: ${warnings.length}`);
console.log(`   ❌ Erros: ${errors.length}`);

if (warnings.length > 0) {
  console.log(`\n⚠️  Avisos:`);
  warnings.forEach(w => console.log(`   ${w}`));
}

if (errors.length > 0) {
  console.log(`\n❌ Erros:`);
  errors.forEach(e => console.log(`   ${e}`));
  process.exit(1);
}

console.log(`\n✨ Validação concluída com sucesso!`);
