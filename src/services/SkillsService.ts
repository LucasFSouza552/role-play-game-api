import { skillRepo } from "../repositories/RepositoryManager";

export class SkillsService {
    async getAllSkills() {
        return await skillRepo.findAll();
    }

    async getSkillById(id: number) {
        return await skillRepo.findById(id);
    }
}