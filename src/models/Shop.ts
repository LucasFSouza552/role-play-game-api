import { ItemType } from "./ItemType";

export interface Shop {
    name: string;
    inventory: [];
    type: ItemType;
    owner: string;
}