import db from "../database/db";
import { createInventoryDTO, updateInventoryDTO } from "../DTOS/InventoryDTO";
import { ThrowsError } from "../errors/ThrowsError";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { Filter } from "../models/Filters";
import { Inventory } from "../models/Inventory";
import { InventoryItens } from "../models/InventoryItens";

export class ChampionInventoryRepository implements RepositoryInterface<createInventoryDTO, updateInventoryDTO, Inventory> {

	private tableName = "champion_inventory";

	async create(inventory: createInventoryDTO): Promise<Inventory> {
		try {
			const newInventory = await db(this.tableName).insert(inventory).returning("*");
			if (!newInventory || newInventory.length === 0) {
				throw new ThrowsError("Inventory not created", 404);
			}
			return newInventory[0];
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}
	async delete(id: number, ownerId: number): Promise<boolean> {
		try {
			const deletedInventory = await db(this.tableName).where({ id, ownerId }).del();
			if (!deletedInventory) {
				throw new ThrowsError("Inventory not deleted", 404);
			}
			return deletedInventory == 1;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}
	async getAll(filter: Filter): Promise<Inventory[]> {
		try {
			const inventories = await db(this.tableName)
				.select("*")
				.limit(filter.limit)
				.offset((filter.page - 1) * filter.limit)
				.orderBy(filter.orderBy, filter.order);
			if (!inventories) {
				throw new ThrowsError("Inventories not found", 404);
			}
			return inventories;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}
	async getItemsById(inventoryId: number): Promise<InventoryItens[]> {
		try {
			const itens = await db("champion_items")
				.join('items', 'champion_items.itemId', '=', 'items.id')
				.select("items.id", "items.name", "items.description","champion_items.quantity", "items.type", "champion_items.rarity", "champion_items.price")
				.where({ inventoryId });
			if (!itens) {
				throw new ThrowsError("Items not found", 404);
			}
			return itens || [];
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	/**
	* Busca um inventario pelo id
	* @param inventoryId id do inventário
	*/
	async getById(inventoryId: number): Promise<Inventory> {
		try {
			const inventory: Inventory = await db(this.tableName).where({ id: inventoryId }).first();
				if (!inventory) {
				throw new ThrowsError("Inventory not found", 404);
			}
			return inventory;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}
	async update(inventory: updateInventoryDTO): Promise<updateInventoryDTO> {
		try {
			const updatedInventory = await db(this.tableName).where({ id: inventory.id }).update(inventory).returning("*");
			if (!updatedInventory || updatedInventory.length === 0) {
				throw new ThrowsError("Inventory not updated", 404);
			}
			return updatedInventory[0];
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async getInventoryByOwnerAndChampionId(championId: number, userId: number): Promise<Inventory> {
		try {
			const inventory: Inventory = await db("champion_inventory as i")
				.select("i.*")
				.join("champions as c", "i.ownerId", "=", "c.id")
				.where("c.userId", userId)
				.andWhere("i.ownerId", championId)
				.first();
			if (!inventory) {
				throw new ThrowsError("Inventory not found", 404);
			}

			const items = await this.getItemsById(inventory.id);

			if (!items) {
				throw new ThrowsError("Items not found", 404);
			}

			inventory.itens = items;

			return inventory;
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async getItemById(inventoryId:number, itemId:number): Promise<InventoryItens | null> {
		try {
			const itens = await db("champion_items")
				.join('items', 'champion_items.itemId', '=', 'items.id')
				.select("items.id", "items.name", "items.description","champion_items.quantity", "items.type", "rarity", "champion_items.price")
				.where({ inventoryId, itemId }).first();
			if (!itens) {
				return null;
			}
			return itens;
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async createInventoryItem(inventoryId: number, itemId: number, quantity: number, price: number, rarity: string): Promise<InventoryItens> {
		try {
			const newItem = await db("champion_items").insert({ inventoryId, itemId, quantity, price, rarity }).returning("*");
			if (!newItem || newItem.length === 0) {
				throw new ThrowsError("Item not added to inventory", 404);
			}
			return newItem[0];
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async updateInventoryItem(inventoryId: number, itemId: number, quantity?: number, price?: number): Promise<InventoryItens> {
		try {
			const updatedItem = await db("champion_items").where({ inventoryId, itemId }).update({ quantity: db.raw(`quantity + ${quantity || 0}`), price:  db.raw(` ${price || "price"}`)  }).returning("*");
			if (!updatedItem || updatedItem.length === 0) {
				throw new ThrowsError("Item not updated in inventory", 404);
			}
			return updatedItem[0];
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async removeInventoryItem(inventoryId: number, itemId: number): Promise<boolean> {
		try {
			const deletedItem = await db("champion_items").where({ inventoryId, itemId }).del();
			if (!deletedItem) {
				throw new ThrowsError("Item not removed from inventory", 404);
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
