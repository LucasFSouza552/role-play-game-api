import db from "../database/db";
import { ChampionSkill } from "../models/ChampionSkill";


export class SkillRepository {
    private tableName = 'champion_skills';

    async findAll() {
        return await db(this.tableName).select('*');
    }

    async findById(id: number) {
        return await db(this.tableName).where({ id }).first();
    }

    async create(skill: ChampionSkill) {
        try {
            const [Skill] = await db(this.tableName).insert(skill).returning('*');
            return Skill;
        } catch (error) {
            throw new Error('Erro ao criar habilidade');
        }
    }

    async delete(id: number) {
        try {
            return await db(this.tableName).where({ id }).del();
        } catch (error) {
            throw new Error('Erro ao deletar habilidade');
        }
    }
}