import db from "../database/db";
import { createChampionRoleDTO, updateChampionRoleDTO } from "../DTOS/ChampionRoleDTO";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { ChampionRole } from "../models/ChampionRole";
import { FilterChampionRole } from "../models/Filters";

export class ChampionRoleRepository implements RepositoryInterface<createChampionRoleDTO, updateChampionRoleDTO, ChampionRole> {
	private tableName = 'champion_roles';

	async getAll(filter: FilterChampionRole): Promise<ChampionRole[]> {
		return await db(this.tableName)
			.select('*')
			.limit(filter.limit)
			.offset((filter.page - 1) * filter.limit)
			.modify((query) => {
				if (filter.name) {
					query.whereILike('champion_roles.name', `%${filter.name}%`);
				}
			});
	}

	async getById(id: number): Promise<ChampionRole> {
		try {
			return await db(this.tableName)
				.where({ id })
				.select('*').first();
		} catch (error) {
			throw new Error('Erro ao buscar role pelo id');
		}
	}

	async findByName(name: string) {
		try {
			return await db(this.tableName)
				.whereILike({ name })
				.first();
		} catch (error) {
			throw new Error('Erro ao buscar role pelo nome');
		}
	}

	async create(role: createChampionRoleDTO): Promise<ChampionRole> {
		try {
			const createdRole = await db(this.tableName).insert(role).returning('*');
			return createdRole[0];
		} catch (error) {
			console.log(error);
			throw new Error('Erro ao criar role');
		}
	}

	async update(championRole: updateChampionRoleDTO): Promise<ChampionRole> {
		try {
			return await db(this.tableName).where({ id: championRole.id }).update(championRole);
		} catch (error) {
			throw new Error('Erro ao atualizar role');
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const deletedRole = await db(this.tableName).where({ id }).del();
			return deletedRole == 1;
		} catch (error) {
			throw new Error('Erro ao deletar role');
		}
	}
}
