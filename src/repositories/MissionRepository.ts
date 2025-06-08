import db from "../database/db";
import { createMissionDTO, updateMissionDTO } from "../DTOS/MissionDTO";
import { ThrowsError } from "../errors/ThrowsError";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { FilterMission } from "../models/Filters";
import { Mission } from "../models/Mission";

export class MissionRepository implements RepositoryInterface<createMissionDTO, updateMissionDTO, Mission> {
	private tableName = 'missions';

	async getAll(filter: FilterMission): Promise<Mission[]> {
		try {
			const missions = await db(this.tableName)
				.select('*')
				.modify((query) => {
					if (filter.title) query.whereILike('title', `%${filter.title}%`);
					if (filter.difficulty) query.where('difficulty', filter.difficulty);
				})
				.orderBy(filter.orderBy, filter.order)
				.limit(filter.limit)
				.offset((filter.page - 1) * filter.limit);
			if (!missions) {
				throw new ThrowsError("Missions not found", 404);
			}
			return missions;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async getById(id: number): Promise<Mission> {
		try {
			const mission = await db(this.tableName).where({ id }).first();
			if (!mission) {
				throw new ThrowsError("Mission not found", 404);
			}
			return mission;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async create(mission: createMissionDTO): Promise<Mission> {
		try {
			const newMission = await db(this.tableName)
				.insert(mission)
				.returning('*');

			if (!newMission || newMission.length === 0) {
				throw new ThrowsError("Mission not created", 404);
			}

			return newMission[0];
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async update(mission: updateMissionDTO): Promise<updateMissionDTO> {
		try {
			const updatedMission = await db(this.tableName)
				.where({ id: mission.id })
				.update(mission)
				.returning('*');

			if (!updatedMission || updatedMission.length === 0) {
				throw new ThrowsError("Mission not updated", 404);
			}

			return updatedMission[0];
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const deletedMission = await db(this.tableName).where({ id }).del();
			if (!deletedMission) {
				throw new ThrowsError("Mission not deleted", 404);
			}
			return deletedMission == 1;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}
}
