import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '25369',
    database: 'apivendas',
    synchronize: true,
    logging: false,
    entities: ['src/modules/**/typeorm/entities/*.ts'],
    migrations: ['src/shared/typeorm/migrations/*.ts'],
    // migrationsTableName: 'custom_migration_table',
});

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
    })
    .catch(error => console.log(error));
