export interface InventoryItens {
        id: number;
        ownerId: number; // Referência ao ChampionId ou ShopId
        quantity: number;
        price: number;
        itemId: number;
}