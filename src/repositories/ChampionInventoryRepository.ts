import db from "../database/db";
import { ChampionDTO } from "../DTOS/ChampionDTO";
import { createInventoryDTO, updateInventoryDTO } from "../DTOS/InventoryDTO";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { Filter } from "../models/Filters";
import { Inventory } from "../models/Inventory";
import { InventoryItens } from "../models/InventoryItens";

export class ChampionInventoryRepository implements RepositoryInterface<createInventoryDTO, updateInventoryDTO, Inventory> {

	private tableName = "champion_inventory";

	async create(inventory: createInventoryDTO): Promise<Inventory> {
		console.log("Creating inventory:", inventory);
		try {
			const newInventory = await db(this.tableName).insert(inventory).returning("*");
			if (!newInventory || newInventory.length === 0) {
				throw new Error("Inventory not created");
			}
			return newInventory[0];
		} catch (error) {
			throw new Error("Error creating inventory");
		}
	}
	async delete(id: number, ownerId: number): Promise<boolean> {
		try {
			const deletedInventory = await db(this.tableName).where({ id, ownerId }).del();
			return deletedInventory == 1;
		} catch (error) {
			throw new Error("Error deleting inventory");
		}
	}
	async getAll(filter: Filter): Promise<Inventory[]> {
		try {
			const inventories = await db(this.tableName).select("*")
				.limit(filter.size)
				.offset(filter.offset)
				.orderBy(filter.orderBy, filter.order);
			return inventories;
		} catch (error) {
			throw new Error("Error fetching inventories");
		}
	}
	async getByIdWithItems(id: number, ownerId?: number): Promise<Inventory> {
		try {
			const inventory: Inventory = await db(this.tableName).where({ id, ownerId }).first();
			if (!inventory) throw new Error("Inventory not found");
			const itens = await db("champion_items").where({ inventoryId: id }).select("*");
			inventory.itens = itens || [];
			return inventory;
		} catch (error) {
			throw new Error("Error fetching inventory");
		}
	}
	async getByChampionId(userId: number, championId: number): Promise<Inventory> {
		try {
			const inventory: Inventory = await db(this.tableName).where({ championId, ownerId: userId }).first();
			if (!inventory) throw new Error("Inventory not found");
			return inventory;
		} catch (error) {
			throw new Error("Error fetching inventory");
		}
	}

	async getById(championId: number, userId: number): Promise<Inventory> {
		try {
			const inventory: Inventory = await db(this.tableName)
				.join("champions", "champions.id", "champion_inventory.championId")
				.where({ ownerId: championId })
				.first();

			if (!inventory) {
				//Cria o invetário
				const newInventory: createInventoryDTO = {
					ownerId: userId,
					capacity: 20
				}

				const createdInventory = await this.create(newInventory);
				return createdInventory;
			}
			return inventory;
		} catch (error) {
			throw new Error("Error fetching inventory");
		}
	}
	async update(inventory: updateInventoryDTO): Promise<updateInventoryDTO> {
		try {
			const updatedInventory = await db(this.tableName).where({ id: inventory.id }).update(inventory).returning("*");
			if (!updatedInventory || updatedInventory.length === 0) {
				throw new Error("Inventory not updated");
			}
			return updatedInventory[0];
		} catch (error) {
			throw new Error("Error updating inventory");
		}
	}

	async createInventoryItem(inventoryId: number, itemId: number, quantity: number): Promise<InventoryItens> {
		try {
			const newItem = await db("champion_items").insert({ inventoryId, itemId, quantity }).returning("*");
			return newItem[0];
		} catch (error) {
			throw new Error("Error adding item to inventory");
		}
	}

	async updateInventoryItem(inventoryId: number, itemId: number, quantity: number): Promise<InventoryItens> {
		try {
			const updatedItem = await db("champion_items").where({ inventoryId, itemId }).update({ quantity: db.raw(`quantity + ${quantity}`) }).returning("*");
			return updatedItem[0];
		} catch (error) {
			throw new Error("Error adding item to inventory");
		}
	}

	async removeInventoryItem(inventoryId: number, itemId: number): Promise<boolean> {
		try {
			const itemInventory: InventoryItens = await db("champion_items").where({ inventoryId, itemId }).first();
			if (!itemInventory) {
				throw new Error("Item not found in inventory");
			}
			const deletedItem = await db("champion_items").where({ inventoryId, itemId }).del();

			return deletedItem == 1;
		} catch (error) {
			throw new Error("Error adding item to inventory");
		}
	}
}
