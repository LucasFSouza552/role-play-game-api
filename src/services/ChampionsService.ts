import { Champion } from "../models/Champion";
import { Filters } from "../models/Filters";
import { ChampionRole } from "../models/ChampionRole";
import { championRepo, roleRepo } from "../repositories/RepositoryManager";

export class ChampionService {
	async getAllChampions(filter: Filters) {
		return await championRepo.findAll(filter);
	}

	async getChampionById(id: number, userId: number): Promise<Champion> {
		return await championRepo.findById(id, userId);
	}

	async createChampion(champion: any): Promise<Champion | any> {

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
			ep: roleExists.ep,
			mp: roleExists.mp,
			xp: 0,
			sp: 15,
			level: 1
		}

		const createdChampion = await championRepo.create(newChampion);
		if (!createdChampion) {
			throw new Error('Champion not created');
		}

		const RetrievedChampion = await championRepo.findById(createdChampion.id, champion.userId);
		return RetrievedChampion;
	}

	async updateChampion(champion: Champion) {
		return await championRepo.update(champion);
	}

	async updateChampionStatus(champion: Pick<Champion, 'id' | 'userId' | 'strength' | 'dexterity' | 'intelligence' | 'vitality' | 'sp'>) {
		return await championRepo.updateStatus(champion);
	}

	async updateChampionGuild(champion:Pick<Champion, 'id' | 'guildId' | 'userId'>) {
		return await championRepo.updateGuild(champion);

	}

	async deleteChampion(id: number) {
		try {
			await championRepo.delete(id);
			return { message: 'Champion deleted' };
		} catch (error) {
			throw new Error('Champion not deleted');
		}
	}

	async addSkill(championId: number, skillId: number) {
		await championRepo.addSkill(championId, skillId);
		const skill = await championRepo.getSkillById(skillId);
		return skill;
	}

	async getSkills(ChampionId: number) {
		return await championRepo.getSkills(ChampionId);
	}

	async getSkillById(skillId: number) {
		return await championRepo.getSkillById(skillId);
	}

}
