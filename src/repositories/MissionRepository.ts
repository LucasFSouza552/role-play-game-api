import db from "../database/db";
import { createMissionDTO, updateMissionDTO } from "../DTOS/MissionDTO";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { Mission } from "../models/Mission";

export class MissionRepository implements RepositoryInterface<createMissionDTO, updateMissionDTO, Mission> {
	private tableName = 'missions';

	async getAll(): Promise<Mission[]> {
		try {
			return await db(this.tableName).select('*');
		} catch (error) {
			throw new Error('Erro ao buscar todas as missões.');
		}
	}

	async getById(id: number): Promise<Mission> {
		try {
            return await db(this.tableName).where({ id }).first();
        } catch (error) {
            throw new Error('Erro ao buscar a missão pelo ID.');
        }
	}

	async create(mission: createMissionDTO): Promise<Mission> {
		try {
			const [newMission] = await db(this.tableName)
				.insert(mission)
				.returning('*');
			return newMission;
		} catch (error) {
			throw new Error('Não foi possível criar a missão.');
		}
	}

	async update(mission: updateMissionDTO): Promise<updateMissionDTO> {
		try {
			const updatedMission = await db(this.tableName)
                .where({ id: mission.id })
                .update(mission)
                .returning('*');

			return updatedMission[0];
		} catch (error) {
			throw new Error('Erro ao atualizar a missão.');
		}
	}

	async delete(id: number, userId: number): Promise<boolean> {
		try {
			await db(this.tableName).where({ id, userId }).del();
			return true;
		} catch (error) {
			throw new Error('Não foi possível deletar a missão.');
		}
	}
}
