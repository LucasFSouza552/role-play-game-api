import { Item } from "../models/Item";
import { ItemRepository } from "../repositories/ItemResponsity";

export const ItemService = {
  // Lista todos os itens do banco de dados com filtros opcionais
  async getAllItems(filter: { name?: string; minPrice?: number; maxPrice?: number }) {
    return await ItemRepository.findAll(filter);
  },

  // Busca um item específico pelo ID
  async getItemById(id: string) {
    const item = await ItemRepository.findById(id);
    if (!item) {
      return { error: "Item não encontrado." };
    }
    return item;
  },

  // Cria um novo item no banco de dados
  async createItem(item: any) {
    if (!item.name || !item.description || item.minPrice == null || item.maxPrice == null) {
      return { error: "Todos os campos obrigatórios devem ser preenchidos." };
    }
    if (item.minPrice > item.maxPrice) {
      return { error: "O preço mínimo não pode ser maior que o preço máximo." };
    }
    const newItem: Omit<Item, "id"> = {
      name: item.name,
      description: item.description,
      priceMin: item.minPrice,
      priceMax: item.maxPrice,
      rarity: item.rarity || "common",
      level: item.level || 1,
      type: item.type || "generic",
    };
    return await ItemRepository.create(newItem as Item);
  },

  // Atualiza um item existente no banco de dados
  async updateItem(id: string, item: any) {
    const existingItem = await ItemRepository.findById(id);
    if (!existingItem) {
      return { error: "Item não encontrado." };
    }
    const updatedItem: Partial<Item> = {
      name: item.name ?? existingItem.name,
      description: item.description ?? existingItem.description,
      priceMin: item.minPrice ?? existingItem.priceMin,
      priceMax: item.maxPrice ?? existingItem.priceMax,
      rarity: item.rarity ?? existingItem.rarity,
      level: item.level ?? existingItem.level,
      type: item.type ?? existingItem.type,
    };
    return await ItemRepository.update(id, updatedItem);
  },

  // Deleta um item do banco de dados
  async deleteItem(id: string) {
    const existingItem = await ItemRepository.findById(id);
    if (!existingItem) {
      return { error: "Item não encontrado." };
    }
    await ItemRepository.delete(id);
    return { message: "Item deletado com sucesso." };
  }
};