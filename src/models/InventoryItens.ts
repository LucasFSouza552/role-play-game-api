import { ItemRarity } from "./enums/ItemRarity";

export interface InventoryItens {
        id: number;
        ownerId: number; // Referência ao ChampionId ou ShopId
        quantity: number;
        price: number;
        rarity: ItemRarity;
        itemId: number;
}