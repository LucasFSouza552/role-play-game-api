import { ChampionRole } from "../models/ChampionRole";

export type championRoleDTO = Omit<ChampionRole, 'id'>;
export type createChampionRoleDTO = Pick<ChampionRole, 'name' | 'description' | 'hp' | 'mp' | 'ep'>;
export type updateChampionRoleDTO = Required<Pick<ChampionRole, 'id'>>  & Partial<Pick<ChampionRole, 'name' | 'description' | 'hp' | 'mp' | 'ep'>>;