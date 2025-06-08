import db from "../database/db";
import { createShopDTO, updateShopDTO } from "../DTOS/ShopDTO";
import { ThrowsError } from "../errors/ThrowsError";
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
			if (!shops){
				throw new ThrowsError("Shops not found", 404);
				}
			return shops;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async getById(id: number): Promise<Shop> {
		try {
			const shop = await db(this.tableName).where({ id }).first();
			if (!shop) {
				throw new ThrowsError("Shop not found", 404);
			}
			return shop;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async create(shop: createShopDTO): Promise<Shop> {
		try {
			const createdShop = await db(this.tableName).insert(shop).returning('*');
			if (!createdShop) {
				throw new ThrowsError("Error creating shop", 404);
			}
			return createdShop[0];
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async update(shop: updateShopDTO): Promise<updateShopDTO> {
		try {
			const updatedShop = await db(this.tableName).where({ id: shop.id }).update(shop).returning('*');
			if (!updatedShop) {
				throw new ThrowsError("Error updating shop", 404);
			}
			return updatedShop[0];
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const deletedShop = await db(this.tableName).where({ id }).del();
			if (!deletedShop) {
				throw new ThrowsError("Error deleting shop", 404);
			}
			return deletedShop == 1;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}
}
