import { InventoryItens } from "./InventoryItens";

export interface Inventory {
    id: number; 
    ownerId: number; // Referência a ShopId ou ChampionId
    capacity?: number;
    itens?: InventoryItens[];
}