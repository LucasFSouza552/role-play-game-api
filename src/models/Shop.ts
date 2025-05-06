import { ItemsType } from "./ItemsType";

export interface Shop {
    name: string;
    inventory: [];
    type: ItemsType;
    owner: string;
}