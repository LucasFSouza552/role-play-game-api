import { Knex } from "knex";

const tablename = 'guilds';
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tablename, (table) => {
        table.increments('id').primary()
        table.string('name').primary()
    });
    
}


export async function down(knex:Knex): Promise<void> {
    await knex.schema.dropTable(tablename);
}