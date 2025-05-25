import db from "../database/db";
import { Guild } from "../models/Guild";

export class GuildRepository {
    private tablename = 'guild';

    async findAll() {
        return await db(this.tablename).select('*');
    }

    async findByGuildName(name: String) {
        return await db(this.tablename).where({ name }).first();
    }

    async findById(id: number) {
        return await db(this.tablename).where({ id }).first();
    }

    async create(guild: Guild) {
        try {
            const newGuild = await db(this.tablename).insert(guild).returning('*');
            return newGuild;
        } catch (error) {
            throw new Error('Erro ao criar Guilda');
        }
    }

    async update(id: number, guild: Guild) {
        try {
            const updatedGuild = await db(this.tablename).where({ id }).update(guild);
            return updatedGuild;
        } catch (error) {
            throw new Error('Erro ao atualizar a Guilda');
        }
    }

    async delete(id: number) {
        try {
            const deleteGuild = await db(this.tablename).where({ id }).del();
            return deleteGuild;
        } catch (error) {
            throw new Error('Erro ao deletar a Guilda');
        }
    }

}