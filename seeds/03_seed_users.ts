import {Knex} from "knex";

export async function seed(knex: Knex): Promise<void> {
	await knex('users').insert([
		{id: 1, name: 'Admin', email: 'admin', password: 'admin', role: 'admin'},
		{id: 2, name: 'User', email: 'user', password: 'user', role: 'user'},
		{id: 3, name: 'Ana', email: 'ana', password: 'ana', role: 'user'},
		{id: 4, name: 'Pedro', email: 'pedro', password: 'pedro', role: 'user'},
		{id: 5, name: 'João', email: 'joao', password: 'joao', role: 'user'},
		{id: 6, name: 'Maria', email: 'maria', password: 'maria', role: 'user'},
		{id: 7, name: 'Roberto', email: 'roberto', password: 'roberto', role: 'user'},
	]);
}
