import { Champion } from "../models/Champion";


export type ChampionDTO = Omit<Champion, 'roleId' | 'inventory' | 'Missions'>;

export type createChampionDTO = Pick<Champion, 'name' | 'userId' | 'roleId' | 'hp' | 'mp' | 'ep'>;

export type updatedChampionStatusDTO =
	Required<Pick<Champion, 'id' | 'userId'>> &
	Partial<Pick<Champion, 'sp'|'strength' | 'dexterity' | 'intelligence' | 'vitality'>>;

export type updateChampionGuildDTO = Required<Pick<Champion, 'id' | 'guildId' | 'userId'>>;

export type updateChampionDTO = Pick<Champion, 'userId' | 'id' |'name'>;
