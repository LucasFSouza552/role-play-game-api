import { Item } from "../models/Item";
import { ItemDTO, ItemCreateDTO, ItemUpdateDTO } from "../DTOS/Itens/ItemDTO";
import { ItemRepository } from "../repositories/ItemRepository";
import { ItemType } from "../models/enums/ItemType";
import { ItemRarity } from "../models/enums/ItemRarity";


 // Camada de regras de negócio dos itens.

export class ItemService {

   // Busca todos os itens com filtros opcionais.

  static async getAllItems(filter: { name?: string; minPrice?: number; maxPrice?: number }) {
    return await ItemRepository.findAll(filter);
  }

// Busca um item pelo ID.

  static async getItemById(id: string | number) {
    return await ItemRepository.findById(id);
  }

   // Cria um novo item a partir do DTO recebido.
   // Valida campos obrigatórios e enums.

  static async createItem(item: ItemCreateDTO) {
    // Validação dos campos obrigatórios
    if (
      !item.name ||
      !item.description ||
      item.priceMin == null ||
      item.priceMax == null ||
      item.rarity == null ||
      item.type == null
    ) {
      throw new Error("Todos os campos obrigatórios devem ser preenchidos.");
    }

    // Validação dos enums
    if (!Object.values(ItemType).includes(item.type)) {
      throw new Error("Tipo de item inválido.");
    }
    if (!Object.values(ItemRarity).includes(item.rarity)) {
      throw new Error("Raridade de item inválida.");
    }

    // Regra de negócio: preço mínimo não pode ser maior que o máximo
    if (item.priceMin > item.priceMax) {
      throw new Error("O preço mínimo não pode ser maior que o preço máximo.");
    }

    // Monta o objeto conforme o modelo/tabela
    const newItem: Omit<Item, "id"> = {
      name: item.name,
      description: item.description,
      priceMin: item.priceMin,
      priceMax: item.priceMax,
      rarity: item.rarity,
      type: item.type,
    };
    return await ItemRepository.create(newItem);
  }

// Atualiza um item existente, se ele existir.

   // Valida campos enviados e regras de negócio.
  static async updateItem(id: string | number, item: ItemUpdateDTO) {
    const existingItem = await ItemRepository.findById(id);
    if (!existingItem) return null;

    // Validação dos enums, se enviados
    if (item.type && !Object.values(ItemType).includes(item.type)) {
      throw new Error("Tipo de item inválido.");
    }
    if (item.rarity && !Object.values(ItemRarity).includes(item.rarity)) {
      throw new Error("Raridade de item inválida.");
    }

    // Validação de preço mínimo e máximo, se ambos enviados
    if (
      item.priceMin != null &&
      item.priceMax != null &&
      item.priceMin > item.priceMax
    ) {
      throw new Error("O preço mínimo não pode ser maior que o preço máximo.");
    }

    // Atualiza apenas os campos enviados
    const updatedItem: Partial<Item> = {
      name: item.name ?? existingItem.name,
      description: item.description ?? existingItem.description,
      priceMin: item.priceMin ?? existingItem.priceMin,
      priceMax: item.priceMax ?? existingItem.priceMax,
      rarity: item.rarity ?? existingItem.rarity,
      type: item.type ?? existingItem.type,
    };
    return await ItemRepository.update(id, updatedItem);
  }

// Deleta um item pelo ID, se ele existir.
  static async deleteItem(id: string | number) {
    const existingItem = await ItemRepository.findById(id);
    if (!existingItem) return null;
    await ItemRepository.delete(id);
    return { message: "Item deletado com sucesso." };
  }
}