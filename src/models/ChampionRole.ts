import { ValueRange } from "./ValueRange";

export interface ChampionRole {
    id: number;
    name: string;
    description: string;
    HP: ValueRange;
    MP: ValueRange;
    EP: ValueRange;
}