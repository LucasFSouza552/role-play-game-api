import { MissionDifficult } from "./enums/MissionDifficult";
import { MissionStatus } from "./enums/MissionStatus";

export interface Mission {
    id: number;
    title: string;
    description: string;
    difficulty: MissionDifficult;
    targetDate: Date;
    status: MissionStatus;
    XP?: number;
    SP?: number; 
    money?: number;
}