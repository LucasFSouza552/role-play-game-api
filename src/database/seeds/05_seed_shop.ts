import { Knex } from "knex";
import { ItemType } from "../../models/enums/ItemType";

export async function seed(knex: Knex): Promise<void> {
	await knex('shop').insert([
		{
		  name: 'Arcanaeum Mystica',
		  type: ItemType.SPELLS,
		},
		{
		  name: 'Forja do Titã',
		  type: ItemType.ARMOUR,
		},
		{
		  name: 'Lâmina e Glória',
		  type: ItemType.WEAPONS,
		},
		{
		  name: 'O Caldeirão Fumegante',
		  type: ItemType.POTIONS,
		},
	  ]);
}
