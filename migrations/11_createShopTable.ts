import { Knex } from "knex";
import { ItemType } from "../src/models/enums/ItemType";

const tablename = 'shop';
const itemType = Object.values(ItemType);

export async function up(knex: Knex) {
    await knex.schema.createTable(tablename, (table) => {
        table.increments('id').primary();
        table.uuid('userId').notNullable();
        table
            .foreign('userId')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.string('name').notNullable();
        table.string('owner').notNullable();
        table.enu('itemType', itemType).notNullable();
        
    })
}
