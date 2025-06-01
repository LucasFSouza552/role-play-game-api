import db from "../database/db";
import { createUserDTO, updateUserDTO, userDTO } from "../DTOS/UserDTO";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { FilterUser } from "../models/Filters";
import { user } from "../models/User";

export class UserRepository implements RepositoryInterface<createUserDTO, updateUserDTO, userDTO> {
	tableName = 'users';

	async getAll(filter: FilterUser): Promise<user[]> {
		try {
			console.log(filter);
			return await db(this.tableName).select('*')
				.limit(filter.limit)
				.offset((filter.page - 1) * filter.limit)
				.modify((query) => {
					if (filter.name) {
						query.whereILike('name', `%${filter.name}%`);
					}
					if(filter.role) {
						query.where('role', filter.role);
					}
				})
				.orderBy(filter.orderBy, filter.order);
		} catch (error) {
			throw new Error('Error fetching users');
		}
	}

	async getById(id: number): Promise<user> {
		try {
			const user = await db(this.tableName).where({ id }).first();
			if(!user) throw new Error('User not found');
			return user;
		} catch (error) {
			throw new Error('Error fetching user');
		}
	}

	async create(user: createUserDTO): Promise<userDTO> {
		try {
			const createdUser = await db(this.tableName).insert(user).returning('*');
			return createdUser[0];
		} catch (error) {
			throw new Error('Error creating user');
		}
	}

	async update(user: updateUserDTO): Promise<updateUserDTO> {
		try {
			const updatedUser = await db(this.tableName).where({ id: user.id }).update(user).returning('*');
			return updatedUser[0];
		} catch (error) {
			throw new Error('Error updating user');
		}
	}

	async findByEmail(email: string): Promise<user> {
		try {
			const user = await db(this.tableName).where({ email }).first();
			if (!user) throw new Error('User not found');
			return user;
		} catch (error) {
			throw new Error('Error fetching user by email');
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const deletedUser = await db(this.tableName).where({ id }).del();
			return deletedUser == 1;
		} catch (error) {
			throw new Error('Error deleting user');
		}
	}
}
