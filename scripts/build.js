const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Iniciando build de produção...');

try {
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
    console.log('Build anterior removido');
  }

  console.log('Build com Vite...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('Build concluído com sucesso!');
  
} catch (error) {
  console.error('Erro durante o build:', error.message);
  process.exit(1);
}
