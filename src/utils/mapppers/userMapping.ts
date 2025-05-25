
import { createUserDTO, updateUserDTO, userDTO } from "../../DTOS/UserDTO";
import { user } from "../../models/User";

export class UserMapper {

    public static mapUserToDTO(user: user | userDTO): userDTO {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
    }

    public static mapUserToDTOList(users: user[]): userDTO[] {
        return users.map(user => this.mapUserToDTO(user));
    }

    public static mapCreateUserToDTO(user: user): createUserDTO {
        return {
            name: user.name,
            email: user.email,
            password: user.password
        };
    }

    public static mapUserToUpdateDTO(user: updateUserDTO): updateUserDTO {
        return {
            id: user.id,
            name: user.name,
            password: user.password
        };
    }
}
