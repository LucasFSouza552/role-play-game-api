import db from "../database/db";
import { Item } from "../models/Item";

// Responsável por acessar e manipular os dados dos itens no banco
export class ItemRepository {
  // Busca todos os itens, aplicando filtros opcionais
  static async findAll(filter: { name?: string; minPrice?: number; maxPrice?: number }) {
    const query = db("items").select("*");
    if (filter.name) query.whereILike("name", `%${filter.name}%`);
    if (filter.minPrice !== undefined) query.where("priceMin", ">=", filter.minPrice);
    if (filter.maxPrice !== undefined) query.where("priceMax", "<=", filter.maxPrice);
    return await query.orderBy("name", "asc");
  }

  // Busca um item pelo ID
  static async findById(id: string | number): Promise<Item | null> {
    return await db("items").where({ id }).first();
  }

  // Cria um novo item no banco
  static async create(item: Omit<Item, "id">): Promise<Item> {
    const [newItem] = await db("items").insert(item).returning("*");
    return newItem;
  }

  // Atualiza um item existente pelo ID
  static async update(id: string | number, item: Partial<Item>): Promise<Item | null> {
    const [updatedItem] = await db("items").where({ id }).update(item).returning("*");
    return updatedItem;
  }

  // Deleta um item pelo ID
  static async delete(id: string | number): Promise<number> {
    return await db("items").where({ id }).del();
  }
}