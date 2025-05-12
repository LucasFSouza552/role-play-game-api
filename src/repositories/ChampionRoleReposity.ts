import db from "../database/db";
import { ChampionRole } from "../models/ChampionRole";
import { Filters } from "../models/Filters";

export class ChampionRoleRepository {
    private tableName = 'champion_roles';

    async findAll(filter: Filters) {
        return await db(this.tableName).select('*')
            .limit(filter.size)
            .offset(filter.offset)
            .modify((query) => {
                if (filter.name) {
                    query.whereILike('champion_roles.name', `%${filter.name}%`);
                }
            });
    }

    async findById(id: string) {
        return await db(this.tableName).where({ id }).first();
    }

    async findByName(name: string) {
        return await db(this.tableName).where({ name }).first();
    }

    async create(role: ChampionRole) {
        try {
            return await db(this.tableName).insert(role);
        } catch (error) {
            throw new Error('Erro ao criar role');
        }
    }

    async update(id: string, role: ChampionRole) {
        try {
            return await db(this.tableName).where({ id }).update(role);
        } catch (error) {
            throw new Error('Erro ao atualizar role');
        }
    }

    async delete(id: string) {
        try {
            return await db(this.tableName).where({ id }).del();
        } catch (error) {
            throw new Error('Erro ao deletar role');
        }
    }
}