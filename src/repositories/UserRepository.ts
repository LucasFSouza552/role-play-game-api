import db from "../database/db";
import { user } from "../models/User";

export class UserRepository {
    tableName = 'users'

    async getAll(): Promise<user[]> {
        return await db(this.tableName).select('*');
    }

    async findById(id: number): Promise<user> {
        return await db(this.tableName).where({ id }).first();
    }

    async create(user: Omit<user, 'id'>): Promise<user> {
        const [User] = await db(this.tableName).insert(user).returning('*');
        return User;
    }

    async update(user: user): Promise<user> {
        return await db(this.tableName).where({ id: user.id }).update(user).returning('*').then((rows) => rows[0]);
    }

    async findByEmail(email: string): Promise<user> {
        return await db(this.tableName).where({ email }).first();
    }

}