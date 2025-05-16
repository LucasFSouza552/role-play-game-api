import { ChampionRepository } from "../repositories/ChampionReposity";
import { ChampionRoleRepository } from "../repositories/ChampionRoleReposity";
import { SkillRepository } from "../repositories/SkillReposity";
import { UserRepository } from "../repositories/UserRepository";
import { MissionRepository } from "./MissionRepository";

const championRepo = new ChampionRepository();
const roleRepo = new ChampionRoleRepository();
const skillRepo = new SkillRepository();
const userRepo = new UserRepository();
const missionRepo = new MissionRepository();

export { championRepo, roleRepo, skillRepo, userRepo, missionRepo };
