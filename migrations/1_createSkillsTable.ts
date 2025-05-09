import { Knex } from 'knex';

const tablename = 'skills';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tablename, (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.integer('power').defaultTo(0);
    table.integer('cost').defaultTo(0);
    table.string('target').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tablename);
}
