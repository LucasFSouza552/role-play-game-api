import { Knex } from "knex";

/**
 * Seed para criar inventários e popular com itens usando Knex.
 */
export async function seed(knex: Knex): Promise<void> {
    // Busca todos os campeões
    const champions = await knex("champions").select("id");

    // Busca alguns itens para popular os inventários
    const items = await knex("items").select("id").limit(5);

    // Cria inventários para cada campeão
    for (const champion of champions) {
        // Cria o inventário
        const [inventoryId] = await knex("inventories")
            .insert({
                ownerId: champion.id,
                ownerType: "champion",
                capacity: 20,
                money: Math.floor(Math.random() * 100) + 50,
                lastUpdated: new Date(),
            })
            .returning("id");

        // Adiciona alguns itens ao inventário (tabela intermediária: inventory_items)
        for (const item of items) {
            await knex("inventory_items").insert({
                inventoryId: typeof inventoryId === "object" ? inventoryId.id : inventoryId,
                itemId: item.id,
                quantity: Math.floor(Math.random() * 3) + 1,
                acquiredAt: new Date(),
            });
        }
    }

    // Exemplo para guildas ou shops (descomente somente se existir no banco)
    /*
    const guilds = await knex("guilds").select("id");
    for (const guild of guilds) {
        await knex("inventories").insert({
            ownerId: guild.id,
            ownerType: "guild",
            capacity: 50,
            money: 500,
            lastUpdated: new Date(),
        });
    }
    */
}