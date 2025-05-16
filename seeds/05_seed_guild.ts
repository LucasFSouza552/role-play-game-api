import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex('guild').insert([
        {
            id: '1',
            nome: 'Guilda dos Aventureiros'
        },
        {
            id: '2',
            nome: 'Guilda dos Magos'
        },
        {
            id: '3',
            nome: 'Guilda dos Mercadores'
        },
        {
            id: '4',
            nome: 'Guilda dos Assassinos'
        },
        {
            id: '5',
            nome: 'Guilda dos Ferreiros'
        }
    ]);
}
