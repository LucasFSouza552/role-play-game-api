import { Mission } from "../models/Mission";
import { missionRepo } from "../repositories/RepositoriosManager";
import { MissionDifficult } from "../models/enums/MissionDifficult";

export class MissionsService {
    async getAllMissions() {
        return await missionRepo.findAll();
    }

    async getMissionById(id: number) {
        return await missionRepo.findById(id);
    }

    async createMission(mission: Mission) {
        const missionDifficult = Object.values(MissionDifficult);

        function isValidMissionDifficult(value: string): boolean {
            return missionDifficult.includes(value as MissionDifficult);
        }

        if (!mission.title || mission.title.trim() === '') {
            return { error: 'Título não encontrado!' };
        }
        if (!isValidMissionDifficult(mission.difficulty)) {
            return { error: 'Dificuldade inválida!' };
        }
        if (!mission.description || mission.description.trim() === '') {
            return { error: 'Descrição vazia!' };
        }
        if (!mission.targetDate) {
            return { error: 'Data deve ser estipulada!' };
        }

        return await missionRepo.createMission(mission);
    }

    async updateMission(id: number, mission: Mission) {
        return await missionRepo.createMission(mission);
    }

    async deleteMission(id: number) {
        return await missionRepo.deleteMission(id);
    }
}