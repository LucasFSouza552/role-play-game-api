import db from "../database/db";
import { createUserDTO, updateUserDTO, userDTO } from "../DTOS/UserDTO";
import { ThrowsError } from "../errors/ThrowsError";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { FilterUser } from "../models/Filters";
import { user } from "../models/User";

export class UserRepository implements RepositoryInterface<createUserDTO, updateUserDTO, userDTO> {
	tableName = 'users';

	async getAll(filter: FilterUser): Promise<user[]> {
		try {
			const users =  await db(this.tableName).select('*')
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
			if (!users) {
				throw new ThrowsError('Users not found', 404);
			}
			return users;
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError('Internal server error while fetching users', 500);
		}
	}

	async getById(id: number): Promise<user> {
		try {
			const user = await db(this.tableName).where({ id }).first();
			if(!user) {
				throw new ThrowsError('User not found', 404);
			}
			return user;
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError('Internal server error while fetching user', 500);
		}
	}

	async create(user: createUserDTO): Promise<userDTO> {
		try {
			const createdUser = await db(this.tableName).insert(user).returning('*');
			if (!createdUser) {
				throw new ThrowsError('Error creating user', 404);
			}
			return createdUser[0];
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError('Internal server error while creating user', 500);
		}
	}

	async update(user: updateUserDTO): Promise<updateUserDTO> {
		try {
			const updatedUser = await db(this.tableName).where({ id: user.id }).update(user).returning('*');
			if (!updatedUser) {
				throw new ThrowsError('Error updating user', 404);
			}
			return updatedUser[0];
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError('Internal server error while updating user', 500);
		}
	}

	async findByEmail(email: string): Promise<user> {
		try {
			const user = await db(this.tableName).where({ email }).first();
			if (!user) {
				throw new ThrowsError('User not found', 404);
			}
			return user;
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError('Internal server error while fetching user by email', 500);
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const deletedUser = await db(this.tableName).where({ id }).del();
			if (!deletedUser) {
				throw new ThrowsError('Error deleting user', 404);
			}
			return deletedUser == 1;
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError('Internal server error while deleting user', 500);
		}
	}
}
