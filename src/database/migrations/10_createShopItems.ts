import { Knex } from "knex";

const tablename = 'shop_items';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tablename, (table) => {
        table.integer('inventoryId')
            .notNullable()
            .references('id')
            .inTable('shop')
            .onDelete('CASCADE');
        table.integer('itemId')
            .notNullable()
            .references('id')
            .inTable('items')
            .onDelete('CASCADE');
        table.primary(['inventoryId', 'itemId']);

    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(tablename);
}