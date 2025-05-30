import { userRepo } from "../repositories/RepositoryManager";
import { createUserDTO, updateUserDTO, userDTO } from "../DTOS/UserDTO";
import { UserMapper } from "../utils/mapppers/userMapping";
import { cryptPassword } from "../utils/bcryptPassword";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { user } from "../models/User";

export class UserService implements ServiceInterface<createUserDTO, updateUserDTO, userDTO> {

	async getAll(): Promise<userDTO[]> {
		try {
			return await userRepo.getAll();
		} catch (error) {
			throw new Error("Error fetching users");
		}
	}

    async getById(id: number): Promise<userDTO> {
		try {
			const user = await userRepo.getById(id);
			return UserMapper.mapUserToDTO(user); 
		} catch (error) {
			throw new Error("Error fetching user:");
		}
	}

	async create(user: createUserDTO): Promise<userDTO> {
		try {
			const passwordEncoded = await cryptPassword(user.password);
			user.password = passwordEncoded;

			const newUser: userDTO = await userRepo.create(user);
			return UserMapper.mapUserToDTO(newUser);
		} catch (error) {
			throw new Error("Error creating user" );
		}
	}

	async update(user: updateUserDTO): Promise<updateUserDTO> {
		if (user?.password) {
			const passwordEncoded = await cryptPassword(user.password);
			user.password = passwordEncoded;
		}
		const userUpdated: updateUserDTO = await userRepo.update(user);
		return UserMapper.mapUserToUpdateDTO(userUpdated);
	}

	async getByEmail(email: string): Promise<user> {
		try {
			return await userRepo.findByEmail(email);
		} catch (error) {
			throw new Error("Error fetching user by email");
		}
	}

	delete(id: number): Promise<boolean> {
	    throw new Error("Method not implemented.");
    }
}
