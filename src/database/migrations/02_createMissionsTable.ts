import { Knex } from "knex";
import { MissionDifficult } from "../../models/enums/MissionDifficult";

const difficultyKeys = Object.values(MissionDifficult);

const tablename = "missions";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tablename, (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('description').notNullable();
        table.enu('difficulty', difficultyKeys).notNullable();
        table.integer('xp').defaultTo(0).notNullable();
        table.integer('sp').defaultTo(0).notNullable();
        table.decimal('money', 10, 2).defaultTo(0).notNullable();
    });
}

export async function down(knex: Knex) {
    await knex.schema.dropTable(tablename);
}