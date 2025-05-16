import { Item } from "../models/Item";
import { ItemRepository } from "../repositories/ItemResponsity";

export class ItemService {
  // Lista todos os itens do banco de dados com filtros opcionais
  static async getAllItems(filter: { name?: string; minPrice?: number; maxPrice?: number }) {
    return await ItemRepository.findAll(filter);
  }

  // Busca um item específico pelo ID
  static async getItemById(id: string) {
    return await ItemRepository.findById(id);
  }

  // Cria um novo item no banco de dados
  static async createItem(item: any) {
    const newItem: Omit<Item, "id"> = {
      name: item.name,
      description: item.description,
      priceMin: item.minPrice,
      priceMax: item.maxPrice,
      rarity: item.rarity || "Common",
      type: item.type,
    };
    return await ItemRepository.create(newItem as Item);
  }

  // Atualiza um item existente no banco de dados
  static async updateItem(id: string, item: any) {
    const existingItem = await ItemRepository.findById(id);
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
    return await ItemRepository.update(id, updatedItem);
  }

  // Deleta um item do banco de dados
  static async deleteItem(id: string) {
    const existingItem = await ItemRepository.findById(id);
    if (!existingItem) {
      return null;
    }
    await ItemRepository.delete(id);
    return { message: "Item deletado com sucesso." };
  }
}