import { knex } from 'knex';
import config from '../knexfile'; // ajuste conforme necessário

async function hardResetAllMigrations() {
  const db = knex(config.development);

  try {
    console.log('⛔ Apagando todas as tabelas do banco de dados...');

    // Lista todas as tabelas no schema público
    const tablesResult = await db.raw(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public';
    `);

    const tables = tablesResult.rows.map((row: any) => row.tablename);

    for (const table of tables) {
      try {
        console.log(`-> Dropando tabela: ${table}`);
        await db.raw(`DROP TABLE IF EXISTS "${table}" CASCADE`);
      } catch (err) {
        if (err instanceof Error) {
          console.warn(`⚠️ Erro ao apagar tabela "${table}": ${err.message}`);
        } else {
          console.warn(`⚠️ Erro desconhecido ao apagar tabela "${table}":`, err);
        }
      }
    }

    console.log('🧹 Limpando histórico de migrations...');
    await db.raw('DROP TABLE IF EXISTS knex_migrations');
    await db.raw('DROP TABLE IF EXISTS knex_migrations_lock');

    console.log('🚀 Executando todas as migrations novamente...');
    const result = await db.migrate.latest();
    console.log('✅ Migrations reaplicadas:', result);
  } catch (error) {
    console.error('❌ Erro ao resetar o banco de dados e rodar migrations:', error);
  } finally {
    await db.destroy();
  }
}

hardResetAllMigrations();
