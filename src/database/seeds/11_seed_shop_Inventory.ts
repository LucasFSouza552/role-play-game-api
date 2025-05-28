import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	const champions = await knex('champions').select('id');

	const inventories = champions.map((champion) => ({
		capacity: 5,
		shopId: champion.id
	}));

	await knex('shop_inventory').insert(inventories);
}
