import { guildRepo } from "../repositories/RepositoryManager";
import { Guild } from "../models/Guild";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { createGuildDTO, updateGuildDTO } from "../DTOS/GuildDTO";
import { ThrowsError } from "../errors/ThrowsError";
import { FilterGuild } from "../models/Filters";

export class GuildService implements ServiceInterface<createGuildDTO, updateGuildDTO, Guild> {

	async getAll(filter: FilterGuild): Promise<Guild[]> {
		try {
			const guilds = await guildRepo.getAll(filter);
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

	async getByGuildName(name: string): Promise<Guild> {
		try {
			const guild = await guildRepo.findGuildByName(name);
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

	async getById(id: number): Promise<Guild> {
		try {
			const guild = await guildRepo.getById(id);
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

	async create(guild: createGuildDTO) {
		try {
			const createdGuild = await guildRepo.create(guild);
			if (!createdGuild) {
				throw new ThrowsError("Guild not created", 404);
			}
			return createdGuild;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async update(guild: updateGuildDTO): Promise<updateGuildDTO> {
		try {
			const updatedGuild = await guildRepo.update(guild);
			if (!updatedGuild) {
				throw new ThrowsError("Guild not updated", 404);
			}
			return updatedGuild;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}
	
	async delete(id: number): Promise<boolean> {
		try {
			const deletedGuild = await guildRepo.delete(id);
			if (!deletedGuild) {
				throw new ThrowsError("Guild not deleted", 404);
			}
			return deletedGuild;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}
}





