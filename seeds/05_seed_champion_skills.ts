import { Knex } from "knex";
import db from "../src/database/db";

export async function seed(knex: Knex): Promise<void> {
	const champions = await db("champions").select("id").orderBy("name");
	const skills = await db("skills").select("id").orderBy("id");

	const championIds = champions.map((c: any) => c.id);
	const skillIds = skills.map((s: any) => s.id);

	const ids = championIds.map((champion, index) =>
		{
			return {
				id: index+1,
					championId: champion,
				skillId: skillIds[Math.floor(Math.random() * skillIds.length)]
			}
		}
	);


	console.log(ids);

	await knex("champion_skills").insert(ids);
}
