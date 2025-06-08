import { Knex } from "knex";
import { ItemRarity } from "../../models/enums/ItemRarity";

const tablename = 'shop_items';

export async function up(knex: Knex): Promise<void> {

	const rarityKeys = Object.values(ItemRarity);


	await knex.schema.createTable(tablename, (table) => {

		table.integer('inventoryId')
			.notNullable()
			.references('id')
			.inTable('shop')
			.onDelete('CASCADE');

		table.integer('itemId')
			.notNullable()
			.references('id')
			.inTable('items')
			.onDelete('CASCADE');

		table.enu('rarity', rarityKeys).notNullable();

		table.primary(['inventoryId', 'itemId', 'rarity']);
		
		table.integer('quantity')
			.notNullable()
			.defaultTo(1);
		table.integer('price').notNullable().defaultTo(0);

	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable(tablename);
}
