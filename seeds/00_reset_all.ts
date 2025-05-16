import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {

// await knex('champion_skills').del(); 
// await knex('missions').del(); 
await knex('champions').del();
await knex('skills').del();
await knex('champion_roles').del();

// await knex.raw('ALTER SEQUENCE champion_skills_id_seq RESTART WITH 1');
// await knex.raw('ALTER SEQUENCE champions_id_seq RESTART WITH 1');
await knex.raw('ALTER SEQUENCE skills_id_seq RESTART WITH 1');
await knex.raw('ALTER SEQUENCE missions_id_seq RESTART WITH 1');

// await knex.raw('ALTER SEQUENCE champion_roles_id_seq RESTART WITH 1');
}
