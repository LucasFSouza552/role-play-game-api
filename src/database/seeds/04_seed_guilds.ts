import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	await knex('guilds').insert([
		{
			name: 'Guilda dos Aventureiros'
		},
		{
			name: 'Guilda dos Magos'
		},
		{
			name: 'Guilda dos Mercadores'
		},
		{
			name: 'Guilda dos Assassinos'
		},
		{
			name: 'Guilda dos Ferreiros'
		}
	]);
}
