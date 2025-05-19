import { Knex } from "knex";
import db from "../db";

export async function seed(knex: Knex): Promise<void> {
	const champions = await db("champions").select("id").orderBy("name");
	const skills = await db("skills").select("id").orderBy("id");

	const ids = champions.map((champion, index) => ({
		championId: champion.id,
		skillId: skills[Math.floor(Math.random() * skills.length)].id
	}));

	await knex("champion_skills").insert(ids);
}
