<<<<<<< HEAD
import db from "../database/db";
import { Guild } from "../models/Guild";
import { Filters } from "../models/Filters";

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
=======
import { RepositoryInterface } from './../interfaces/repositoryInterface';
import db from "../database/db";
import { Guild } from "../models/Guild";
import { createGuildDTO, updateGuildDTO } from '../DTOS/GuildDTO';

export class GuildRepository implements RepositoryInterface<createGuildDTO, updateGuildDTO, Guild> {
	private tablename = 'guild';

	async getAll(): Promise<Guild[]> {
		try {
			return await db(this.tablename).select('*');
		} catch (error) {
			throw new Error('Erro ao buscar todas as Guildas');
		}
	}
	async getById(id: number): Promise<Guild> {
		try {
			return await db(this.tablename).where({ id }).first();
		} catch (error) {
			throw new Error('Erro ao buscar a Guilda pelo ID');
		}
	}

	async create(guild: createGuildDTO): Promise<Guild> {
		try {
			const newGuild = await db(this.tablename).insert(guild).returning('*');
			return newGuild[0];
		} catch (error) {
			throw new Error('Erro ao criar Guilda');
		}
	}

	async update(guild: updateGuildDTO): Promise<updateGuildDTO> {
		try {
			const updatedGuild = await db(this.tablename)
				.where({ id: guild.id })
				.update(guild)
				.returning('*');

			return updatedGuild[0];
		} catch (error) {
			throw new Error('Erro ao atualizar a Guilda');
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const deletedGuild = await db(this.tablename).where({ id }).del();
			return deletedGuild == 1;
		} catch (error) {
			throw new Error('Erro ao deletar a Guilda');
		}
	}

	async findGuildByName(name: String): Promise<Guild> {
		try {
			return await db(this.tablename).where({ name }).first();
		} catch (error) {
			throw new Error('Erro ao buscar a Guilda pelo nome');
		}
	}

}
>>>>>>> 7cf207949960b2c37d25eb92e5448120592f02b3
