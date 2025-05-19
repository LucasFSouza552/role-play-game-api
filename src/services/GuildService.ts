import { guildRepo } from "../repositories/RepositoryManager";
import { Guild } from "../models/Guild";
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
}





