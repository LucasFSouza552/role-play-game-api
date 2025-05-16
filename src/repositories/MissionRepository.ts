import db from "../database/db";
import { Mission } from "../models/Mission";

export class MissionRepository {
    private tableName = 'missions';

    async findAll() {
        return await db(this.tableName).select('*');
    }

    async findById(id: number) {
        return await db(this.tableName).where({ id }).first();
    }

    async createMission(mission: Mission) {
        try {
            const [newMission] = await db(this.tableName)
                .insert(mission)
                .returning('*');
            return newMission;
        } catch (error) {
            throw new Error('Não foi possível criar a missão.');
        }
    }

    async updateMission(id: number, mission: Mission) {
        try {
            const updatedMission = await db(this.tableName).where({ id }).update(mission);
            return updatedMission;
        } catch (error) {
            throw new Error('Erro ao atualizar a missão.');
        }
    }

    async deleteMission(id: number) {
        try {
            const deletedMission = await db(this.tableName).where({ id }).del();
            return deletedMission;
        } catch (error) {
            throw new Error('Não foi possível deletar a missão.');
        }
    }
}