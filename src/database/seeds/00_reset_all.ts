import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Busca todas as tabelas do schema 'public'
    const tablesResult = await knex
        .select('tablename')
        .from('pg_tables')
        .where({ schemaname: 'public' });

    // Extrai os nomes das tabelas
    const tables = tablesResult.map((row: any) => row.tablename);

    // Deleta os dados das tabelas
    for (const table of tables) {
        await knex(table).del();
    }

    // Reseta os IDs (sequências)
    for (const table of tables) {
        const sequenceName = `${table}_id_seq`;
        try {
            await knex.raw(`ALTER SEQUENCE ${sequenceName} RESTART WITH 1`);
        } catch (error) {
            // Ignora erro se a sequência não existir (ex: tabelas sem ID auto-incrementável)
            console.warn(`Sequência não encontrada para a tabela "${table}", ignorando...`);
        }
    }
}
