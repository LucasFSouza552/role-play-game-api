import { ChampionMapper } from './../utils/mapppers/championMapping';
import { FilterChampion } from "../models/Filters";
import { ChampionRole } from "../models/ChampionRole";
import { championRepo, roleRepo, skillRepo, championInventoryRepo } from "../repositories/RepositoryManager";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { ChampionDTO, createChampionDTO, updateChampionDTO, updateChampionGuildDTO, updatedChampionStatusDTO } from "../DTOS/ChampionDTO";

export class ChampionService implements ServiceInterface<createChampionDTO, updateChampionDTO, ChampionDTO> {

	async getAll(filter: FilterChampion): Promise<ChampionDTO[]> {
		try {
			return await championRepo.getAll(filter);
		} catch (error) {
			throw new Error('Error fetching champions: ' + error);
		}
	}

	async getById(id: number, userId: number): Promise<ChampionDTO> {
		try {
			const champion = await championRepo.getById(id, userId);
			return champion;
		} catch (error) {
			throw new Error('Champion not found');
		}
	}

	async create(champion: createChampionDTO): Promise<ChampionDTO> {

		try {
			const roleId = champion.roleId;
			const roleExists: ChampionRole = await roleRepo.getById(roleId);

			if (!roleExists) {
				throw new Error('Role not found');
			}

			const newChampion: createChampionDTO = ChampionMapper.mapChampionToDTO({
				name: champion.name,
				userId: champion.userId,
				roleId: roleExists.id,
				hp: roleExists.hp,
				ep: roleExists.ep,
				mp: roleExists.mp
			});

			const createdChampion = await championRepo.create(newChampion);
			if (!createdChampion) {
				throw new Error('Champion not created');
			}

			const RetrievedChampion = await championRepo.getById(createdChampion.id, champion.userId);
			return RetrievedChampion;
		} catch (error) {
			throw new Error('Champion not created');
		}
	}

	async update(champion: updateChampionDTO): Promise<ChampionDTO> {
		try {
			return await championRepo.update(champion);
		} catch (error) {
			throw new Error('Champion not updated');
		}
	}

	async updateChampionStatus(champion: updatedChampionStatusDTO) {
		return await championRepo.updateStatus(champion);
	}

	async updateChampionGuild(champion: updateChampionGuildDTO) {
		return await championRepo.updateGuild(champion);
	}

	async delete(championId: number, userId: number): Promise<boolean> {
		try {
			const deletedChampion = await championRepo.delete(championId, userId);
			return deletedChampion;
		} catch (error) {
			throw new Error('Champion not deleted');
		}
	}

	async addSkill(championId: number, skillId: number) {
		try {
			await championRepo.addSkill(championId, skillId);
			const skill = await skillRepo.getById(skillId);
			return skill;
		} catch (error) {
			console.error(error);
			throw new Error('Error adding skill to champion');
		}
	}

	async getSkills(ChampionId: number) {
		try {
			return await championRepo.getSkills(ChampionId);
		} catch (error) {
			throw new Error('Error getting champion skills');
		}
	}

	async getSkillById(skillId: number) {
		try {
			return await skillRepo.getById(skillId);
		} catch (error) {
			throw new Error('Error getting skill by id');
		}
	}

	async getInventory(championId: number, userId: number) {
		try {
			return await championInventoryRepo.getById(championId, userId);
		} catch (error) {
			throw new Error('Error getting inventory');
		}
	}

}
