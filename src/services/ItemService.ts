import { Item } from "../models/Item";
import { ItemDTO } from "../models/dto/ItemDTO";
import { ItemRepository } from "../repositories/ItemRepository";

// Camada de regras de negócio dos itens
export class ItemService {
  // Busca todos os itens com filtros opcionais
  static async getAllItems(filter: { name?: string; minPrice?: number; maxPrice?: number }) {
    return await ItemRepository.findAll(filter);
  }

  // Busca um item pelo ID
  static async getItemById(id: string | number) {
    return await ItemRepository.findById(id);
  }

  // Cria um novo item a partir do DTO recebido
  static async createItem(item: ItemDTO) {
    // Monta o objeto para o banco (sem o id)
    const newItem: Omit<Item, "id"> = {
      name: item.name,
      description: item.description,
      priceMin: item.priceMin,
      priceMax: item.priceMax,
      rarity: item.rarity,
      level: item.level,
      type: item.type,
    };
    return await ItemRepository.create(newItem);
  }

  // Atualiza um item existente, se ele existir
  static async updateItem(id: string | number, item: Partial<ItemDTO>) {
    const existingItem = await ItemRepository.findById(id);
    if (!existingItem) return null; // Só atualiza se existir
    // Atualiza apenas os campos enviados
    const updatedItem: Partial<Item> = {
      name: item.name ?? existingItem.name,
      description: item.description ?? existingItem.description,
      priceMin: item.priceMin ?? existingItem.priceMin,
      priceMax: item.priceMax ?? existingItem.priceMax,
      rarity: item.rarity ?? existingItem.rarity,
      level: item.level ?? existingItem.level,
      type: item.type ?? existingItem.type,
    };
    return await ItemRepository.update(id, updatedItem);
  }

  // Deleta um item pelo ID, se ele existir
  static async deleteItem(id: string | number) {
    const existingItem = await ItemRepository.findById(id);
    if (!existingItem) return null;
    await ItemRepository.delete(id);
    return { message: "Item deletado com sucesso." };
  }
}