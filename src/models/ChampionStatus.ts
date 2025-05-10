import { ValueRange } from "./ValueRange";

export interface ChampionStatus {
    strength: number;
    dexterity: number;
    intelligence: number;
    vitality: number;
    HP: number;
    XP: ValueRange;
    SP: number;
    level: number;
}