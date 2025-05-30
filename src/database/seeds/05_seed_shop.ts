import { Knex } from "knex";
import { ItemType } from "../../models/enums/ItemType";

export async function seed(knex: Knex): Promise<void> {
	await knex('shop').insert([
		{
		  name: 'Arcanaeum Mystica',
		  itemType: ItemType.SPELLS,
		},
		{
		  name: 'Forja do Titã',
		  itemType: ItemType.ARMOUR,
		},
		{
		  name: 'Lâmina e Glória',
		  itemType: ItemType.WEAPONS,
		},
		{
		  name: 'O Caldeirão Fumegante',
		  itemType: ItemType.POTIONS,
		},
	  ]);
}
