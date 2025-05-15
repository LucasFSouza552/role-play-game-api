import db from "../database/db";
import { Champion } from "../models/Champion";
import { Filters } from "../models/Filters";
import getMaxExperience from "../utils/getMaxExperience";

export class ChampionRepository {
	private tableName = 'champions';
	async findAll(filter: Filters) {
		const allChampions = await db(this.tableName).select('*')
			.limit(filter.size)
			.offset(filter.offset)
			.where({ userId: filter.userId })
			.modify((query) => {
				if (filter.name) {
				query.whereILike('champions.name', `%${filter.name}%`);
				}
				if(filter.role) {
					query.where('champions.roleId', filter.role);
				}
				if(filter.level) {
					query.where('champions.level', filter.level);
				}
			}).orderBy('champions.name', 'asc');

		allChampions.map((champion: any) => {
			champion.xp_max = getMaxExperience(champion.level);
		});
		return allChampions;
	}

	async findById(id: string, userId: string) {
		const champion = await db(this.tableName).where({ id }).where({ userId }).first().orderBy('champions.name', 'asc');
		const championSkills = await db('champion_skills').where({ championId: id });
		const skills = await db('skills').whereIn('id', championSkills.map((cs: any) => cs.skillId));
		const role = await db('champion_roles').where({ id: champion.roleId }).first();
		champion.xp_max = getMaxExperience(champion.level);
		champion.role = role;
		champion.skills = skills;
		return champion;
	}

	async create(champion: Champion) {
		try {
			const newChampion = await db(this.tableName).insert(champion).returning('*');
			return newChampion;
		} catch (error) {
			throw new Error('Erro ao criar campeão');
		}
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

}
