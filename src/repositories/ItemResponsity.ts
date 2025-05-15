import db from "../database/db";
import { Item } from "../models/Item";

export const ItemRepository = {
  // Lista todos os itens do banco de dados com filtros opcionais
  async findAll(filter: { name?: string; minPrice?: number; maxPrice?: number }) {
    const query = db("items").select("*");

    // Aplicar filtros, se fornecidos
    if (filter.name) {
      query.whereILike("name", `%${filter.name}%`);
    }
    if (filter.minPrice !== undefined) {
      query.where("minPrice", ">=", filter.minPrice);
    }
    if (filter.maxPrice !== undefined) {
      query.where("maxPrice", "<=", filter.maxPrice);
    }

    // Ordenar os resultados pelo nome em ordem ascendente
    return await query.orderBy("name", "asc");
  },

  // Busca um item específico pelo ID
  async findById(id: string): Promise<Item | null> {
    return await db("items").where({ id }).first();
  },

  // Cria um novo item no banco de dados
  async create(item: Item): Promise<Item> {
    const [newItem] = await db("items").insert(item).returning("*");
    return newItem;
  },

  // Atualiza um item existente no banco de dados
  async update(id: string, item: Partial<Item>): Promise<Item> {
    const [updatedItem] = await db("items")
      .where({ id })
      .update(item)
      .returning("*");
    return updatedItem;
  },

  // Deleta um item do banco de dados
  async delete(id: string): Promise<number> {
    return await db("items").where({ id }).del();
  }
};