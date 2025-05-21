import { userRepo } from "../repositories/RepositoryManager";
import { createUserDTO, updateUserDTO, userDTO } from "../DTOS/Users/UserDTO";
import { UserMapper } from "../utils/mapppers/userMapping";
import { cryptPassword } from "../utils/bcryptPassword";

export class UserService {
    async getAllUsers(): Promise<userDTO[]> {
        return await userRepo.getAll();
    }

    async getUserById(id: number): Promise<userDTO> {
        try {
            const user = await userRepo.findById(id);
            return UserMapper.mapUserToDTO(user);       
        } catch (error) {
            throw new Error("Erro ao buscar usuário: " + error);
        }
    }

    async createUser(user: createUserDTO): Promise<userDTO> {
        try {
            
            const passwordEncoded = await cryptPassword(user.password);
            user.password = passwordEncoded;

            const newUser: userDTO =  await userRepo.create(user);
            return UserMapper.mapUserToDTO(newUser);
        } catch (error) {
            throw new Error("Erro ao criar usuário: " + error);
        }
    }

    async updateUser(user: updateUserDTO): Promise<updateUserDTO> {
        if (user?.password) {
            const passwordEncoded = await cryptPassword(user.password);
            user.password = passwordEncoded;
        }

        const userUpdated: updateUserDTO = await userRepo.update(user);
        return UserMapper.mapUserToUpdateDTO(userUpdated);
    }

    async getUserByEmail(email: string) {
        return await userRepo.findByEmail(email);
    }
}