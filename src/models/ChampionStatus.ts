import { ValueRange } from "./ValueRange";

export interface ChampionStatus {
    strength: number;
    dexterity: number;
    intelligence: number;
    vitality: number;
    XP: ValueRange;
    Level: number;
}