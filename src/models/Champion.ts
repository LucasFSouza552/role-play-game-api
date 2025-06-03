import { ChampionRole } from "./ChampionRole";
import { ChampionSkill } from "./ChampionSkill";
import { Inventory } from "./Inventory";
import { Mission } from "./Mission";

export interface Champion {
	id: number;
	userId: number;
	name: string;
	money?: number | 0;
	strength: number;
	dexterity: number;
	intelligence: number;
	vitality: number;
	hp: number; // Pontos de Vida
	mp: number; // Pontos de Magia
	ep: number; // Pontos de Energia
	sp: number; // Pontos de Status
	xp: number; // Pontos de Experiência
	xp_max?: number; // Pontos de Experiência Máxima
	level: number;
	roleId: number;
	role?: ChampionRole;
	missions?: Mission[];
	inventory?: Inventory;
	guildId?: number | null;
	skills?: ChampionSkill[];
}