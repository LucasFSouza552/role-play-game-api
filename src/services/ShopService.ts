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
				console.log(champion)
				throw new Error('Champion not found');
			}
			
			const inventory: Inventory = await shopInventoryRepo.getInventoryByShopId(shopId);
			const championInventory: Inventory = await championInventoryRepo.getInventoryByOwnerAndChampionId(championId, userId); 

			if(!inventory || !championInventory) {
				console.log(inventory, championInventory)
				throw new Error('Inventory not found');
			}

			const item: InventoryItens = await shopInventoryRepo.getItemById(inventory.id, itemId);

			if(!item || item.quantity - quantity < 0) {
				console.log("NÂO TENHO")
				throw new Error("Item not found in shop inventory");
			}
			
			if(item.price * quantity > champion.money) {
				console.log("POBRE")
				throw new Error("Not enough money");
			}

			console.log(item);

			const updatedShop = await shopInventoryRepo.updateInventoryItem(inventory.id, itemId, -quantity);
			item.quantity -= quantity;

			const itemExists = await championInventoryRepo.getItemById(championInventory.id, itemId);
			const updatedChampionMoney = champion.money - item.price * quantity;
			await championRepo.updateMoney(championId, updatedChampionMoney);


			if(!itemExists) {
				championInventoryRepo.createInventoryItem(championInventory.id, item.id, item.quantity, item.price);
				return true;
			}

			const updatedChampion = await championInventoryRepo.updateInventoryItem(championInventory.id, item.id, item.quantity);
			if(updatedChampion) {
				return true;
			}
			return false;
		} catch(error:any) { 
			console.log(error);
			throw new Error(error.message);
		} 

	}

}
