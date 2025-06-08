import { Inventory } from "./Inventory";
import { ItemType } from "./enums/ItemType";

export interface Shop {
    id: number;
    name: string;
    inventory: Inventory;
    type: ItemType;
}