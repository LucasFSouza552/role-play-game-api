import { Item } from "./Item";

export interface ShopInventory {
        id: number;
        shopId: number;
        capacity: number;
        items?: Item[];
}