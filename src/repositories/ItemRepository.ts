import db from "../database/db";
import { createItemDTO, updateItemDTO } from "../DTOS/ItemDTO";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { FilterItem } from "../models/Filters";
import { Item } from "../models/Item";

// Responsável por acessar e manipular os dados dos itens no banco
export class ItemRepository implements RepositoryInterface<createItemDTO, updateItemDTO, Item> {
	private tableName = "items";
	// Busca todos os itens, aplicando filtros opcionais
	async getAll(filter: FilterItem): Promise<Item[]> {
		try {
			const allItems = await db(this.tableName)
				.select("*")
				.limit(filter.limit)
				.offset((filter.page - 1) * filter.limit)
				.modify((query) => {
					if (filter.name) {
						query.whereILike("items.name", `%${filter.name}%`);
					}
					if (filter.minPrice !== undefined) {
						query.where("items.priceMin", ">=", filter.minPrice);
					}
					if (filter.maxPrice !== undefined) {
						query.where("items.priceMax", "<=", filter.maxPrice);
					}
				}).orderBy(filter.orderBy, filter.order);
			return allItems;
		} catch (error) {
			throw new Error("Error fetching items");
		}
	}

	// Busca um item pelo ID
	async getById(id: number): Promise<Item> {
		try {
			const item = await db(this.tableName).where({ id }).first();
			if (!item) throw new Error("Item not found");
			return item;
		} catch (error) {
			throw new Error("Error fetching item");
		}
	}

	// Cria um novo item no banco
	async create(item: createItemDTO): Promise<Item> {
		try {
			const newItem = await db(this.tableName).insert(item).returning("*");
			if (!newItem || newItem.length === 0) {
				throw new Error("Item not created");
			}
			return newItem[0];
		} catch (error) {
			throw new Error("Error creating item");
		}
	}

	// Atualiza um item existente pelo ID
	async update(item: updateItemDTO): Promise<Item> {
		try {
			const updatedItem = await db(this.tableName)
				.where({ id: item.id })
				.update(item)
				.returning("*");
			if (!updatedItem || updatedItem.length === 0) {
				throw new Error("Item not updated");
			}
			return updatedItem[0];
		} catch (error) {
			throw new Error("Error updating item");
		}
	}

	// Deleta um item pelo ID
	async delete(id: number): Promise<boolean> {
		try {
			const deletedItem = await db(this.tableName).where({ id }).del();
			return deletedItem == 1;
		} catch (error) {
			throw new Error("Erro ao deletar item");
		}
	}
}
