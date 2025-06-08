import db from "../database/db";
import { createMissionDTO, updateMissionDTO } from "../DTOS/MissionDTO";
import { ThrowsError } from "../errors/ThrowsError";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { Mission } from "../models/Mission";

export class MissionRepository implements RepositoryInterface<createMissionDTO, updateMissionDTO, Mission> {
	private tableName = 'missions';

	async getAll(): Promise<Mission[]> {
		try {
			const missions = await db(this.tableName).select('*');
			if (!missions) {
				throw new ThrowsError("Missions not found", 404);
			}
			return missions;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Error while fetching all missions", 500);
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
            throw new ThrowsError("Error while fetching mission by id", 500);
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
			throw new ThrowsError("Error while creating mission", 500);
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
			throw new ThrowsError("Error while updating mission", 500);
		}
	}

	async delete(id: number, userId: number): Promise<boolean> {
		try {
			const deletedMission = await db(this.tableName).where({ id, userId }).del();
			if (!deletedMission) {
				throw new ThrowsError("Mission not deleted", 404);
			}
			return deletedMission == 1;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Error while deleting mission", 500);
		}
	}
}
