import { Knex } from "knex";
import db from "../db";

export async function seed(knex: Knex): Promise<void> {
    const champions = await db("champions").select("id").orderBy("name");
    const missions = await db("missions").select("id").orderBy("id");

    const ids = champions.map((champion) => ({
        championId: champion.id,
        missionId: missions[Math.floor(Math.random() * missions.length)].id
    }));

    await knex("champions_missions").insert(ids);
}
