import { createSkillDTO, updateSkillDTO } from "../DTOS/SkillDTO";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { ChampionSkill } from "../models/ChampionSkill";
import { skillRepo } from "../repositories/RepositoryManager";

export class SkillsService implements RepositoryInterface<createSkillDTO, updateSkillDTO, ChampionSkill> {
    async create(skill: createSkillDTO): Promise<ChampionSkill> {
        try {
            const newSkill = await skillRepo.create(skill);
            return newSkill;
        } catch (error) {
            throw new Error('Erro ao criar habilidade');
        }
    }
    async update(element: updateSkillDTO): Promise<updateSkillDTO> {
        try {
            const updatedSkill = await skillRepo.update(element);
            return updatedSkill;
        } catch (error) {
            throw new Error('Erro ao atualizar habilidade');
        }
    }
    async delete(id: number): Promise<boolean> {
        try {
            const deletedSkill = skillRepo.delete(id);
            return deletedSkill;
        } catch (error) {
            throw new Error('Erro ao deletar habilidade');
        }
    }
    async getAll() {
        try {
            return await skillRepo.getAll();
        } catch (error) {
            throw new Error('Erro ao buscar todas as habilidades');
        }
    }

    async getById(id: number) {
        try {
            return await skillRepo.getById(id);
        } catch (error) {
            throw new Error('Erro ao buscar habilidade pelo ID');
        }
    }
}