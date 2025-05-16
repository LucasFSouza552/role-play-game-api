import { skillRepo } from "../repositories/RepositoryManager";

export class SkillsService {
    async getAllSkills() {
        return await skillRepo.findAll();
    }
}