import { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        },
        migrations: {
            directory: path.join(__dirname, './migrations'), // Ajuste o caminho para o diretório de migrações
        },
        seeds:{
            directory: path.join(__dirname, './seeds'), // Ajuste o caminho para o diretório de migrações

        }
    }
};

export default knexConfig;
