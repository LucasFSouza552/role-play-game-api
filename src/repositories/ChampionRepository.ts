import db from "../database/db";
import { ChampionDTO, updatedChampionStatusDTO, updateChampionGuildDTO, createChampionDTO, updateChampionDTO } from "../DTOS/ChampionDTO";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { Champion } from "../models/Champion";
import { FilterChampion } from "../models/Filters";
import getMaxExperience from "../utils/getMaxExperience";

export class ChampionRepository implements RepositoryInterface<createChampionDTO, updateChampionDTO, ChampionDTO> {
	private tableName = 'champions';
	async getAll(filter: FilterChampion): Promise<Champion[]> {
		const allChampions = await db(this.tableName).select('*')
			.limit(filter.size)
			.offset(filter.offset)
			.where({ userId: filter.userId })
			.modify((query) => {
				if (filter.name) {
					query.whereILike('champions.name', `%${filter.name}%`);
				}
				if (filter.role) {
					query.where('champions.roleId', filter.role);
				}
				if (filter.level) {
					query.where('champions.level', filter.level);
				}
			}).orderBy(filter.orderBy, filter.order);

		allChampions.map((champion: any) => {
			champion.xp_max = getMaxExperience(champion.level);
		});
		return allChampions;
	}

	async getById(championId: number, userId: number): Promise<ChampionDTO> {
		const champion = await db(this.tableName).where({ id:championId, userId }).first();
		const championSkills = await db('champion_skills').where({ championId });
		const skills = await db('skills').whereIn('id', championSkills.map((cs: any) => cs.skillId));
		const role = await db('champion_roles').where({ id: champion.roleId }).first();
		champion.xp_max = getMaxExperience(champion.level);
		champion.role = role;
		champion.skills = skills;
		console.log(champion);
		return champion;
	}

	async create(champion: createChampionDTO): Promise<ChampionDTO> {
		try {
			const newChampion = await db(this.tableName).insert(champion).returning('*');
			return newChampion[0];
		} catch (error) {
			throw new Error('Erro ao criar campeão');
		}
	}

	async update(champion: updateChampionDTO): Promise<ChampionDTO> {
		try {
			const updatedChampion = await db(this.tableName)
				.where({ id:champion.id, userId: champion.userId })
				.update(champion).returning('*');
			return updatedChampion[0];
		} catch (error) {
			throw new Error('Erro ao atualizar campeão');
		}
	}

	async delete(userId: number, championId: number): Promise<boolean> {
		try {
			await db(this.tableName).where({ id: championId, userId }).del();
			return true;
		} catch (error) {
			throw new Error('Erro ao deletar campeão');
		}
	}

	async addSkill(championId: number, skillId: number) {
		try {
			const newChampionSkill = await db('champion_skills').insert({ championId, skillId }).returning('*');
			console.log(newChampionSkill);
			return newChampionSkill;
		} catch (error) {
			throw new Error('Erro ao adicionar habilidade ao campeão');
		}
	}

	async getSkills(championId: number) {
		try {
			const championSkills = await db('champion_skills')
				.where({ championId })
				.join('skills', 'skills.id', '=', 'champion_skills.skillId')
				.select('name', 'description', 'power', 'cost', 'target');
			return championSkills;
		} catch (error) {
			throw new Error('Erro ao buscar habilidades do campeão');
		}
	}

	async updateGuild(Champion: updateChampionGuildDTO) {
		try {
			const updatedChampion = await db(this.tableName)
			.where({ id: Champion.id, userId: Champion.userId })
			.update({ guildId: Champion.guildId });
			return updatedChampion;
		} catch (error) {
			throw new Error('Erro ao atualizar guild do campeão');
		}
	}

	async updateStatus(champion: updatedChampionStatusDTO) {
		try {
			const updatedChampion = await db(this.tableName)
			.where({ id: champion.id, userId: champion.userId })
			.update({
				strength: champion.strength,
				dexterity: champion.dexterity,
				intelligence: champion.intelligence,
				vitality: champion.vitality,
				sp: champion.sp
			});
			return updatedChampion;
		} catch (error) {
			throw new Error('Erro ao atualizar status do campeão');
		}
	}

}
