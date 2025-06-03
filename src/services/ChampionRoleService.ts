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
			throw new Error("Error fetching roles: " + error);
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

	update(role: updateChampionDTO): Promise<updateChampionDTO> {
		throw new Error("Method not implemented.");
	}

	delete(id: number, userId?: number): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
}
