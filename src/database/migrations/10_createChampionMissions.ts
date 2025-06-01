import { Knex } from "knex";
import { MissionStatus } from "../../models/enums/MissionStatus";

const tablename = "champions_missions";

const missionStatus = Object.values(MissionStatus);

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(tablename, (table) => {
		table.integer("championId").notNullable();
		table.integer("missionId").notNullable();
		table.enu("status", missionStatus).notNullable()
		.defaultTo(MissionStatus.AWAITING);

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
