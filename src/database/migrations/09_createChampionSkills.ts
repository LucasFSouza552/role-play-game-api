import { Knex } from 'knex';

const tableName = 'champion_skills';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.integer('championId').unsigned().notNullable();
    table.integer('skillId').unsigned().notNullable();

    table
      .foreign('championId')
      .references('id')
      .inTable('champions')
      .onDelete('CASCADE');

    table
      .foreign('skillId')
      .references('id')
      .inTable('skills')
      .onDelete('CASCADE');

    table.unique(['championId', 'skillId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}
