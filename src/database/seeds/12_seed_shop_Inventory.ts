import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	const shop = await knex('shop').select('id');

	const inventories = shop.map((shop) => ({
		capacity: 10,
		ownerId: shop.id
	}));

	await knex('shop_inventory').insert(inventories);
}
