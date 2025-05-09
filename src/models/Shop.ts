import { ItemType } from "./enums/ItemType";

export interface Shop {
    id: number;
    name: string;
    inventory: [];
    type: ItemType;
    owner: string;
}