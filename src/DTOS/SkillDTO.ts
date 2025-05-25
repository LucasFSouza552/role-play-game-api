import { ChampionSkill } from "../models/ChampionSkill";

export type UpdateSkillDTO = Pick<ChampionSkill, 'name' | 'description' | 'MP' | 'EP' | 'power'> & Required<Pick<ChampionSkill, 'id'>>;
export type CreateSkillDTO = Pick<ChampionSkill, 'name' | 'description' | 'MP' | 'EP' | 'power'>;