import { Mission } from "../models/Mission";
import { missionRepo } from "../repositories/RepositoryManager";
import { MissionDifficult } from "../models/enums/MissionDifficult";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { createMissionDTO, updateMissionDTO } from "../DTOS/MissionDTO";

export class MissionsService implements ServiceInterface<createMissionDTO, updateMissionDTO, Mission> {
	async getAll(): Promise<Mission[]> {
		try {
			return await missionRepo.getAll();
		} catch (error) {
			throw new Error('Error fetching all missions');
		}
	}

	async getById(id: number): Promise<Mission> {
		try {
			return await missionRepo.getById(id);
		} catch (error) {
			throw new Error('Error fetching mission by ID');
		}
	}

	async create(mission: createMissionDTO): Promise<Mission> {
		try {
			const missionDifficult = Object.values(MissionDifficult);

			function isValidMissionDifficult(value: string): boolean {
				return missionDifficult.includes(value as MissionDifficult);
			}

			if (!mission.title || mission.title.trim() === '') {
				throw new Error('Title not found!');
			}
			if (!isValidMissionDifficult(mission.difficulty)) {
				throw new Error('Invalid difficulty!');
			}
			if (!mission.description || mission.description.trim() === '') {
				throw new Error('Empty description!');
			}
			return await missionRepo.create(mission);
		} catch (error) {
			throw new Error('Error creating mission');
		}
	}

	async update(mission: updateMissionDTO): Promise<updateMissionDTO> {
		try {
			return await missionRepo.update(mission);
		} catch (error) {
			throw new Error('Error updating mission');
		}
	}

	async delete(id: number, userId: number): Promise<boolean> {
		try {
			return await missionRepo.delete(id, userId);
		} catch (error) {
			throw new Error('Error deleting mission');
		}
	}
}
