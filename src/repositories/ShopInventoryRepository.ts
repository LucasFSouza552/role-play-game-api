import db from "../database/db";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { Inventory } from "../models/Inventory";
import { Filter } from "../models/Filters";
import { createInventoryDTO, updateInventoryDTO } from "../DTOS/InventoryDTO";
import { InventoryItens } from "../models/InventoryItens";

export class ShopInventoryRepository implements RepositoryInterface<createInventoryDTO, updateInventoryDTO, Inventory> {
	private tableName = "shop_inventory";

	async create(inventory: Inventory): Promise<Inventory> {
		try {
			const newInventory = await db(this.tableName).insert(inventory).returning("*");
			if (!newInventory || newInventory.length === 0) {
				throw new Error("Inventory not created");
			}
			return newInventory[0];
		} catch (error) {
			throw new Error("Error creating inventory");
		}
	}
	
	async delete(id: number): Promise<boolean> {
		try {
			const deletedInventory = await db(this.tableName).where({ id }).del();
			return deletedInventory == 1;
		} catch (error) {
			throw new Error("Error deleting inventory");
		}
	}

	async getAll(filter: Filter): Promise<Inventory[]> {
		try {
			const inventories = await db(this.tableName)
				.select("*")
				.limit(filter.limit)
				.offset((filter.page - 1) * filter.limit)
				.orderBy(filter.orderBy, filter.order);
			return inventories;
		} catch (error) {
			throw new Error("Error fetching inventories");
		}
	}

	async getById(inventoryId: number): Promise<Inventory> {
		try {
			const inventory: Inventory = await db(this.tableName).where({ id: inventoryId }).first();
			if (!inventory) throw new Error("Inventory not found");
			return inventory;
		} catch (error:any) {
			throw new Error(`Error fetching inventory: ${error.message}`);
		}
	}

	async update(inventory: Inventory): Promise<Inventory> {
		try {
			const updatedInventory = await db(this.tableName).where({ id: inventory.id }).update(inventory).returning("*");
			if (!updatedInventory || updatedInventory.length === 0) {
				throw new Error("Inventory not updated");
			}
			return updatedInventory[0];
		} catch (error) {
			throw new Error("Error updating inventory");
		}
	}

	async getItemsById(inventoryId: number): Promise<InventoryItens[]> {
		try {
			const itens = await db("shop_items")
				.join('items', 'shop_items.itemId', '=', 'items.id')
				.select("items.id", "items.name", "items.description","shop_items.quantity", "items.type", "shop_items.rarity", "shop_items.price")
				.where({ inventoryId });
			return itens || [];
		} catch (error: any) {
			throw new Error(`Error fetching items inventory: ${error.message}`);
		}
	}

	async getItemById(inventoryId:number, itemId:number): Promise<InventoryItens> {
		try {
			const itens = await db("shop_items")
				.join('items', 'shop_items.itemId', '=', 'items.id')
				.select("items.id", "items.name", "items.description","shop_items.quantity", "items.type", "shop_items.rarity", "shop_items.price")
				.where({ inventoryId, itemId }).first();
			return itens;
		} catch (error: any) { 
			throw new Error(`Error fetching item inventory: ${error.message}`);
		}
	}

	async getInventoryAndItemsById(inventoryId: number): Promise<Inventory> {
		try {
			const inventory = await this.getById(inventoryId);
			const items = await this.getItemsById(inventoryId);
			inventory.itens = items;
			console.log(items);
			return inventory;
		} catch (error: any) {
			throw new Error(`Error fetching inventory and items: ${error.message}`);
		}

	}

	async getInventoryByShopId(shopId: number): Promise<Inventory> {
		try {
			const inventory = await db(this.tableName)
				.select("*")
				.where({ ownerId: shopId })
				.first();
			return inventory;
		} catch (error: any) {
			throw new Error(`Error returning shop inventory: ${error.message}`);
		}
	}

	async createInventoryItem(inventoryId: number, itemId: number, quantity: number, price: number): Promise<InventoryItens> {
		try {
			const newItem = await db("shop_items").insert({ inventoryId, itemId, quantity, price }).returning("*");
			return newItem[0];
		} catch (error) {
			throw new Error("Error adding item to inventory");
		}
	}

	async updateInventoryItem(inventoryId: number, itemId: number, quantity: number): Promise<InventoryItens> {
		console.log(inventoryId, itemId, quantity)
		try {
			const updatedItem = await db("shop_items").where({ inventoryId, itemId }).update({ quantity: db.raw(`quantity + ${quantity}`) }).returning("*");
			return updatedItem[0];
		} catch (error: any) {
			throw new Error(`Error adding item to shop inventory: ${error.message}`);
		}
	} 

	async removeInventoryItem(inventoryId: number, itemId: number): Promise<boolean> {
		try {
			const deletedItem = await db("shop_items").where({ inventoryId, itemId }).del();
			return deletedItem == 1;
		} catch (error) {
			throw new Error("Error removing item to shop inventory");
		}
	}

}
