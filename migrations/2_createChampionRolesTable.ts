import { Knex } from 'knex';

const tablename = 'champion_roles';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tablename, (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description').notNullable();

    table.integer('hp_current').defaultTo(100);
    table.integer('hp_max').defaultTo(100);

    table.integer('mp_current').defaultTo(50);
    table.integer('mp_max').defaultTo(50);

    table.integer('ep_current').defaultTo(30);
    table.integer('ep_max').defaultTo(30);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tablename);
}
