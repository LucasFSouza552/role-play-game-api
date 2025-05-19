import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("items", (table) => {
        table.increments("id").primary(); // ID único
        table.string("name").notNullable(); // Nome do item
        table.text("description").notNullable(); // Descrição do item
        table.enum("rarity", ["Common", "Uncommon", "Rare", "Epic", "Legendary"]).notNullable(); // Raridade
        table.decimal("priceMin", 10, 2).notNullable(); // Preço mínimo
        table.decimal("priceMax", 10, 2).notNullable(); // Preço máximo
        table.enum("type", ["Spells", "Armour", "Weapons", "Potions"]).notNullable(); // Tipo do item
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("items");
}

