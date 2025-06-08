import { MissionDifficult } from "./enums/MissionDifficult";

export interface Mission {
    id: number;
    title: string;
    description: string;
    difficulty: MissionDifficult;
    xp?: number;
    sp?: number; 
    money?: number;
}