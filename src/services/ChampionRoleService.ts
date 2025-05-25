import { updateChampionDTO } from "../DTOS/ChampionDTO";
import { createChampionRoleDTO, championRoleDTO } from "../DTOS/ChampionRoleDTO";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { FilterChampionRole } from "../models/Filters";
import { roleRepo } from "../repositories/RepositoryManager";

export class ChampionRoleService implements ServiceInterface<createChampionRoleDTO, updateChampionDTO, championRoleDTO> {

    async getAll(filter: FilterChampionRole): Promise<championRoleDTO[]> {
        try {
            return await roleRepo.getAll(filter);
        } catch (error) {
            throw new Error("Error fetching roles: " + error);
        }
    }

    async getById(id: number, userId: number): Promise<championRoleDTO> {
        try {
            return await roleRepo.getById(id);
        } catch (error) {
            throw new Error("Role not found");
        }
    }

    async create(role: createChampionRoleDTO): Promise<championRoleDTO> {
        try {
            return await roleRepo.create(role);
        } catch (error) {
            throw new Error("Role not created");
        }
    }

    update(element: updateChampionDTO): Promise<updateChampionDTO> {
        throw new Error("Method not implemented.");
    }

    delete(id: number, userId?: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
