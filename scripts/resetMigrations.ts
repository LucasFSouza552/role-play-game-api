import { knex } from 'knex';
import config from '../src/config/knexfile'; // ajuste o caminho conforme seu projeto

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

    // Apaga todas as tabelas
    for (const table of tables) {
      console.log(`-> Dropando tabela: ${table}`);
      await db.raw(`DROP TABLE IF EXISTS "${table}" CASCADE`);
    }

    console.log('🧹 Limpando histórico de migrations...');
    // Apaga a tabela de histórico de migrations (knex_migrations)
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
