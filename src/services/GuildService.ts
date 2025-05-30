import { guildRepo } from "../repositories/RepositoryManager";
import { Guild } from "../models/Guild";
<<<<<<< HEAD
import { error } from "console";

export class GuildService {

    async findAllGuild() {
        return await guildRepo.findAll();
    }
    async findByGuildName(name: string) {
        return await guildRepo.findByGuildName(name);
    }
    async findGuildById(id: number) {
        return await guildRepo.findById(id);
    }
    async createGuild(guild: Guild) {
        if (guild.name.trim() === '' || !guild.name) {
            return { error: 'Nome da Guilda inválido' }
        }
        if (guild.level <= 0) {
            return { error: 'Level da Guilda inválido' }
        }
        return await guildRepo.create(guild);
    }
    async updateGuild(id: number, guild: Guild) {
        return await guildRepo.update(id,guild);
    }
    async deleteGuild(id: number){
        return await guildRepo.delete(id);
    }
=======
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
		return await guildRepo.getById(id);
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
>>>>>>> 7cf207949960b2c37d25eb92e5448120592f02b3
}





