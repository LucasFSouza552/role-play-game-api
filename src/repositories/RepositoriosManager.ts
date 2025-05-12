import { ChampionRepository } from "../repositories/ChampionReposity";
import { ChampionRoleRepository } from "../repositories/ChampionRoleReposity";
import { SkillRepository } from "../repositories/SkillReposity";

const championRepo = new ChampionRepository();
const roleRepo = new ChampionRoleRepository();
const skillRepo = new SkillRepository();

export { championRepo, roleRepo, skillRepo };
