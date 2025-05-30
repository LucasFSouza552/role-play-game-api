import db from "../database/db";
import { createSkillDTO, updateSkillDTO } from "../DTOS/SkillDTO";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { ChampionSkill } from "../models/ChampionSkill";

export class SkillRepository implements RepositoryInterface<createSkillDTO, updateSkillDTO, ChampionSkill> {

    private tableName = 'champion_skills';

    async getAll(): Promise<ChampionSkill[]> {
        try {
            return await db(this.tableName).select('*');
        } catch (error) {
            throw new Error('Erro ao buscar todas as habilidades');
        }
    }

    async getById(id: number): Promise<ChampionSkill> {
        try {
            return await db(this.tableName).where({ id }).first();
        } catch (error) {
            throw new Error('Erro ao buscar habilidade pelo id');
        }
    }

    async create(skill: createSkillDTO): Promise<ChampionSkill> {
        try {
            const Skill = await db(this.tableName).insert(skill).returning('*');
            if (!Skill || Skill.length === 0) {
                throw new Error('Habilidade não criada');
            }
            return Skill[0];
        } catch (error) {
            throw new Error('Erro ao criar habilidade');
        }
    }

    async update(skill: updateSkillDTO): Promise<updateSkillDTO> {
        try {
            const updatedSkill = await db(this.tableName)
                .where({ id: skill.id })
                .update(skill)
                .returning('*');
            if (!updatedSkill || updatedSkill.length === 0) {
                throw new Error('Habilidade não atualizada');
            }
            return updatedSkill[0];
        } catch (error) {
            throw new Error('Erro ao atualizar habilidade');
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const deletedSkill = await db(this.tableName).where({ id }).del();
            return deletedSkill == 1;
        } catch (error) {
            throw new Error('Erro ao deletar habilidade');
        }
    }
}
