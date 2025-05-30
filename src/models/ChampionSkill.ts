import { skillTarget } from "./types/SkillTarget";

export interface ChampionSkill {
    id: number;
    name: string;
    description: string;
    MP: number; // Custo de Mana 
    EP: number; // Custo de Energia
    power: number; // Poder do ataque
    target: skillTarget;
}