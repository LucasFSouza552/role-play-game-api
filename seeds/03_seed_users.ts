import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	await knex('users').insert([
		{ name: 'Admin', email: 'admin', password: 'admin', role: 'admin' },
		{ name: 'User', email: 'user', password: 'user', role: 'user' },
		{ name: 'Ana', email: 'ana', password: 'ana', role: 'user' },
		{ name: 'Pedro', email: 'pedro', password: 'pedro', role: 'user' },
		{ name: 'João', email: 'joao', password: 'joao', role: 'user' },
		{ name: 'Maria', email: 'maria', password: 'maria', role: 'user' },
		{ name: 'Roberto', email: 'roberto', password: 'roberto', role: 'user' },
	]);
}
