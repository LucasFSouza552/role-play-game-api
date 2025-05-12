import { ItemType } from './enums/ItemType';
import {ItemRarity} from './enums/ItemRarity';

export interface Item {
    id: number;
    name: string;
    description: string;
    rarity: ItemRarity;
    level: number;
    priceMax: number;
    priceMin: number;
    type: ItemType; 
}