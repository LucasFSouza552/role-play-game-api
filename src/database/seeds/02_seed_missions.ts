import { Knex } from "knex";
import { MissionDifficult } from "../../models/enums/MissionDifficult";
import { MissionStatus } from "../../models/enums/MissionStatus";

export async function seed(knex: Knex): Promise<void> {
  await knex('missions').insert([
    {
      id: 1,
      title: "Defeat the Goblin King",
      description: "Eliminate the Goblin King in the Dark Forest.",
      difficulty: MissionDifficult.HARD,
      xp: 1500,
      money: 500,
      sp: 6,
    },
    {
      id: 2,
      title: "Gather Herbs",
      description: "Collect 10 healing herbs near the river.",
      difficulty: MissionDifficult.EASY,
      xp: 200,
      money: 100,
      sp: 1,
    },
    {
      id: 3,
      title: "Rescue the Merchant",
      description: "Save the merchant captured by bandits.",
      difficulty: MissionDifficult.MEDIUM,
      xp: 800,
      money: 300,
      sp: 3,
    },
    {
      id: 4,
      title: "Enter the God Realm",
      description: "Survive a challenge from the gods themselves.",
      difficulty: MissionDifficult.GOD,
      xp: 5000,
      money: 2000,
      sp: 10,
    }
  ]);
}