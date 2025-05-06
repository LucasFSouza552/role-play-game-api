import { ShopType } from "./ShopType";

export interface Shop {
    name: string;
    inventory: [];
    type: ShopType;
    owner: string;
}