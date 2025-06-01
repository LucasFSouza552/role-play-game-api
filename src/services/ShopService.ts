import { ServiceInterface } from "../interfaces/serviceInterface";
import { createShopDTO, updateShopDTO } from "../DTOS/ShopDTO";
import { Shop } from "../models/Shop";
import { FilterShop } from "../models/Filters";
import { shopRepo } from "../repositories/RepositoryManager";

export class ShopService implements ServiceInterface<createShopDTO, updateShopDTO, Shop> {
	getAll(filter: FilterShop): Promise<Shop[]> {
		try {
			return shopRepo.getAll(filter);
		} catch (error) {
			throw new Error("Error fetching shops");
		}
	}
	getById(id: number): Promise<Shop> {
		try {
			return shopRepo.getById(id);
		} catch (error) {
			throw new Error("Error fetching shop");
		}
	}
	create(shop: createShopDTO): Promise<Shop> {
		try {
			return shopRepo.create(shop);
		} catch (error) {
			throw new Error("Error creating shop");
		}
	}
	update(shop: updateShopDTO): Promise<updateShopDTO> {
		try {
			return shopRepo.update(shop);
		} catch (error) {
			throw new Error("Error updating shop");
		}
	}
	delete(id: number): Promise<boolean> {
		try {
			return shopRepo.delete(id);
		} catch (error) {
			throw new Error("Error deleting shop");
		}
	}
}
