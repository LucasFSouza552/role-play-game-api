import { ChampionSkill } from "../models/ChampionSkill";

export type updateSkillDTO = Pick<ChampionSkill, 'name' | 'description' | 'MP' | 'EP' | 'power'> & Required<Pick<ChampionSkill, 'id'>>;
export type createSkillDTO = Pick<ChampionSkill, 'name' | 'description' | 'MP' | 'EP' | 'power'>;