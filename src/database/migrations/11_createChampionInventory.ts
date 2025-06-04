import { Knex } from "knex";

const tablename = 'champion_inventory';

export async function up(knex: Knex): Promise<void> {
    
    await knex.schema.createTable(tablename, (table) => {
        table.increments('id').primary();
        table.integer('ownerId')
            .notNullable()
            .references('id')
            .inTable('champions')
            .unique()
            .onDelete('CASCADE');
        table.integer('capacity').defaultTo(20);
    });
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable(tablename);
}