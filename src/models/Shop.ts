import { ItemType } from "./enums/ItemType";

export interface Shop {
    id: number;
    ownerId: number;
    name: string;
    inventory: [];
    type: ItemType;
}