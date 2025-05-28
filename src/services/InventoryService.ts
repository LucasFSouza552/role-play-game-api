import { ServiceInterface } from "../interfaces/serviceInterface";
import { Filter } from "../models/Filters";
import { Inventory } from "../models/Inventory";
import { ChampionInventoryRepository } from "../repositories/ChampionInventoryRepository";


const Inventory = new ChampionInventoryRepository();

export class ChampionInventoryService implements ServiceInterface<Inventory, Inventory, Inventory> {
	async getAll(filter: Filter): Promise<Inventory[]> {
		try {
			return await Inventory.getAll(filter);
		} catch (error) {
			throw new Error("Error fetching inventories");
		}
	}
	async getById(id: number, championId: number): Promise<Inventory> {
		try {
			return await Inventory.getById(id, championId);
		} catch (error) {
			throw new Error("Error fetching inventory");
		}
	}
	async create(inventory: Inventory): Promise<Inventory> {
		try {
			return await Inventory.create(inventory);
		} catch (error) {
			throw new Error("Error creating inventory");
		}
	}
	async update(inventory: Inventory): Promise<Inventory> {
		try {
			return await Inventory.update(inventory);
		} catch (error) {
			throw new Error("Error updating inventory");
		}
	}
	async delete(id: number, userId: number): Promise<boolean> {
		try {
			return await Inventory.delete(id, userId);
		} catch (error) {
			throw new Error("Error deleting inventory");
		}
	}

}
