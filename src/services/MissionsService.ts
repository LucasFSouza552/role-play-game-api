import { Mission } from "../models/Mission";
import { missionRepo } from "../repositories/RepositoryManager";
import { MissionDifficult } from "../models/enums/MissionDifficult";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { createMissionDTO, updateMissionDTO } from "../DTOS/MissionDTO";
import { ThrowsError } from "../errors/ThrowsError";

export class MissionsService implements ServiceInterface<createMissionDTO, updateMissionDTO, Mission> {
	async getAll(): Promise<Mission[]> {
		try {
			const missions = await missionRepo.getAll();
			if (!missions) {
				throw new ThrowsError("Missions not found", 404);
			}
			return missions;
		} catch (error) {
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
			throw new ThrowsError('Internal server error', 500);
		}
	}

	async create(mission: createMissionDTO): Promise<Mission> {
		try {
			const missionDifficult = Object.values(MissionDifficult);

			function isValidMissionDifficult(value: string): boolean {
				return missionDifficult.includes(value as MissionDifficult);
			}

			if (!mission.title || mission.title.trim() === '') {
				throw new ThrowsError('Title not found!', 400);
			}
			if (!isValidMissionDifficult(mission.difficulty)) {
				throw new ThrowsError('Invalid difficulty!', 400);
			}
			if (!mission.description || mission.description.trim() === '') {
				throw new ThrowsError('Empty description!', 400);
			}
			return await missionRepo.create(mission);
		} catch (error) {
			throw new ThrowsError('Internal server error', 500);
		}
	}

	async update(mission: updateMissionDTO): Promise<updateMissionDTO> {
		try {
			const updatedMission = await missionRepo.update(mission);
			if (!updatedMission) {
				throw new ThrowsError("Mission not updated", 404);
			}
			return updatedMission;
		} catch (error) {
			throw new ThrowsError('Internal server error', 500);
		}
	}

	async delete(id: number, userId: number): Promise<boolean> {
		try {
			const deletedMission = await missionRepo.delete(id, userId);
			if (!deletedMission) {
				throw new ThrowsError("Mission not deleted", 404);
			}
			return deletedMission;
		} catch (error) {
			throw new ThrowsError('Internal server error', 500);
		}
	}
}
