import db from "../database/db";
import { createUserDTO, updateUserDTO, userDTO } from "../DTOS/Users/UserDTO";
import { user } from "../models/User";

export class UserRepository {
    tableName = 'users'

    async getAll(): Promise<user[]> {
        return await db(this.tableName).select('*');
    }

    async findById(id: number): Promise<user> {
        return await db(this.tableName).where({ id }).first();
    }

    async create(user: createUserDTO): Promise<userDTO> {
        const [User] = await db(this.tableName).insert(user).returning('*');
        return User;
    }

    async update(user: updateUserDTO): Promise<userDTO> {
        return await db(this.tableName).where({ id: user.id }).update(user).returning('*').then((rows) => rows[0]);
    }

    async findByEmail(email: string): Promise<user> {
        return await db(this.tableName).where({ email }).first();
    }

}