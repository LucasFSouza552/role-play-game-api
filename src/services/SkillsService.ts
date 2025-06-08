import { createSkillDTO, updateSkillDTO } from "../DTOS/SkillDTO";
import { ThrowsError } from "../errors/ThrowsError";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { ChampionSkill } from "../models/ChampionSkill";
import { Filter } from "../models/Filters";
import { skillRepo } from "../repositories/RepositoryManager";

export class SkillsService implements RepositoryInterface<createSkillDTO, updateSkillDTO, ChampionSkill> {
    async create(skill: createSkillDTO): Promise<ChampionSkill> {
        try {
            const newSkill = await skillRepo.create(skill);
            if (!newSkill) {
                throw new ThrowsError("Skill not created", 404);
            }
            return newSkill;
        } catch (error) {
            if (error instanceof ThrowsError) {
                throw error;
            }
            throw new ThrowsError("Internal server error", 500);
        }
    }
    async update(element: updateSkillDTO): Promise<updateSkillDTO> {
        try {
            const updatedSkill = await skillRepo.update(element);
            if (!updatedSkill) {
                throw new ThrowsError("Skill not updated", 404);
            }
            return updatedSkill;
        } catch (error) {
            if (error instanceof ThrowsError) {
                throw error;
            }
            throw new ThrowsError("Internal server error", 500);
        }
    }
    async delete(id: number): Promise<boolean> {
        try {
            const deletedSkill = await skillRepo.delete(id);
            if (!deletedSkill) {
                throw new ThrowsError("Skill not deleted", 404);
            }
            return deletedSkill;
        } catch (error) {
            if (error instanceof ThrowsError) {
                throw error;
            }
            throw new ThrowsError("Internal server error", 500);
        }
    }
    async getAll(filter: Filter): Promise<ChampionSkill[]> {
        try {
            const skills = await skillRepo.getAll(filter);
            if (!skills) {
                throw new ThrowsError("Skills not found", 404);
            }
            return skills;
        } catch (error) {
            if (error instanceof ThrowsError) {
                throw error;
            }
            throw new ThrowsError("Internal server error", 500);
        }
    }

    async getById(id: number): Promise<ChampionSkill> {
        try {
            const skill = await skillRepo.getById(id);
            if (!skill) {
                throw new ThrowsError("Skill not found", 404);
            }
            return skill;
        } catch (error) {
            if (error instanceof ThrowsError) {
                throw error;
            }
            throw new ThrowsError("Internal server error", 500);
        }
    }
}