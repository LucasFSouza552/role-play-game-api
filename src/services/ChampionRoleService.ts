import { updateChampionDTO } from "../DTOS/ChampionDTO";
import { createChampionRoleDTO } from "../DTOS/ChampionRoleDTO";
import { ThrowsError } from "../errors/ThrowsError";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { ChampionRole } from "../models/ChampionRole";
import { FilterChampionRole } from "../models/Filters";
import { roleRepo } from "../repositories/RepositoryManager";

export class ChampionRoleService implements ServiceInterface<createChampionRoleDTO, updateChampionDTO, ChampionRole> {
	async getAll(filter: FilterChampionRole): Promise<ChampionRole[]> {
		try {
			const roles = await roleRepo.getAll(filter);
			if (!roles) {
				throw new ThrowsError("Roles not found", 404);
			}
			return roles;
		} catch (error) {
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async getById(id: number): Promise<ChampionRole> {
		try {
			const role = await roleRepo.getById(id);
			if (!role) {
				throw new ThrowsError("Role not found", 404);
			}
			return role;
		} catch (error) {
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async create(role: createChampionRoleDTO): Promise<ChampionRole> {
		try {
			const newRole = await roleRepo.create(role);
			if (!newRole) {
				throw new ThrowsError("Role not created", 404);
			}
			return newRole;
		} catch (error) {
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async update(role: updateChampionDTO): Promise<updateChampionDTO> {
		try {
			const updatedRole = await roleRepo.update(role);
			if (!updatedRole) {
				throw new ThrowsError("Role not updated", 404);
			}
			return updatedRole;
		} catch (error) {
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const deletedRole = await roleRepo.delete(id);
			if (!deletedRole) {
				throw new ThrowsError("Role not deleted", 404);
			}
			return deletedRole;
		} catch (error) {
			throw new ThrowsError("Internal server error", 500);
		}
	}
}
