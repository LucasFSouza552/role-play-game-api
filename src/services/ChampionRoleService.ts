import { Filters } from "../models/Filters";
import { roleRepo } from "../repositories/RepositoryManager";

export class ChampionRoleService {
    async getAllChampionRoles(filter: Filters) {
        return await roleRepo.findAll(filter);
    }

    async getChampionRoleById(id: string) {
        return await roleRepo.findById(id);
    }

    async createChampionRole(role: any) {
        return await roleRepo.create(role);
    }
}