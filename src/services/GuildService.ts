import { guildRepo } from "../repositories/RepositoryManager";
import { Guild } from "../models/Guild";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { createGuildDTO, updateGuildDTO } from "../DTOS/GuildDTO";

export class GuildService implements ServiceInterface<createGuildDTO, updateGuildDTO, Guild> {

	async getAll(): Promise<Guild[]> {
		return await guildRepo.getAll();
	}

	async getByGuildName(name: string): Promise<Guild> {
		try {
			return await guildRepo.findGuildByName(name);
		} catch (error) {
			throw new Error("Erro ao buscar guilda");
		}
	}

	async getById(id: number): Promise<Guild> {
		try {
			const guild = await guildRepo.getById(id);
			return guild;
		} catch (error) {
			throw new Error("Erro ao buscar guilda");
		}
	}

	async create(guild: Guild) {
		if (guild.name.trim() === '' || !guild.name) {
			throw new Error('Nome da Guilda inválido');
		}
		if (guild.level <= 0) {
			throw new Error('Level da Guilda inválido');
		}
		return await guildRepo.create(guild);
	}

	async update(guild: updateGuildDTO): Promise<updateGuildDTO> {
		return await guildRepo.update(guild);
	}
	
	async delete(id: number): Promise<boolean> {
		return await guildRepo.delete(id);
	}
}





