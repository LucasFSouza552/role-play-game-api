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

    async create(skill: ChampionSkill) {
        try {
            const [Skill] = await db(this.tableName).insert(skill).returning('*');
            return Skill;
        } catch (error) {
            throw new Error('Erro ao criar habilidade');
        }
    }

    update(element: any): Promise<any> {
        throw new Error("Method not implemented.");
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
