import { Mission } from "../models/Mission";
import { missionRepo } from "../repositories/RepositoryManager";
import { MissionDifficult } from "../models/enums/MissionDifficult";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { createMissionDTO, updateMissionDTO } from "../DTOS/MissionDTO";
import { ThrowsError } from "../errors/ThrowsError";
import { FilterMission } from "../models/Filters";

export class MissionsService implements ServiceInterface<createMissionDTO, updateMissionDTO, Mission> {
	async getAll(filter: FilterMission): Promise<Mission[]> {
		try {
			const missions = await missionRepo.getAll(filter);
			if (!missions) {
				throw new ThrowsError("Missions not found", 404);
			}
			return missions;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError('Internal server error', 500);
		}
	}

	async getById(id: number): Promise<Mission> {
		try {
			const mission = await missionRepo.getById(id);
			if (!mission) {
				throw new ThrowsError("Mission not found", 404);
			}
			return mission;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError('Internal server error', 500);
		}
	}

	async create(mission: createMissionDTO): Promise<Mission> {
		try {
			const missionDifficult = Object.values(MissionDifficult);

			function isValidMissionDifficult(value: string): boolean {
				return missionDifficult.includes(value as MissionDifficult);
			}
			if (!isValidMissionDifficult(mission.difficulty)) {
				throw new ThrowsError('Invalid difficulty!', 400);
			}

			return await missionRepo.create(mission);
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError('Internal server error', 500);
		}
	}

	async update(mission: updateMissionDTO): Promise<updateMissionDTO> {
		try {

			const missionDifficult = Object.values(MissionDifficult);
			if(mission.difficulty && !missionDifficult.includes(mission.difficulty as MissionDifficult)) {
				throw new ThrowsError('Invalid difficulty!', 400);
			}

			const updatedMission = await missionRepo.update(mission);
			if (!updatedMission) {
				throw new ThrowsError("Mission not updated", 404);
			}
			return updatedMission;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError('Internal server error', 500);
		}
	}

	async delete(id: number): Promise<boolean> {
		try {

			const missionExists = await missionRepo.getById(id);
			if(!missionExists) {
				throw new ThrowsError('Mission not found', 404);
			}

			const deletedMission = await missionRepo.delete(id);
			if (!deletedMission) {
				throw new ThrowsError("Mission not deleted", 404);
			}
			return deletedMission;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError('Internal server error', 500);
		}
	}
}
