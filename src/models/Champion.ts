import { ChampionRole } from "./ChampionRole";
import { ChampionSkill } from "./ChampionSkill";
import { Mission } from "./Mission";

export interface Champion {
	id: number;
	userId: number;
	name: string;
	money?: number | 0;
	strength?: number;
	dexterity?: number;
	intelligence?: number;
	vitality?: number;
	hp: number;
	mp: number;
	ep: number;
	sp: number; 
	xp: number;
	xp_max?: number;
	level: number;
	roleId: number;
	role?: ChampionRole;
	missions?: Mission[];
	inventory?: [];
	guildId?: number;
	skills?: ChampionSkill[];
}
