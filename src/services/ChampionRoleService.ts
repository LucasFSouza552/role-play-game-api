import { updateChampionDTO } from "../DTOS/ChampionDTO";
import { createChampionRoleDTO } from "../DTOS/ChampionRoleDTO";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { ChampionRole } from "../models/ChampionRole";
import { Filter, FilterChampionRole } from "../models/Filters";
import { roleRepo } from "../repositories/RepositoryManager";

export class ChampionRoleService implements ServiceInterface<createChampionRoleDTO, updateChampionDTO, ChampionRole> {
	async getAll(filter: FilterChampionRole): Promise<ChampionRole[]> {
		try {
			return await roleRepo.getAll(filter);
		} catch (error) {
			throw new Error("Error fetching roles");
		}
	}

	async getById(id: number): Promise<ChampionRole> {
		try {
			return await roleRepo.getById(id);
		} catch (error) {
			throw new Error("Role not found");
		}
	}

	async create(role: createChampionRoleDTO): Promise<ChampionRole> {
		try {
			return await roleRepo.create(role);
		} catch (error) {
			throw new Error("Role not created");
		}
	}

	async update(role: updateChampionDTO): Promise<updateChampionDTO> {
		try {
			return await roleRepo.update(role);
		} catch (error) {
			throw new Error("Error updating role");
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			return await roleRepo.delete(id);
		} catch (error) {
			throw new Error("Error deleting role");
		}
	}
}
