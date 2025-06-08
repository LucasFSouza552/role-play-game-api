import db from "../database/db";
import { ChampionDTO, updatedChampionStatusDTO, createChampionDTO, updateChampionDTO } from "../DTOS/ChampionDTO";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { Champion } from "../models/Champion";
import { FilterChampion } from "../models/Filters";
import getMaxExperience from "../utils/getMaxExperience";
import { ThrowsError } from "../errors/ThrowsError";

export class ChampionRepository implements RepositoryInterface<createChampionDTO, updateChampionDTO, ChampionDTO> {
	private tableName = 'champions';
	async getAll(filter: FilterChampion): Promise<Champion[]> {
		const allChampions = await db(this.tableName)
			.select('*')
			.limit(filter.limit)
			.offset((filter.page - 1) * filter.limit)
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

		if (!allChampions) {
			throw new ThrowsError("Champions not found", 404);
		}

		allChampions.map((champion: any) => {
			champion.xp_max = getMaxExperience(champion.level);
		});
		return allChampions;
	}

	async getById(championId: number, userId: number): Promise<ChampionDTO> {
		try {
			const champion = await db(this.tableName).where({ id: championId, userId: userId }).first();
			if (!champion) {
				throw new ThrowsError("Champion not found", 404);
			}
			champion.xp_max = getMaxExperience(champion.level);
			return champion;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Error while searching for champion", 500);
		}
	}

	async create(champion: createChampionDTO): Promise<ChampionDTO> {
		try {
			const newChampion = await db(this.tableName).insert(champion).returning('*');
			if (!newChampion || newChampion.length === 0) {
				throw new ThrowsError("Champion not created", 404);
			}
			return newChampion[0];
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Error while creating champion", 500);
		}
	}

	async update(champion: updateChampionDTO): Promise<ChampionDTO> {
		try {
			const updatedChampion = await db(this.tableName)
				.where({ id: champion.id, userId: champion.userId })
				.update(champion).returning('*');
			if (!updatedChampion || updatedChampion.length === 0) {
				throw new ThrowsError("Champion not updated", 404);
			}
			return updatedChampion[0];
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Error while updating champion", 500);
		}
	}

	async delete(championId: number, userId: number): Promise<boolean> {
		try {
			const deletedChampion = await db(this.tableName).where({ id: championId, userId }).del();
			if (!deletedChampion) {
				throw new ThrowsError("Champion not deleted", 404);
			}
			return deletedChampion == 1;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Error while deleting champion", 500);
		}
	}

	async addSkill(championId: number, skillId: number) {
		try {
			const newChampionSkill = await db('champion_skills').insert({ championId, skillId }).returning('*');
			if (!newChampionSkill || newChampionSkill.length === 0) {
				throw new ThrowsError("Skill not added to champion", 404);
			}
			return newChampionSkill;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Error while adding skill to champion", 500);
		}
	}

	async getSkills(championId: number) {
		try {
			const championSkills = await db('champion_skills')
				.where({ championId })
				.join('skills', 'skills.id', '=', 'champion_skills.skillId')
				.select('id', 'name', 'description', 'power', 'MP', 'EP', 'target');
			if (!championSkills) {
				throw new ThrowsError("Champion skills not found", 404);
			}
			return championSkills;
		} catch (error) {
			console.error(error);
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Error while searching for champion skills", 500);
		}
	}

	async updateGuild(Champion: updateChampionDTO) {
		try {
			const updatedChampion = await db(this.tableName)
				.where({ id: Champion.id, userId: Champion.userId })
				.update({ guildId: Champion.guildId });
			if (!updatedChampion) {
				throw new ThrowsError("Champion not updated", 404);
			}
			return updatedChampion;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Error while updating champion guild", 500);
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
			if (!updatedChampion) {
				throw new ThrowsError("Champion not updated", 404);
			}
			return updatedChampion;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Error while updating champion status", 500);
		}
	}

	async updateMoney(championId: number, newMoney: number) {
		try {
			const updatedChampion = await db(this.tableName)
				.where({ id: championId })
				.update({ money: newMoney });
			if (!updatedChampion) {
				throw new ThrowsError("Champion not updated", 404);
			}
			return updatedChampion;
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Error while updating champion money", 500);
		}
	}
}
