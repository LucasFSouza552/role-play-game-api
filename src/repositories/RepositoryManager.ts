import { ChampionRepository } from "./ChampionRepository";
import { ChampionRoleRepository } from "./ChampionRoleRepository";
import { SkillRepository } from "./SkillRepository";
import { UserRepository } from "./UserRepository";
import { MissionRepository } from "./MissionRepository";
import { ItemRepository } from "./ItemRepository";
import { GuildRepository } from "./GuildRepository";

const championRepo = new ChampionRepository();
const roleRepo = new ChampionRoleRepository();
const skillRepo = new SkillRepository();
const userRepo = new UserRepository();
const missionRepo = new MissionRepository();
const itemsRepo = new ItemRepository();
const guildRepo = new GuildRepository();

export {
  championRepo,
  roleRepo,
  skillRepo,
  userRepo,
  missionRepo,
  itemsRepo,
  guildRepo,
};
