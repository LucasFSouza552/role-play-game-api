import { ItemType } from './enums/ItemType';
import {ItemRarity} from './enums/ItemRarity';

export interface Item {
    id: number;
    name: string;
    description: string;
    rarity: ItemRarity;
    priceMax: number;
    priceMin: number;
    type: ItemType; 
}