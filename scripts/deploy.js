const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando processo de deploy...');

try {
  const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  console.log(`Branch atual: ${branch}`);

  console.log('Buildando projeto...');
  execSync('npm run build', { stdio: 'inherit' });

  // Verifica se o build foi gerado
  if (!fs.existsSync('dist')) {
    throw new Error('Build não foi gerado corretamente');
  }

  console.log('Deploy preparado com sucesso!');
  console.log('Arquivos gerados em ./dist');
  
} catch (error) {
  console.error('Erro durante o deploy:', error.message);
  process.exit(1);
}
