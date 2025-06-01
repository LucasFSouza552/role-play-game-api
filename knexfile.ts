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
            directory: path.join(__dirname, './src/database/migrations'),
        },
        seeds:{
            directory: path.join(__dirname, './src/database/seeds'),

        }
    }
};

export default knexConfig;
