import db from "../database/db";
import { createInventoryDTO } from "../DTOS/InventoryDTO";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { Filter } from "../models/Filters";
import { Inventory } from "../models/Inventory";

export class ChampionInventoryRepository implements RepositoryInterface<createInventoryDTO, Inventory, Inventory>{
	private tableName = "champion_inventory";

	async create(inventory: createInventoryDTO): Promise<Inventory> {
		try {
			const newInventory = await db(this.tableName).insert(inventory).returning("*");
			if(!newInventory || newInventory.length === 0){
				throw new Error("Inventory not created");
			}
			return newInventory[0];
		} catch (error) {
			throw new Error("Error creating inventory");
		}
	}
	async delete(id: number, userId: number): Promise<boolean> {
		try {
			const deletedInventory = await db(this.tableName).where({ id }).del();
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
	async getById(id: number, championId: number): Promise<Inventory> {
		try {
			const inventory: Inventory = await db(this.tableName).where({ id, championId}).first();
			if (!inventory) throw new Error("Inventory not found");
			const itens = await db("champion_items").where({ inventoryId: id}).select("*");
            inventory.itens = itens || [];
			return inventory;
		} catch (error) {
			throw new Error("Error fetching inventory");
		}
	}
	async update(inventory: Inventory): Promise<Inventory> {
		try {
			const updatedInventory = await db(this.tableName).where({ id: inventory.id }).update(inventory).returning("*");
			if(!updatedInventory || updatedInventory.length === 0){
				throw new Error("Inventory not updated");
			}
			return updatedInventory[0];
		} catch (error) {
			throw new Error("Error updating inventory");
		}
	}

}
