import { ChampionRepository } from "./ChampionRepository";
import { ChampionRoleRepository } from "./ChampionRoleRepository";
import { SkillRepository } from "./SkillRepository";
import { UserRepository } from "./UserRepository";
import { MissionRepository } from "./MissionRepository";
import { ItemRepository } from "./ItemRepository";
import { GuildRepository } from "./GuildRepository";
import { ChampionInventoryRepository } from "./ChampionInventoryRepository";
import { ShopInventoryRepository } from "./ShopInventoryRepository";
import { ShopRepository } from "./ShopRepository";

const championRepo = new ChampionRepository();
const roleRepo = new ChampionRoleRepository();
const skillRepo = new SkillRepository();
const userRepo = new UserRepository();
const missionRepo = new MissionRepository();
const itemsRepo = new ItemRepository();
const guildRepo = new GuildRepository();
const championInventoryRepo = new ChampionInventoryRepository();
const shopRepo = new ShopRepository();
const shopInventoryRepo = new ShopInventoryRepository();

export {
	championRepo,
	roleRepo,
	skillRepo,
	userRepo,
	missionRepo,
	itemsRepo,
	guildRepo,
	championInventoryRepo,
	shopRepo,
	shopInventoryRepo
};
