import { Champion } from "../models/Champion";
import { Filters } from "../models/Filters";
import { ChampionRole } from "../models/ChampionRole";
import { championRepo, roleRepo } from "../repositories/RepositoriosManager";

export class ChampionService {
	async getAllChampions(filter: Filters) {
		return await championRepo.findAll(filter);
	}

	async getChampionById(id: string, userId: number): Promise<Champion> {
		return await championRepo.findById(id, userId);
	}

	async createChampion(champion: any) {

		const roleName = champion.roleName;
		const roleExists: ChampionRole = await roleRepo.findByName(roleName);

		if (!roleExists) {
			return { error: 'Role not found' };
		}

		const newChampion: Omit<Champion, 'id'> = {
			name: champion.name,
			userId: champion.userId,
			roleId: roleExists.id,
			hp: roleExists.hp,
			xp: 0,
			sp: 15,
			level: 1
		}

		return await championRepo.create(newChampion);
	}

	async updateChampion(id: string, champion: any) {
		return await championRepo.update(id, champion);
	}

	async deleteChampion(id: string) {
		return await championRepo.delete(id);
	}

	async addSkill(championId: string, skillId: number) {
		return await championRepo.addSkill(championId, skillId);
	}

	async getSkills(ChampionId: string) {
		return await championRepo.getSkills(ChampionId);
	}

}
