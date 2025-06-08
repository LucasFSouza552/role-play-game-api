import db from "../database/db";
import { createSkillDTO, updateSkillDTO } from "../DTOS/SkillDTO";
import { ThrowsError } from "../errors/ThrowsError";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { ChampionSkill } from "../models/ChampionSkill";

export class SkillRepository implements RepositoryInterface<createSkillDTO, updateSkillDTO, ChampionSkill> {

    private tableName = 'champion_skills';

    async getAll(): Promise<ChampionSkill[]> {
        try {
            const skills = await db(this.tableName).select('*');
            if (!skills) {
                throw new ThrowsError("Skills not found", 404);
            }
            return skills;
        } catch (error) {
            if (error instanceof ThrowsError) {
                throw error;
            }
            throw new ThrowsError("Error while fetching all skills", 500);
        }
    }

    async getById(id: number): Promise<ChampionSkill> {
        try {
            const skill = await db(this.tableName).where({ id }).first();
            if (!skill) {
                throw new ThrowsError("Skill not found", 404);
            }
            return skill;
        } catch (error) {
            if (error instanceof ThrowsError) {
                throw error;
            }
            throw new ThrowsError("Error while fetching skill by id", 500);
        }
    }

    async create(skill: createSkillDTO): Promise<ChampionSkill> {
        try {
            const Skill = await db(this.tableName).insert(skill).returning('*');
            if (!Skill || Skill.length === 0) {
                throw new ThrowsError("Skill not created", 404);
            }
            return Skill[0];
        } catch (error) {
            if (error instanceof ThrowsError) {
                throw error;
            }
            throw new ThrowsError("Error while creating skill", 500);
        }
    }

    async update(skill: updateSkillDTO): Promise<updateSkillDTO> {
        try {
            const updatedSkill = await db(this.tableName)
                .where({ id: skill.id })
                .update(skill)
                .returning('*');
            if (!updatedSkill || updatedSkill.length === 0) {
                throw new ThrowsError("Skill not updated", 404);
            }
            return updatedSkill[0];
        } catch (error) {
            if (error instanceof ThrowsError) {
                throw error;
            }
            throw new ThrowsError("Error while updating skill", 500);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const deletedSkill = await db(this.tableName).where({ id }).del();
            if (!deletedSkill) {
                throw new ThrowsError("Skill not deleted", 404);
            }
            return deletedSkill == 1;
        } catch (error) {
            if (error instanceof ThrowsError) {
                throw error;
            }
            throw new ThrowsError("Error while deleting skill", 500);
        }
    }
}
