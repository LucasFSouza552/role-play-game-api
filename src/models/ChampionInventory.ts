import { Item } from "./Item";

export interface ChampionInventory {
        id: number;
        championId: number;
        capacity: number;
        items?: Item[];
}