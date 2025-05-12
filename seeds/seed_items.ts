import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("items").del();

    await knex("items").insert([
        // Feitiços (Spells)
        {
            name: "Fireball",
            description: "A powerful fire spell that engulfs enemies in flames.",
            rarity: "Rare",
            level: 5,
            priceMin: 100.00,
            priceMax: 200.00,
            type: "Spells"
        },
        {
            name: "Ice Shard",
            description: "A chilling spell that freezes enemies in their tracks.",
            rarity: "Uncommon",
            level: 3,
            priceMin: 80.00,
            priceMax: 150.00,
            type: "Spells"
        },
        {
            name: "Lightning Bolt",
            description: "A spell that summons a bolt of lightning to strike enemies.",
            rarity: "Epic",
            level: 7,
            priceMin: 200.00,
            priceMax: 400.00,
            type: "Spells"
        },
        {
            name: "Healing Light",
            description: "A spell that restores health to allies.",
            rarity: "Common",
            level: 2,
            priceMin: 50.00,
            priceMax: 100.00,
            type: "Spells"
        },

        // Armaduras (Armour)
        {
            name: "Steel Armour",
            description: "A strong and durable armour made of steel.",
            rarity: "Uncommon",
            level: 3,
            priceMin: 150.00,
            priceMax: 300.00,
            type: "Armour"
        },
        {
            name: "Dragon Scale Armour",
            description: "An armour crafted from the scales of a dragon, offering unmatched protection.",
            rarity: "Legendary",
            level: 10,
            priceMin: 1000.00,
            priceMax: 2000.00,
            type: "Armour"
        },
        {
            name: "Leather Armour",
            description: "A lightweight armour made of leather, ideal for agility.",
            rarity: "Common",
            level: 1,
            priceMin: 50.00,
            priceMax: 100.00,
            type: "Armour"
        },
        {
            name: "Mage Robes",
            description: "Robes enchanted to enhance magical abilities.",
            rarity: "Rare",
            level: 4,
            priceMin: 200.00,
            priceMax: 400.00,
            type: "Armour"
        },

        // Armas (Weapons)
        {
            name: "Iron Sword",
            description: "A basic sword forged from iron.",
            rarity: "Common",
            level: 1,
            priceMin: 50.00,
            priceMax: 100.00,
            type: "Weapons"
        },
        {
            name: "Elven Bow",
            description: "A finely crafted bow made by elves, known for its precision.",
            rarity: "Rare",
            level: 5,
            priceMin: 300.00,
            priceMax: 600.00,
            type: "Weapons"
        },
        {
            name: "War Hammer",
            description: "A massive hammer capable of crushing enemies with ease.",
            rarity: "Epic",
            level: 8,
            priceMin: 500.00,
            priceMax: 1000.00,
            type: "Weapons"
        },
        {
            name: "Dagger of Shadows",
            description: "A dagger imbued with dark magic, perfect for assassins.",
            rarity: "Uncommon",
            level: 3,
            priceMin: 150.00,
            priceMax: 300.00,
            type: "Weapons"
        },

        // Poções (Potions)
        {
            name: "Healing Potion",
            description: "A potion that restores health over time.",
            rarity: "Common",
            level: 1,
            priceMin: 10.00,
            priceMax: 20.00,
            type: "Potions"
        },
        {
            name: "Mana Potion",
            description: "A potion that restores magical energy.",
            rarity: "Common",
            level: 1,
            priceMin: 15.00,
            priceMax: 30.00,
            type: "Potions"
        },
        {
            name: "Elixir of Strength",
            description: "A potion that temporarily increases strength.",
            rarity: "Rare",
            level: 4,
            priceMin: 100.00,
            priceMax: 200.00,
            type: "Potions"
        },
        {
            name: "Invisibility Potion",
            description: "A potion that grants temporary invisibility.",
            rarity: "Epic",
            level: 6,
            priceMin: 300.00,
            priceMax: 600.00,
            type: "Potions"
        },
        {
            name: "Antidote",
            description: "A potion that cures poison.",
            rarity: "Common",
            level: 1,
            priceMin: 20.00,
            priceMax: 40.00,
            type: "Potions"
        }
    ]);
}
