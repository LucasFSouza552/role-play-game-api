import { knex } from 'knex';
import config from './config/knexfile';

async function runMigrations() {
  const db = knex(config.development);

  try {
    console.log('Iniciando as migrations...');
    const a = await db.migrate.latest();
    console.log(a)
    console.log('Migrations aplicadas com sucesso!');
  } catch (error) {
    console.error('Erro ao rodar as migrations:', error);
  } finally {
    await db.destroy();
  }
}

runMigrations();