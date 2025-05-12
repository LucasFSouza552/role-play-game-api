import { Knex } from 'knex';

const tablename = 'champions'
export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(tablename, (table) => {
		table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
		table.string('name').notNullable();
		table.decimal('money', 10, 2).defaultTo(0);
		table.integer('guildId').nullable();
		//.references('id').inTable('guilds'); // Manter enquanto a guild não existe
		table.integer('roleId').references('id').inTable('champion_roles');

		// Status
		table.integer('strength').defaultTo(0);
		table.integer('dexterity').defaultTo(0);
		table.integer('intelligence').defaultTo(0);
		table.integer('vitality').defaultTo(0);
		table.integer('hp').defaultTo(0);
		table.integer('level').defaultTo(1);
		table.integer('xp').defaultTo(0);
		table.integer('sp').defaultTo(15);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable(tablename);
}
