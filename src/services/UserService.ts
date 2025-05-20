import { userRepo } from "../repositories/RepositoryManager";
import { user } from "../models/User";
import { createUserDTO, updateUserDTO, userDTO } from "../DTOS/Users/UserDTO";

export class UserService {
    async getAllUsers(): Promise<user[]> {
        return await userRepo.getAll();
    }

    async getUserById(id: number): Promise<user> {
        return await userRepo.findById(id);
    }

    async createUser(user: createUserDTO): Promise<userDTO> {
        return await userRepo.create(user);
    }

    async updateUser(user: updateUserDTO): Promise<userDTO> {
        return await userRepo.update(user);
    }

    async getUserByEmail(email: string) {
        return await userRepo.findByEmail(email);
    }
}