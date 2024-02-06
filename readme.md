## Instalação

1- Instale as dependências

```bash
  npm install
```

2- Iniciar o projeto

```bash
  npm run dev
```

## Comandos Typeorm

1- Criar Migration

```bash
  npx typeorm migration:create ./src/shared/typeorm/migrations/Nome_da_Migration
```

-   ou você pode usar o meu criador automatico de migration basta executar esse comando

```bash
  node CreateMigration.js Nome_da_Migrate
```

2- Iniciando as Migrations

```bash
  npx typeorm-ts-node-commonjs migration:run -d ./src/shared/typeorm/index.ts
```

3- Resetando as Migrations

```bash
  npx typeorm-ts-node-commonjs migration:revert -d ./src/shared/typeorm/index.ts
```

## Autor

-   [@Carlos Seixas](https://www.github.com/carlosseixas2)
