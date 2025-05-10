import { Knex } from "knex";
import { MissionDifficult } from "../src/models/enums/MissionDifficult";

export async function seed(knex: Knex): Promise<void> {
    await knex('missions').insert([
        {
            id: 1,
            title: "Defeat the Goblin King",
            description: "Eliminate the Goblin King in the Dark Forest.",
            difficulty: MissionDifficult.HARD,
            targetDate: new Date("2025-06-15"),
            xp: 1500,
            money: 500,
          },
          {
            id: 2,
            title: "Gather Herbs",
            description: "Collect 10 healing herbs near the river.",
            difficulty: MissionDifficult.EASY,
            targetDate: new Date("2025-06-10"),
            xp: 200,
            money: 100,
          },
          {
            id: 3,
            title: "Rescue the Merchant",
            description: "Save the merchant captured by bandits.",
            difficulty: MissionDifficult.MEDIUM,
            targetDate: new Date("2025-06-12"),
            xp: 800,
            money: 300,
          },
          {
            id: 4,
            title: "Enter the God Realm",
            description: "Survive a challenge from the gods themselves.",
            difficulty: MissionDifficult.GOD,
            targetDate: new Date("2025-07-01"),
            xp: 5000,
            money: 2000,
          }
    ]);
}