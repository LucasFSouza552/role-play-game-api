import { userRepo } from "../repositories/RepositoriosManager";
import { user } from "../models/User";

export class UserService {
    async getAllUsers(): Promise<user[]> {
        return await userRepo.getAll();
    }

    async getUserById(id: string): Promise<user> {
        return await userRepo.findById(id);
    }

    async createUser(user: Omit<user, 'id'>): Promise<user> {
        return await userRepo.create(user);
    }

    async updateUser(id: string, user: user): Promise<user> {
        return await userRepo.update(id, user);
    }

    async getUserByEmail(email: string) {
        return await userRepo.findByEmail(email);
    }
}