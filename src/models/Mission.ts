import { MissionDifficult } from "./MissionDifficult";

export interface Mission {
    id: number;
    title: string;
    description: string;
    difficulty: MissionDifficult;
    targetDate: Date;
    XP?: number;
    money?: number;
}