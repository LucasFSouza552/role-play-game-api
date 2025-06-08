import db from "../database/db";
import { createChampionRoleDTO, updateChampionRoleDTO } from "../DTOS/ChampionRoleDTO";
import { ThrowsError } from "../errors/ThrowsError";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { ChampionRole } from "../models/ChampionRole";
import { FilterChampionRole } from "../models/Filters";

export class ChampionRoleRepository implements RepositoryInterface<createChampionRoleDTO, updateChampionRoleDTO, ChampionRole> {
	
	private tableName = 'champion_roles';

	async getAll(filter: FilterChampionRole): Promise<ChampionRole[]> {
		try {
			const roles = await db(this.tableName)
				.select('*')
				.limit(filter.limit)
				.offset((filter.page - 1) * filter.limit)
				.modify((query) => {
					if (filter.name) {
						query.whereILike('champion_roles.name', `%${filter.name}%`);
					}
				});

			if (!roles) {
				throw new ThrowsError("Roles not found", 404);
			}

			return roles;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async getById(id: number): Promise<ChampionRole> {
		try {
			const role = await db(this.tableName)
				.select('*')	
				.where({ id })
				.first();

			if (!role) {
				throw new ThrowsError("Role not found", 404);
			}

			return role;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async create(role: createChampionRoleDTO): Promise<ChampionRole> {
		try {
			const createdRole = await db(this.tableName).insert(role).returning('*');
			if (!createdRole || createdRole.length === 0) {
				throw new ThrowsError("Role not created", 404);
			}
			return createdRole[0];
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			console.log(error)
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async update(championRole: updateChampionRoleDTO): Promise<updateChampionRoleDTO> {
		try {
			const updatedRole = await db(this.tableName).where({ id: championRole.id }).update(championRole).returning('*');

			if (!updatedRole || updatedRole.length === 0) {
				throw new ThrowsError("Role not updated", 404);
			}
			return updatedRole[0];
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const deletedRole = await db(this.tableName).where({ id }).del();

			if (!deletedRole) {
				throw new ThrowsError("Role not deleted", 404);
			}
			return deletedRole == 1;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async getByName(name: string): Promise<ChampionRole[]> {
		try {
			const role = await db(this.tableName)
				.select('*')	
				.where({ name });

			if (!role) {
				throw new ThrowsError("Role not found", 404);
			}

			return role;
		}  catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}
}
