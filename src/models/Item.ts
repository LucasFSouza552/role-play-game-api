import { ItemType } from './enums/ItemType';
import {ItemRarity} from './enums/ItemRarity';
import { ValueRange } from './ValueRange';

export interface Item {
    id: number;
    name: string;
    description: string;
    rarity: ItemRarity;
    level: number;
    price: ValueRange;
    type: ItemType; 
}