import { Knex } from "knex";

const tablename = "champions_missions";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tablename, (table) => {
    table.integer("championId").notNullable();
    table.integer("missionId").notNullable();

    table
      .foreign("championId")
      .references("id")
      .inTable("champions")
      .onDelete("CASCADE");

    table
      .foreign("missionId")
      .references("id")
      .inTable("missions")
      .onDelete("CASCADE");

    table.unique(["championId", "missionId"]);
  });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(tablename);
}
