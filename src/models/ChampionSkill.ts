import { skillTarget } from "./types/SkillTarget";

export interface ChampionSkill {
    id: number;
    name: string;
    description: string;
    power: number;
    const: number;
    target: skillTarget;
}