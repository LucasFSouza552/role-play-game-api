import db from "../database/db";
import { Champion } from "../models/Champion";
import { Filters } from "../models/Filters";
import getMaxExperience from "../utils/getMaxExperience";


export class ChampionRepository {
	private tableName = 'champions';
	async findAll(filter: Filters): Promise<Champion[]> {
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
			}).orderBy('champions.name', 'asc');

		allChampions.map((champion: any) => {
			champion.xp_max = getMaxExperience(champion.level);
		});
		return allChampions;
	}

	async findById(id: string, userId: string): Promise<Champion> {
		const champion = await db(this.tableName).where({ id }).where({ userId }).first().orderBy('champions.name', 'asc');
		const championSkills = await db('champion_skills').where({ championId: id });
		const skills = await db('skills').whereIn('id', championSkills.map((cs: any) => cs.skillId));
		const role = await db('champion_roles').where({ id: champion.roleId }).first();
		champion.xp_max = getMaxExperience(champion.level);
		champion.role = role;
		champion.skills = skills;
		return champion;
	}

	async create(champion: Champion): Promise<Champion> {

		const newChampion = db(this.tableName).insert(champion).returning('*').then((newChampion: Champion[]) => newChampion[0]).catch((error) => {
			throw new Error('Erro ao criar campeãoo');
		});
		
		return newChampion;
	}

	async update(id: string, champion: Champion) {
		try {
			const updatedChampion = await db(this.tableName).where({ id }).update(champion);
			return updatedChampion;
		} catch (error) {
			throw new Error('Erro ao atualizar campeão');
		}
	}

	async delete(id: string) {
		try {
			const deletedChampion = await db(this.tableName).where({ id }).del();
			return deletedChampion;
		} catch (error) {
			throw new Error('Erro ao deletar campeão');
		}
	}

	async addSkill(championId: string, skillId: number) {
		const newChampionSkill = await db('champion_skills').insert({ championId, skillId }).returning('*');
		return newChampionSkill;
	}

	async getSkills(championId: string) {
		try {
			const championSkills = await db('champion_skills').where({ championId }).returning('*');
			return championSkills;
		} catch (error) {
			throw new Error('Erro ao obter habilidades do campeão');
		}
	}

}
