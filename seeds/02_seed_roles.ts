import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {

    await knex('champion_roles').insert([
        {

            name: 'warrior',
            description: 'strong and brave warrior',
            hp_current: 100, hp_max: 100,
            mp_current: 50, mp_max: 50,
            ep_current: 30, ep_max: 30
        },
        {
            name: 'mage',
            description: 'master of magic and arcane arts',
            hp_current: 80, hp_max: 80,
            mp_current: 100, mp_max: 100,
            ep_current: 50, ep_max: 50
        },
        {
            name: 'assassin',
            description: 'stealthy and deadly',
            hp_current: 90, hp_max: 90,
            mp_current: 70, mp_max: 70,
            ep_current: 40, ep_max: 40
        },
        {
            name: 'healer',
            description: 'supportive and caring',
            hp_current: 70, hp_max: 70,
            mp_current: 60, mp_max: 60,
            ep_current: 80, ep_max: 80
        },
        {
            name: 'tank',
            description: 'defensive and resilient',
            hp_current: 150, hp_max: 150,
            mp_current: 40, mp_max: 40,
            ep_current: 20, ep_max: 20
        }
    ]);
}
