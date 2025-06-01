import { Knex } from "knex";

const tablename = 'shop_inventory';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tablename, (table) => {
        table.increments('id').primary();
        table.integer('ownerId')
            .notNullable()
            .references('id')
            .inTable('shop')
            .unique()
            .onDelete('CASCADE');
        table.integer('capacity').defaultTo(10);
    });
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable(tablename);
}