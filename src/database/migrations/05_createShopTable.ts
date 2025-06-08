import { Knex } from "knex";
import { ItemType } from "../../models/enums/ItemType";

const tablename = 'shop';
const itemType = Object.values(ItemType);

export async function up(knex: Knex) {
    await knex.schema.createTable(tablename, (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.enu('type', itemType).notNullable();
    })
}

export async function down(knex:Knex): Promise<void> {
    await knex.schema.dropTable(tablename);
}