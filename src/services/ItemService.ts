import { Item } from "../models/Item";

import { itemsRepo } from "../repositories/RepositoryManager";

export class ItemService {
	// Lista todos os itens do banco de dados com filtros opcionais
	async getAllItems(filter: { name?: string; minPrice?: number; maxPrice?: number }) {
		return await itemsRepo.findAll(filter);
	}

	// Busca um item específico pelo ID
	async getItemById(id: string) {
		return await itemsRepo.findById(id);
	}

	// Cria um novo item no banco de dados
	async createItem(item: any) {
		const newItem: Omit<Item, "id"> = {
			name: item.name,
			description: item.description,
			priceMin: item.minPrice,
			priceMax: item.maxPrice,
			rarity: item.rarity || "Common",
			type: item.type,
		};
		return await itemsRepo.create(newItem as Item);
	}

	// Atualiza um item existente no banco de dados
	async updateItem(id: string, item: any) {
		const existingItem = await itemsRepo.findById(id);
		if (!existingItem) {
			return null;
		}
		const updatedItem: Partial<Item> = {
			name: item.name ?? existingItem.name,
			description: item.description ?? existingItem.description,
			priceMin: item.minPrice ?? existingItem.priceMin,
			priceMax: item.maxPrice ?? existingItem.priceMax,
			rarity: item.rarity ?? existingItem.rarity,
			type: item.type ?? existingItem.type,
		};
		return await itemsRepo.update(id, updatedItem);
	}

	// Deleta um item do banco de dados
	async deleteItem(id: string) {
		const existingItem = await itemsRepo.findById(id);
		if (!existingItem) {
			return null;
		}
		await itemsRepo.delete(id);
		return { message: "Item deletado com sucesso." };
	}
}
