import { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: 'postgres',
            password: "nova_senha" as string,
            database: process.env.DB_DATABASE,
        },
        migrations: {
            directory: path.join(__dirname, '../migrations'), // Ajuste o caminho para o diretório de migrações
        },
    }
};

export default knexConfig;
