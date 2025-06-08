import { Knex } from "knex";
import { Item } from "../../models/Item";

export async function seed(knex: Knex): Promise<void> {
  const shops = await knex('shop').select('id', 'type');
  const items = await knex('items').select('id', 'name', 'priceMin', 'priceMax', 'type');

  const rarityMultipliers: Record<string, number> = {
    Common: 1,
    Uncommon: 1.2,
    Rare: 1.5,
    Epic: 2,
    Legendary: 3,
  };

  const rarityOptions = Object.keys(rarityMultipliers);

  for (const shop of shops) {
    const randomItems = items
      .filter((item: Item) => item.type === shop.type)
      .sort(() => Math.random() - 0.5);

    for (const item of randomItems) {
      // Escolhe um rarity válido da lista
      const rarity = rarityOptions[Math.floor(Math.random() * rarityOptions.length)];
      const multiplier = rarityMultipliers[rarity];

      const priceMin = item.priceMin;
      const priceMax = item.priceMax;

      const maxBasePrice = Math.floor(priceMax / multiplier);

      // Garante que o basePrice fique entre priceMin e maxBasePrice
      const safeMin = Math.min(priceMin, maxBasePrice);
      const safeMax = Math.max(priceMin, maxBasePrice);

      const basePrice = Math.floor(Math.random() * (safeMax - safeMin + 1)) + safeMin;
      const price = Math.round(basePrice * multiplier);

      const quantity = Math.floor(Math.random() * 10) + 1;

      const inventory = await knex('shop_inventory').where({ ownerId: shop.id }).first();
      if (!inventory) continue;

      await knex('shop_items').insert({
        inventoryId: inventory.id,
        itemId: item.id,
        price,
        quantity,
        rarity
      });
    }
  }
}
