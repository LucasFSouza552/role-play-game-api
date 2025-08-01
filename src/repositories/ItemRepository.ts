import db from "../database/db";
import { createItemDTO, updateItemDTO } from "../DTOS/ItemDTO";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { FilterItem } from "../models/Filters";
import { Item } from "../models/Item";
import { ThrowsError } from "../errors/ThrowsError";
import { ItemType } from "../models/enums/ItemType";


export class ItemRepository implements RepositoryInterface<createItemDTO, updateItemDTO, Item> {
	private tableName = "items";

	async getAll(filter: FilterItem): Promise<Item[]> {
		try {
			const allItems = await db(this.tableName)
				.select("*")
				.limit(filter.limit)
				.offset((filter.page - 1) * filter.limit)
				.modify((query) => {
					if (filter.name) {
						query.whereILike("items.name", `%${filter.name}%`);
					}
					if (filter.minPrice !== undefined) {
						query.where("items.priceMin", ">=", filter.minPrice);
					}
					if (filter.maxPrice !== undefined) {
						query.where("items.priceMax", "<=", filter.maxPrice);
					}
					if (filter.type) {
						query.where("items.type", filter.type as ItemType);
					}
				}).orderBy(filter.orderBy, filter.order);

			if (!allItems) {
				throw new ThrowsError("Items not found", 404);
			}

			return allItems;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}


	async getById(id: number): Promise<Item> {
		try {
			const item = await db(this.tableName).where({ id }).first();
			if (!item) {
				throw new ThrowsError("Item not found", 404);
			}
			return item;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}


	async create(item: createItemDTO): Promise<Item> {
		try {
			const itemExists = await db(this.tableName).where({ name: item.name }).first();
			if (itemExists) {
				throw new ThrowsError("Item already exists", 400);
			}

			const newItem = await db(this.tableName).insert(item).returning("*");
			if (!newItem || newItem.length === 0) {
				throw new ThrowsError("Item not created", 404);
			}
			return newItem[0];
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async update(item: updateItemDTO): Promise<Item> {
		try {
			const updatedItem = await db(this.tableName)
				.where({ id: item.id })
				.update(item)
				.returning("*");
			if (!updatedItem || updatedItem.length === 0) {
				throw new ThrowsError("Item not updated", 404);
			}
			return updatedItem[0];
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const deletedItem = await db(this.tableName).where({ id }).del();

			if (!deletedItem) {
				throw new ThrowsError("Item not deleted", 404);
			}

			return deletedItem == 1;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}
}
