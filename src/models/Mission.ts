import { MissionDifficult } from "./enums/MissionDifficult";

export interface Mission {
    id: number;
    title: string;
    description: string;
    difficulty: MissionDifficult;
    created_at: Date;
    timeLimit: number;
    XP?: number;
    SP?: number; 
    money?: number;
}