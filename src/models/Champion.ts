import { ChampionStatus } from "./ChampionStatus";
import { ChampionRole } from "./ChampionRole";
import { ChampionSkill } from "./ChampionSkill";
import { Mission } from "./Mission";

export interface Champion {
    id: number;
    name: string;
    money: number;
    status: ChampionStatus;
    role: ChampionRole;
    missions: Mission[];
    inventory: [];
    guildId: number;
    skills: ChampionSkill[];
}