import { Knex } from "knex";
import { MissionDifficult } from "../src/models/enums/MissionDifficult";
import { MissionStatus } from "../src/models/enums/MissionStatus";

const difficultyKeys = Object.values(MissionDifficult);
const missionStatus = Object.values(MissionStatus)

const tablename = "missions";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tablename, (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('description').notNullable();
        table.enu('difficulty', difficultyKeys).notNullable();
        table.enu('status', missionStatus).notNullable();
        table.date('targetDate').notNullable();
        table.integer('xp');
        table.decimal('money');
    })
}

export async function down(knex: Knex) {
    await knex.schema.dropTable(tablename);
}