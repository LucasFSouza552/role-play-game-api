import { Champion } from "../models/Champion";


export type ChampionDTO = Omit<Champion, 'roleId'| 'Missions'>;

export type createChampionDTO = Pick<Champion, 'name' | 'userId' | 'roleId' | 'hp' | 'mp' | 'ep'>;

export type updatedChampionStatusDTO =
	Required<Pick<Champion, 'id' | 'userId'>> &
	Partial<Pick<Champion, 'sp'|'strength' | 'dexterity' | 'intelligence' | 'vitality'>>;

export type updateChampionStatusDTO = Required<Pick<Champion, 'id' | 'userId'>> & Partial<Pick<Champion, 'sp'| 'strength' | 'dexterity' | 'intelligence' | 'vitality'>>;

export type updateChampionDTO = Required<Pick<Champion, 'id' | 'userId'>> & Partial<Pick<Champion, 'name' | 'guildId'>>;
