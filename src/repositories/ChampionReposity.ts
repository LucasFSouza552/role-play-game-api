import db from "../database/db";
import { Champion } from "../models/Champion";


export class ChampionRepository {
    private tableName = 'champions';

    async findAll() {
        return await db(this.tableName).select('*');
    }

    async findById(id: number) {
        return await db(this.tableName).where({ id }).first();
    }

    async create(champion: Champion) {
        return await db(this.tableName).insert(champion)
    }

}