import db from "../database/db";
import { createUserDTO, updateUserDTO, userDTO } from "../DTOS/UserDTO";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { user } from "../models/User";

export class UserRepository implements RepositoryInterface<createUserDTO, updateUserDTO, userDTO> {
	tableName = 'users';

	async getAll(): Promise<user[]> {
		try {
			return await db(this.tableName).select('*');
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
			const [User] = await db(this.tableName).insert(user).returning('*');
			return User;
		} catch (error) {
			throw new Error('Error creating user');
		}
	}

	async update(user: updateUserDTO): Promise<updateUserDTO> {
		try {
			return await db(this.tableName).where({ id: user.id }).update(user).returning('*').then((rows) => rows[0]);
		} catch (error) {
			throw new Error('Error updating user');
		}
	}

	async findByEmail(email: string): Promise<user> {
		try {
			return await db(this.tableName).where({ email }).first();
		} catch (error) {
			throw new Error('Error fetching user by email');
		}
	}

	async delete(id: number): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
}
