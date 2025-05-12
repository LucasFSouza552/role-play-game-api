import { Filters } from "../models/Filters";
import { roleRepo } from "../repositories/RepositoriosManager";

export class ChampionRoleService {
    async getAllChampionRoles(filter: Filters) {
        return await roleRepo.findAll(filter);
    }
}