import { skillRepo } from "../repositories/RepositoriosManager";

export class SkillsService {
    async getAllSkills() {
        return await skillRepo.findAll();
    }
}