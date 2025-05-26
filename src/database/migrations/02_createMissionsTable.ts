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
        table.integer('xp');
        table.integer('sp');
        table.decimal('money');
        table.integer('timeLimit').defaultTo(1); // in minutes
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
    await knex.schema.dropTable(tablename);
}