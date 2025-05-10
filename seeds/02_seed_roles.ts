import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {

    await knex('champion_roles').insert([
        {

            name: 'warrior',
            description: 'strong and brave warrior',
            hp: 100,
            mp: 50,
            ep: 30
        },
        {
            name: 'mage',
            description: 'master of magic and arcane arts',
            hp: 80,
            mp: 100,
            ep: 50
        },
        {
            name: 'assassin',
            description: 'stealthy and deadly',
            hp: 90,
            mp: 70,
            ep: 40
        },
        {
            name: 'healer',
            description: 'supportive and caring',
            hp: 70,
            mp: 60,
            ep: 80
        },
        {
            name: 'tank',
            description: 'defensive and resilient',
            hp: 150,
            mp: 40,
            ep: 20
        }
    ]);
}
