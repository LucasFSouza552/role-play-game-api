import { ChampionRepository } from "./ChampionRepository";
import { ChampionRoleRepository } from "./ChampionRoleRepository";
import { SkillRepository } from "./SkillRepository";
import { UserRepository } from "./UserRepository";
import { MissionRepository } from "./MissionRepository";
import { ItemRepository } from "./ItemRepository";

const championRepo = new ChampionRepository();
const roleRepo = new ChampionRoleRepository();
const skillRepo = new SkillRepository();
const userRepo = new UserRepository();
const missionRepo = new MissionRepository();
const itemsRepo = new ItemRepository();

export { championRepo, roleRepo, skillRepo, userRepo, missionRepo, itemsRepo };
