import { createInventoryDTO, updateInventoryDTO } from "../DTOS/InventoryDTO";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { Filter } from "../models/Filters";
import { Inventory } from "../models/Inventory";
import { InventoryItens } from "../models/InventoryItens";
import { Item } from "../models/Item";
import { championInventoryRepo, itemsRepo, } from "../repositories/RepositoryManager";

export class ChampionInventoryService implements ServiceInterface<createInventoryDTO, updateInventoryDTO, Inventory> {
	async getAll(filter: Filter): Promise<Inventory[]> {
		try {
			return await championInventoryRepo.getAll(filter);
		} catch (error) {
			throw new Error("Error fetching inventories");
		}
	}
	async getById(id: number): Promise<Inventory> {
		try {
			return await championInventoryRepo.getById(id);
		} catch (error) {
			throw new Error("Error fetching inventory");
		}
	}
	async create(inventory: createInventoryDTO): Promise<Inventory> {
		try {
			return await championInventoryRepo.create(inventory);
		} catch (error) {
			throw new Error("Error creating inventory");
		}
	}
	async update(inventory: updateInventoryDTO): Promise<updateInventoryDTO> {
		try {
			return await championInventoryRepo.update(inventory);
		} catch (error) {
			throw new Error("Error updating inventory");
		}
	}
	async delete(id: number, userId: number): Promise<boolean> {
		try {
			return await championInventoryRepo.delete(id, userId);
		} catch (error) {
			throw new Error("Error deleting inventory");
		}
	}

	async createItemInventory(inventoryId: number, item: number, quantity: number): Promise<InventoryItens> {
		try {

			const itemExists = await itemsRepo.getById(item);
			if (!itemExists) {
				throw new Error("Item not found");
			}

			const itemInventory = await championInventoryRepo.createInventoryItem(inventoryId, item, quantity);
			return itemInventory;
		} catch (error) {
			throw new Error("Error adding item to inventory");
		}
	}

	async removeItemInventory(inventoryId: number, item: number): Promise<InventoryItens> {
		try {
			const inventory: Inventory = await championInventoryRepo.getById(inventoryId);

			if (inventory.itens && inventory.itens.length <= 0) {
				throw new Error("Inventory is empty");
			}

			const itemExists = inventory.itens?.find((i: InventoryItens) => i.itemId === item);
			if (!itemExists) {
				throw new Error("Item not found in inventory");
			}

			const itemInventory = await championInventoryRepo.updateInventoryItem(inventoryId, item, 0);
			return itemInventory;
		} catch (error) {
			throw new Error("Error removing item from inventory");
		}
	}
}
