import { ChampionStatus } from "./ChampionStatus";
import { ChampionRole } from "./ChampionRole";
import { ChampionSkill } from "./ChampionSkill";

export interface Champion {
    name: string;
    money: number;
    status: ChampionStatus;
    role: ChampionRole;
    missions: [];
    inventory: [];
    guildId: number;
    skills: ChampionSkill[];
}