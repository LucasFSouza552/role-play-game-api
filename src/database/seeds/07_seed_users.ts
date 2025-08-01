import { Knex } from "knex";
import { cryptPassword } from "../../utils/bcryptPassword";

export async function seed(knex: Knex): Promise<void> {
	const password = await cryptPassword('admin');
	
	await knex('users').insert([
		{ name: 'Admin', email: 'admin', password: password, role: 'admin' },
		{ name: 'Thiago', email: 'thiago.thome@professor.faminas.edu.br', password: password, role: 'user' },
		{ name: 'Ana', email: 'ana', password: password, role: 'user' },
		{ name: 'Pedro', email: 'pedro', password: password, role: 'user' },
		{ name: 'João', email: 'joao', password: password, role: 'user' },
		{ name: 'Maria', email: 'maria', password: password, role: 'user' },
		{ name: 'Roberto', email: 'roberto', password: password, role: 'user' },
	]);
}
