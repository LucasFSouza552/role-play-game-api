import { ServiceInterface } from "../interfaces/serviceInterface";
import { shopRepo, shopInventoryRepo, championInventoryRepo ,championRepo } from "../repositories/RepositoryManager";
import { createShopDTO, updateShopDTO } from "../DTOS/ShopDTO";
import { ChampionDTO } from "../DTOS/ChampionDTO";
import { Shop } from "../models/Shop";
import { Champion } from "../models/Champion";
import { InventoryItens } from "../models/InventoryItens";
import { FilterShop } from "../models/Filters";
import { Inventory } from "../models/Inventory";

export class ShopService implements ServiceInterface<createShopDTO, updateShopDTO, Shop> {
	async getInventory(shopId: number) {
		try {
			const inventory = await shopInventoryRepo.getInventoryAndItemsById(shopId);
			return inventory;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async getAll(filter: FilterShop): Promise<Shop[]> {
		try {
			return shopRepo.getAll(filter);
		} catch (error) {
			throw new Error("Error fetching shops");
		}
	}

	async getById(id: number): Promise<Shop> {
		try {
			return shopRepo.getById(id);
		} catch (error) {
			throw new Error("Error fetching shop");
		}
	}

	async create(shop: createShopDTO): Promise<Shop> {
		try {
			return shopRepo.create(shop);
		} catch (error) {
			throw new Error("Error creating shop");
		}
	}

	async update(shop: updateShopDTO): Promise<updateShopDTO> {
		try {
			return shopRepo.update(shop);
		} catch (error) {
			throw new Error("Error updating shop");
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			return shopRepo.delete(id);
		} catch (error) {
			throw new Error("Error deleting shop");
		}
	}

	async purchase(shopId: number, userId: number, championId: number, itemId: number, quantity: number): Promise<boolean> {
		try{ 
			
			const champion: ChampionDTO = await championRepo.getById(championId, userId);
			
			if(!champion) {
				throw new Error('Champion not found');
			}
			
			const inventory: Inventory = await shopInventoryRepo.getInventoryByShopId(shopId);
			const championInventory: Inventory = await championInventoryRepo.getInventoryByOwnerAndChampionId(championId, userId); 

			if(!inventory || !championInventory) {
				throw new Error('Inventory not found');
			}

			const item: InventoryItens = await shopInventoryRepo.getItemById(inventory.id, itemId);

			if(!item || item.quantity - quantity < 0) {
				throw new Error("Item not found in shop inventory");
			}
			
			if(item.price * quantity > champion.money) {
				throw new Error("Not enough money");
			}

			const updatedShop = await shopInventoryRepo.updateInventoryItem(inventory.id, itemId, -quantity);
			item.quantity -= quantity;

			const itemExists = await championInventoryRepo.getItemById(championInventory.id, itemId);
			const updatedChampionMoney = champion.money - item.price * quantity;
			await championRepo.updateMoney(championId, updatedChampionMoney);


			if(!itemExists) {
				championInventoryRepo.createInventoryItem(championInventory.id, item.id, quantity, item.price, item.rarity);
				return true;
			}

			const updatedChampion = await championInventoryRepo.updateInventoryItem(championInventory.id, item.id, quantity);
			if(updatedChampion) {
				return true;
			}
			return false;
		} catch(error:any) { 
			throw new Error(error.message);
		} 

	}

	async sell(shopId: number, userId: number, championId: number, itemId: number, quantity: number): Promise<boolean> {
		try {
			const champion: ChampionDTO = await championRepo.getById(championId, userId);
			
			if(!champion) {
				throw new Error('Champion not found');
			}

			const championInventory: Inventory = await championInventoryRepo.getInventoryByOwnerAndChampionId(championId, userId); 

			if(!championInventory) {
				throw new Error('Champion inventory not found');
			}

			const item: InventoryItens = await championInventoryRepo.getItemById(championInventory.id, itemId);

			if(!item || item.quantity - quantity < 0) {
				throw new Error("Item not found in champion inventory");
			}

			const updatedChampion = await championInventoryRepo.updateInventoryItem(championInventory.id, item.id, -quantity);
			item.quantity -= quantity;
			const shopInventory: Inventory = await shopInventoryRepo.getInventoryByShopId(shopId);

			if (item.quantity === 0) {
				await championInventoryRepo.removeInventoryItem(championInventory.id, item.id);
			}

			if(!shopInventory) {
				throw new Error('Shop inventory not found');
			}

			const updatedShop = await shopInventoryRepo.updateInventoryItem(shopInventory.id, item.id, quantity);
			
			if(updatedChampion && updatedShop) {
				await championRepo.updateMoney(championId, champion.money + item.price * quantity);
				return true;
			}
			
			return false;
		} catch(error:any) { 
			throw new Error(error.message);
		} 
	}

}
