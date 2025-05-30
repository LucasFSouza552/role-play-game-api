import { MissionDifficult } from "./enums/MissionDifficult";

export interface Mission {
    id: number;
    title: string;
    description: string;
    difficulty: MissionDifficult;
    XP?: number;
    SP?: number; 
    money?: number;
}