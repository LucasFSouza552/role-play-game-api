import { ValueRange } from "./ValueRange";

export interface ChampionRole {
    name: string;
    HP: ValueRange;
    MP: ValueRange;
    EP: ValueRange;
}