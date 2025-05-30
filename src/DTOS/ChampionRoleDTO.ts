import { ChampionRole } from "../models/ChampionRole";

export type createChampionRoleDTO = Pick<ChampionRole, 'name' | 'description' | 'hp' | 'mp' | 'ep'>;
export type updateChampionRoleDTO = Required<Pick<ChampionRole, 'id'>>  & Partial<Pick<ChampionRole, 'name' | 'description' | 'hp' | 'mp' | 'ep'>>;