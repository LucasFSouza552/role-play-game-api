import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {

	await knex('skills').insert([
	{
		name: 'fireball',
		description: 'Throws a fireball at the enemy',
		power: 50,
		MP: 20, 
		EP: 0,
		target: 'single'
	},
	{
		name: 'ice blast',
		description: 'Freezes enemies in the area',
		power: 40,
		MP: 0,
		EP: 10,
		target: 'area'
	},
	{
		name: 'heal',
		description: 'Heals the target',
		power: 30,
		MP: 15,
		EP: 0,
		target: 'single'
	},
	{
		name: 'shield',
		description: 'Creates a protective shield around the target',
		power: 20,
		MP: 10,
		EP: 5,
		target: 'single'
	},
	{
		name: 'earthquake',
		description: 'Shakes the ground and damages enemies in the area',
		power: 60,
		MP: 0,
		EP: 25,
		target: 'area'
	}
]);

}
