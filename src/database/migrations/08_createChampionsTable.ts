import { Knex } from 'knex';

const tablename = 'champions'
export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(tablename, (table) => {
		table.increments('id').primary();
		table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
		table.string('name').notNullable();
		table.decimal('money', 10, 2).defaultTo(0);
		table.integer('guildId').references('id').inTable('guilds').onDelete('SET NULL');
		table.integer('roleId').references('id').inTable('champion_roles').onDelete('CASCADE');

		// Status
		table.integer('strength').defaultTo(0);
		table.integer('dexterity').defaultTo(0);
		table.integer('intelligence').defaultTo(0);
		table.integer('vitality').defaultTo(0);
		table.integer('hp').defaultTo(0);
		table.integer('mp').defaultTo(0);
		table.integer('ep').defaultTo(0);
		table.integer('sp').defaultTo(15);
		
		table.integer('level').defaultTo(1);
		table.integer('xp').defaultTo(0);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable(tablename);
}
