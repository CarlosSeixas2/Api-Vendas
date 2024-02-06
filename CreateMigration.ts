const { execSync } = require('child_process');

const migrationName = process.argv[2];

if (!migrationName) {
    console.error('Por favor, forneça o nome da migração como argumento.');
    process.exit(1);
}

const migrationFile = `./src/shared/typeorm/migrations/${migrationName}`;

try {
    execSync(`npx typeorm migration:create ${migrationFile}`, {
        stdio: 'inherit',
    });
} catch (error) {
    console.error('Erro ao executar a migração:', error);
    process.exit(1);
}
