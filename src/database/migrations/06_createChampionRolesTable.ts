import { Knex } from 'knex';

const tablename = 'champion_roles';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tablename, (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.text('description').notNullable();
    
    table.integer('hp').defaultTo(100);
    table.integer('mp').defaultTo(50);
    table.integer('ep').defaultTo(30);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tablename);
}
