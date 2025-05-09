import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('champion_skills').insert([
    { id: 1, championId: 1, skillId: 1 },
    { id: 2, championId: 2, skillId: 2 },
    { id: 3, championId: 3, skillId: 3 },
    { id: 4, championId: 4, skillId: 4 },
    { id: 5, championId: 5, skillId: 5 },
    { id: 6, championId: 1, skillId: 2 },
    { id: 7, championId: 2, skillId: 3 },
    { id: 8, championId: 3, skillId: 4 },
    { id: 9, championId: 4, skillId: 5 },
    { id: 10, championId: 1, skillId: 3 },
    { id: 11, championId: 2, skillId: 4 },
    { id: 12, championId: 3, skillId: 5 },
    { id: 13, championId: 4, skillId: 1 },
    { id: 14, championId: 5, skillId: 2 },
    { id: 15, championId: 1, skillId: 4 },
    { id: 16, championId: 2, skillId: 5 },
    { id: 17, championId: 3, skillId: 1 },
    { id: 18, championId: 4, skillId: 2 },
    { id: 19, championId: 5, skillId: 3 },
    { id: 20, championId: 1, skillId: 5 },
    { id: 21, championId: 2, skillId: 1 },
    { id: 22, championId: 3, skillId: 2 },
  ]);
}
