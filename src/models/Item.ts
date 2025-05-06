import { ItemType } from './ItemType';
import {ItemRarity} from './ItemRarity';

export interface Item {
    id: number;
    name: string;
    description: string;
    rarity: ItemRarity;
    level: number;
    priceMin: number;
    priceMax: number;
    type: ItemType; 
}
