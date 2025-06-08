import { createInventoryDTO, updateInventoryDTO } from "../DTOS/InventoryDTO";
import { ThrowsError } from "../errors/ThrowsError";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { Filter } from "../models/Filters";
import { Inventory } from "../models/Inventory";
import { InventoryItens } from "../models/InventoryItens";
import { championInventoryRepo, itemsRepo, } from "../repositories/RepositoryManager";

export class ChampionInventoryService implements ServiceInterface<createInventoryDTO, updateInventoryDTO, Inventory> {
	async getAll(filter: Filter): Promise<Inventory[]> {
		try {
			const inventory = await championInventoryRepo.getAll(filter);
			if (!inventory) {
				throw new ThrowsError("Inventory not found", 404);
			}
			return inventory;
		} catch (error) {
			throw new ThrowsError("Internal server error", 500);
		}
	}
	async getById(id: number): Promise<Inventory> {
		try {
			const inventory = await championInventoryRepo.getById(id);
			if (!inventory) {
				throw new ThrowsError("Inventory not found", 404);
			}
			return inventory;
		} catch (error) {
			throw new ThrowsError("Internal server error", 500);
		}
	}
	async create(inventory: createInventoryDTO): Promise<Inventory> {
		try {
			const newInventory = await championInventoryRepo.create(inventory);
			if (!newInventory) {
				throw new ThrowsError("Inventory not created", 404);
			}
			return newInventory;
		} catch (error) {
			throw new ThrowsError("Internal server error", 500);
		}
	}
	async update(inventory: updateInventoryDTO): Promise<updateInventoryDTO> {
		try {
			const updatedInventory = await championInventoryRepo.update(inventory);
			if (!updatedInventory) {
				throw new ThrowsError("Inventory not updated", 404);
			}
			return updatedInventory;
		} catch (error) {
			throw new ThrowsError("Internal server error", 500);
		}
	}
	async delete(id: number, userId: number): Promise<boolean> {
		try {
			const deletedInventory = await championInventoryRepo.delete(id, userId);
			if (!deletedInventory) {
				throw new ThrowsError("Inventory not deleted", 404);
			}
			return deletedInventory;
		} catch (error) {
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async createItemInventory(inventoryId: number, item: number, quantity: number, price: number, rarity: string): Promise<InventoryItens> {
		try {
			const itemExists = await itemsRepo.getById(item);
			if (!itemExists) {
				throw new ThrowsError("Item not found", 404);
			}

			if (price <= 0 || price === undefined) {
				throw new ThrowsError("Invalid item price", 400);
			}

			const itemInventory = await championInventoryRepo.createInventoryItem(inventoryId, item, quantity, price, rarity);
			if (!itemInventory) {
				throw new ThrowsError("Item not created", 404);
			}
			return itemInventory;
		} catch (error) {
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async removeItemInventory(inventoryId: number, item: number): Promise<InventoryItens> {
		try {
			const inventory: Inventory = await championInventoryRepo.getById(inventoryId);

			if (inventory.itens && inventory.itens.length <= 0) {
				throw new ThrowsError("Inventory is empty", 404);
			}

			const itemExists = inventory.itens?.find((i: InventoryItens) => i.itemId === item);
			if (!itemExists) {
				throw new ThrowsError("Item not found in inventory", 404);
			}

			const itemInventory = await championInventoryRepo.updateInventoryItem(inventoryId, item, 0);
			if (!itemInventory) {
				throw new ThrowsError("Item not updated", 404);
			}
			return itemInventory;
		} catch (error) {
			throw new ThrowsError("Internal server error", 500);
		}
	}
}
