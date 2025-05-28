import { Item } from "./Item";
export interface InventoryItens {
        id: number;
        ownerId: number; // Referência ao ChampionId ou ShopId
        quantity: number;
        item: Item;
}