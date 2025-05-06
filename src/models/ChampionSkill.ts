import { skillTarget } from "./SkillTarget";

export interface ChampionSkill {
    name: string;
    description: string;
    power: number;
    const: number;
    target: skillTarget;
}