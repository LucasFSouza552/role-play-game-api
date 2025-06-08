import { Knex } from "knex";

const tablename = 'guilds';
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tablename, (table) => {
        table.increments('id').primary();
        table.string('name').unique().notNullable();
        table.integer('level').notNullable().defaultTo(1);
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
    
}


export async function down(knex:Knex): Promise<void> {
    await knex.schema.dropTable(tablename);
}