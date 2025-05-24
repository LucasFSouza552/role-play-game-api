import { ItemType } from './enums/ItemType';

export interface Item {
    id: number;
    name: string;
    description: string;
    priceMax: number;
    priceMin: number;
    type: ItemType; 
}