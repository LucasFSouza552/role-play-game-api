import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {

    await knex('skills').insert([
        {
            id: 1,
            name: 'fireball',
            description: 'Throws a fireball at the enemy',
            power: 50,
            target: 'single'
        },
        {
            id: 2,
            name: 'ice blast',
            description: 'Freezes enemies in the area',
            power: 40,
            target: 'area'
        },
        {
            id: 3,
            name: 'heal',
            description: 'Heals the target',
            power: 30,
            target: 'single'
        },
        {
            id: 4,
            name: 'shield',
            description: 'Creates a protective shield around the target',
            power: 20,
            target: 'single'
        },
        {
            id: 5,
            name: 'earthquake',
            description: 'Shakes the ground and damages enemies in the area',
            power: 60,
            target: 'area'
        }
    ]);
}
