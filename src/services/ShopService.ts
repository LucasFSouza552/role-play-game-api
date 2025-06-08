import { ServiceInterface } from "../interfaces/serviceInterface";
import { shopRepo, shopInventoryRepo, championInventoryRepo ,championRepo } from "../repositories/RepositoryManager";
import { createShopDTO, updateShopDTO } from "../DTOS/ShopDTO";
import { ChampionDTO } from "../DTOS/ChampionDTO";
import { Shop } from "../models/Shop";
import { Champion } from "../models/Champion";
import { InventoryItens } from "../models/InventoryItens";
import { FilterShop } from "../models/Filters";
import { Inventory } from "../models/Inventory";
import db from '../database/db';
import { ThrowsError } from "../errors/ThrowsError";

export class ShopService implements ServiceInterface<createShopDTO, updateShopDTO, Shop> {
	async getInventory(shopId: number) {
		try {
			const inventory = await shopInventoryRepo.getInventoryAndItemsById(shopId);
			if (!inventory) {
				throw new ThrowsError("Inventory not found", 404);
			}
			return inventory;
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async getAll(filter: FilterShop): Promise<Shop[]> {
		try {
			const shops = await shopRepo.getAll(filter);
			if (!shops) {
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
			const shop = await shopRepo.getById(id);
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
			const createdShop = await shopRepo.create(shop);
			if (!createdShop) {
				throw new ThrowsError("Error creating shop", 404);
			}

			const inventory = await shopInventoryRepo.create({ownerId: createdShop.id,capacity: 100});
			if(!inventory) {
				throw new ThrowsError("Error creating inventory", 404);
			}
			return createdShop;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			console.debug(error);
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async update(shop: updateShopDTO): Promise<updateShopDTO> {
		try {
			const shopToUpdate = await shopRepo.getById(shop.id);
			if(!shopToUpdate) {
				throw new ThrowsError("Shop not found", 404);
			}
			
			if(shopToUpdate.type !== shop.type) {
				throw new ThrowsError("You cannot change the type of a shop", 400);
			}

			if(shop.name) {
				shopToUpdate.name = shop.name;
			}
			if(shop.type) {
				shopToUpdate.type = shop.type;
			}
			
			const updatedShop = await shopRepo.update(shopToUpdate);
			if (!updatedShop) {
				throw new ThrowsError("Error updating shop", 404);
			}
			return updatedShop;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const deletedShop = await shopRepo.delete(id);
			if (!deletedShop) {
				throw new ThrowsError("Error deleting shop", 404);
			}
			return deletedShop;
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

	async purchase(shopId: number, userId: number, championId: number, itemId: number, quantity: number): Promise<boolean> {
		return await db.transaction(async trx => {
			const champion: ChampionDTO = await championRepo.getById(championId, userId);

			if(!champion) {
				throw new ThrowsError('Champion not found', 404);
			}

			const inventory: Inventory = await shopInventoryRepo.getInventoryByShopId(shopId);
			const championInventory: Inventory = await championInventoryRepo.getInventoryByOwnerAndChampionId(championId, userId); 

			if(!inventory || !championInventory) {
				throw new ThrowsError('Inventory not found', 404);
			}

			const item: InventoryItens = await shopInventoryRepo.getItemById(inventory.id, itemId);

			if(!item || item.quantity - quantity < 0) {
				throw new ThrowsError("Item not found in shop inventory", 404);
			}

			if(item.price * quantity > champion.money) {
				throw new ThrowsError("Not enough money", 400);
			}

			const updatedShop = await shopInventoryRepo.updateInventoryItem(inventory.id, itemId, -quantity);
			if(!updatedShop) {
				throw new ThrowsError("Error updating shop inventory", 404);
			}
			item.quantity -= quantity;

			const itemExists = await championInventoryRepo.getItemById(championInventory.id, itemId);
			const updatedChampionMoney = parseFloat((parseFloat(champion.money.toString()) - item.price * quantity).toFixed(2));
			await championRepo.updateMoney(championId, updatedChampionMoney);

			if(!itemExists) {
				await championInventoryRepo.createInventoryItem(championInventory.id, item.id, quantity, item.price, item.rarity);
				return true;
			}

			const updatedChampion = await championInventoryRepo.updateInventoryItem(championInventory.id, item.id, quantity);
			if(updatedChampion) {
				return true;
			}
			return false;
		});
	}

	async sell(shopId: number,userId: number,championId: number, itemId: number, quantity: number): Promise<boolean> {
		try {
			return await db.transaction(async trx => {

				const champion: ChampionDTO = await championRepo.getById(championId, userId);
				if (!champion) throw new ThrowsError('Champion not found', 404);

				const championInventory: Inventory = await championInventoryRepo.getInventoryByOwnerAndChampionId(championId, userId);
				if (!championInventory) throw new ThrowsError('Champion inventory not found', 404);

				const item: InventoryItens = await championInventoryRepo.getItemById(championInventory.id, itemId);
				if (!item) throw new ThrowsError("Item not found in champion inventory", 404);
				if (item.quantity < quantity) throw new ThrowsError("Not enough items in champion inventory", 400);

				await championInventoryRepo.updateInventoryItem(championInventory.id, item.id, -quantity);

				if (item.quantity - quantity <= 0) {
					await championInventoryRepo.removeInventoryItem(championInventory.id, item.id);
				}

				const shopInventory: Inventory = await shopInventoryRepo.getInventoryByShopId(shopId);
				if (!shopInventory) throw new ThrowsError('Shop inventory not found', 404);

				await shopInventoryRepo.updateInventoryItem(shopInventory.id, item.id, quantity);

				const newMoney = parseFloat((parseFloat(champion.money.toString()) + item.price * quantity).toFixed(2));
				await championRepo.updateMoney(championId, newMoney);

				return true;
			});
		} catch (error) {
			if (error instanceof ThrowsError) {
				throw error;
			}
			throw new ThrowsError("Internal server error", 500);
		}
	}

}
