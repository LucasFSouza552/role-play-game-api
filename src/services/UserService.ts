import { userRepo } from "../repositories/RepositoryManager";
import { createUserDTO, updateUserDTO, userDTO } from "../DTOS/UserDTO";
import { UserMapper } from "../utils/mapppers/userMapping";
import { cryptPassword } from "../utils/bcryptPassword";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { user } from "../models/User";
import { FilterUser } from "../models/Filters";
import { ThrowsError } from "../errors/ThrowsError";

export class UserService implements ServiceInterface<createUserDTO, updateUserDTO, userDTO> {

	async getAll(filter: FilterUser): Promise<userDTO[]> {
		try {
			const users = await userRepo.getAll(filter);
			if (!users) {
				throw new ThrowsError("Users not found", 404);
			}
			return users;
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error while fetching users", 500);
		}
	}

	async getById(id: number): Promise<userDTO> {
		try {
			const user = await userRepo.getById(id);
			if (!user) {
				throw new ThrowsError("User not found", 404);
			}
			return UserMapper.mapUserToDTO(user); 
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error while fetching user", 500);
		}
	}

	async create(user: createUserDTO): Promise<userDTO> {
		try {
			const passwordEncoded = await cryptPassword(user.password);
			user.password = passwordEncoded;

			const newUser: userDTO = await userRepo.create(user);
			if (!newUser) {
				throw new ThrowsError("Error creating user", 404);
			}
			return UserMapper.mapUserToDTO(newUser);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error while creating user", 500);
		}
	}

	async update(user: updateUserDTO): Promise<updateUserDTO> {
		try {
			if (user?.password) {
				const passwordEncoded = await cryptPassword(user.password);
				user.password = passwordEncoded;
			}
			const userUpdated: updateUserDTO = await userRepo.update(user);
			if (!userUpdated) {
				throw new ThrowsError("Error updating user", 404);
			}
			return UserMapper.mapUserToUpdateDTO(userUpdated);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error while updating user", 500);
		}
	}

	async getByEmail(email: string): Promise<user> {
		try {
			const user = await userRepo.findByEmail(email);
			if (!user) {
				throw new ThrowsError("User not found", 404);
			}
			return user;
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error while fetching user by email", 500);
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const userDeleted = await userRepo.delete(id);
			if (!userDeleted) {
				throw new ThrowsError("Error deleting user", 404);
			}
			return userDeleted;
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error while deleting user", 500);
		}
	}
}
