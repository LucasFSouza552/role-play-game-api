import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	const champions = await knex('champions').select('id');

	const inventories = champions.map((champion) => ({
	  championId: champion.id,
	  capacity: 20,
	}));
  
	await knex('champion_inventory').insert(inventories);
}
