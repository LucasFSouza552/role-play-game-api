import { Knex } from 'knex';

const tablename = 'users';
export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable(tablename, (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.enum('role', ['user', 'admin']).defaultTo('user');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(tablename);
}