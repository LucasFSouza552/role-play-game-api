import { RepositoryInterface } from './../interfaces/repositoryInterface';
import db from "../database/db";
import { Guild } from "../models/Guild";
import { createGuildDTO, updateGuildDTO } from '../DTOS/GuildDTO';
import { ThrowsError } from '../errors/ThrowsError';
import { FilterGuild } from '../models/Filters';

export class GuildRepository implements RepositoryInterface<createGuildDTO, updateGuildDTO, Guild> {
	private tablename = 'guilds';

	async getAll(filter: FilterGuild): Promise<Guild[]> {
		try {
			const guilds = await db(this.tablename)
			.select('*')
			.modify((query) => {
				if (filter.name) query.whereILike('name', `%${filter.name}%`);
			})
			.orderBy(filter.orderBy, filter.order)
			.limit(filter.limit)
			.offset((filter.page - 1) * filter.limit);

			if (!guilds) {
				throw new ThrowsError("Guilds not found", 404);
			}

			return guilds;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}
	async getById(id: number): Promise<Guild> {
		try {
			const guild = await db(this.tablename).where({ id }).first();

			if (!guild) {
				throw new ThrowsError("Guild not found", 404);
			}

			return guild;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async create(guild: createGuildDTO): Promise<Guild> {
		try {
			const newGuild = await db(this.tablename).insert(guild).returning('*');

			if (!newGuild || newGuild.length === 0) {
				throw new ThrowsError("Guild not created", 404);
			}

			return newGuild[0];
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async update(guild: updateGuildDTO): Promise<updateGuildDTO> {
		try {
			const updatedGuild = await db(this.tablename)
				.where({ id: guild.id })
				.update(guild)
				.returning('*');

			if (!updatedGuild || updatedGuild.length === 0) {
				throw new ThrowsError("Guild not updated", 404);
			}

			return updatedGuild[0];
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const deletedGuild = await db(this.tablename).where({ id }).del();

			if (!deletedGuild) {
				throw new ThrowsError("Guild not deleted", 404);
			}

			return deletedGuild == 1;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async findGuildByName(name: String): Promise<Guild> {
		try {
			const guild = await db(this.tablename).where({ name }).first();

			if (!guild) {
				throw new ThrowsError("Guild not found", 404);
			}

			return guild;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

}
