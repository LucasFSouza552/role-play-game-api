import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	await knex("items").insert([
		// Feitiços (Spells)
		{
			name: "Fireball",
			description: "A powerful fire spell that engulfs enemies in flames.",
			priceMin: 100,
			priceMax: 200,
			type: "Spells"
		},
		{
			name: "Ice Shard",
			description: "A chilling spell that freezes enemies in their tracks.",
			priceMin: 80,
			priceMax: 150,
			type: "Spells"
		},
		{
			name: "Lightning Bolt",
			description: "A spell that summons a bolt of lightning to strike enemies.",
			priceMin: 200,
			priceMax: 400,
			type: "Spells"
		},
		{
			name: "Healing Light",
			description: "A spell that restores health to allies.",
			priceMin: 50,
			priceMax: 100,
			type: "Spells"
		},

		// Armaduras (Armour)
		{
			name: "Steel Armour",
			description: "A strong and durable armour made of steel.",
			priceMin: 150,
			priceMax: 300,
			type: "Armour"
		},
		{
			name: "Dragon Scale Armour",
			description: "An armour crafted from the scales of a dragon, offering unmatched protection.",
			priceMin: 1000,
			priceMax: 2000,
			type: "Armour"
		},
		{
			name: "Leather Armour",
			description: "A lightweight armour made of leather, ideal for agility.",
			priceMin: 50,
			priceMax: 100,
			type: "Armour"
		},
		{
			name: "Mage Robes",
			description: "Robes enchanted to enhance magical abilities.",
			priceMin: 200,
			priceMax: 400,
			type: "Armour"
		},

		// Armas (Weapons)
		{
			name: "Iron Sword",
			description: "A basic sword forged from iron.",
			priceMin: 50,
			priceMax: 100,
			type: "Weapons"
		},
		{
			name: "Elven Bow",
			description: "A finely crafted bow made by elves, known for its precision.",
			priceMin: 300,
			priceMax: 600,
			type: "Weapons"
		},
		{
			name: "War Hammer",
			description: "A massive hammer capable of crushing enemies with ease.",
			priceMin: 500,
			priceMax: 1000,
			type: "Weapons"
		},
		{ 

			name: "Dagger of Shadows",
			description: "A dagger imbued with dark magic, perfect for assassins.",
			priceMin: 150,
			priceMax: 300,
			type: "Weapons"
		},

		// Poções (Potions)
		{
			name: "Healing Potion",
			description: "A potion that restores health over time.",
			priceMin: 10,
			priceMax: 20,
			type: "Potions"
		},
		{
			name: "Mana Potion",
			description: "A potion that restores magical energy.",
			priceMin: 15,
			priceMax: 30,
			type: "Potions"
		},
		{
			name: "Elixir of Strength",
			description: "A potion that temporarily increases strength.",
			priceMin: 100,
			priceMax: 200,
			type: "Potions"
		},
		{
			name: "Invisibility Potion",
			description: "A potion that grants temporary invisibility.",
			priceMin: 300,
			priceMax: 600,
			type: "Potions"
		},
		{
			name: "Antidote",
			description: "A potion that cures poison.",
			priceMin: 20,
			priceMax: 40,
			type: "Potions"
		}
	]);
}

