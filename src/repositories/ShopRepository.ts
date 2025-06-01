import db from "../database/db";
import { createShopDTO, updateShopDTO } from "../DTOS/ShopDTO";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { FilterShop } from "../models/Filters";
import { Shop } from "../models/Shop";

export class ShopRepository implements RepositoryInterface<createShopDTO, updateShopDTO, Shop> {
    private tableName = 'shop';
    async getAll(filter: FilterShop): Promise<Shop[]> {
        try {
            const shops = await db(this.tableName)
                .select('*')
                .limit(filter.limit)
                .offset((filter.page - 1) * filter.limit)
                .modify((query) => {
                    if (filter.name) query.whereILike('name', `%${filter.name}%`);
                    if (filter.type) query.where('type', filter.type);
                }).orderBy(filter.orderBy, filter.order);
            return shops;
        } catch (error) {
            throw new Error("Error getting all shops");
        }
    }

    async getById(id: number): Promise<Shop> {
        try {
            const shop = await db(this.tableName).where({ id }).first();
            if (!shop) throw new Error("Shop not found");
            return shop;
        } catch (error) {
            throw new Error("Error getting shop by id");
        }
    }

    async create(shop: createShopDTO): Promise<Shop> {
        try {
            const createdShop = await db(this.tableName).insert(shop).returning('*');
            return createdShop[0];
        } catch (error) {
            throw new Error("Error creating shop");
        }
    }

    async update(shop: updateShopDTO): Promise<updateShopDTO> {
        try {
            const updatedShop = await db(this.tableName).where({ id: shop.id }).update(shop).returning('*');
            return updatedShop[0];
        } catch (error) {
            throw new Error("Error updating shop");
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const deletedShop = await db(this.tableName).where({ id }).del();
            return deletedShop == 1;
        } catch (error) {
            throw new Error("Error deleting shop");
        }
    }
}