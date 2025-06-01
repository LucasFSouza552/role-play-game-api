import { Request, Response } from "express";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { ChampionInventoryService } from "../services/ChampionInventoryService";
import { FilterDefault, FilterInventory } from "../models/Filters";
import { createInventoryDTO, updateInventoryDTO } from "../DTOS/InventoryDTO";

const inventoryService = new ChampionInventoryService();

export class ChampionInventoryController implements ControllerInterface {
	async getAll(req: Request, res: Response): Promise<void> {
		try {
			const filter: FilterInventory = { ...FilterDefault, ...req.query };
			const inventories = inventoryService.getAll(filter);
			res.status(200).json(inventories);
		} catch (error: any) {
			throw new Error("Error fetching inventories");
		}
	}
	async getById(req: Request, res: Response): Promise<void> {
		const inventoryId = parseInt(req.params.id);

		if (!inventoryId) {
			res.status(400).json({ error: "Invalid ID" });
			return;
		}

		try {
			const inventory = await inventoryService.getById(inventoryId);
			res.status(200).json(inventory);
		} catch (err: any) {
			res.status(404).json({ error: err.message });
		}
	}
	async create(req: Request, res: Response): Promise<void> {
		try {
			const inventoryData: createInventoryDTO = req.body;

			if (!inventoryData.ownerId) {
				res.status(400).json({ error: "Missing required fields" });
				return;
			}

			const inventory = await inventoryService.create(inventoryData);
			res.status(201).json(inventory);
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
	}
	async update(req: Request, res: Response): Promise<void> {
		try {
			const id = parseInt(req.params.id);

			if (!id) {
				res.status(400).json({ error: "Invalid ID" });
				return;
			}
			//TODO: Fazer Mapper
			const inventoryData: updateInventoryDTO = req.body;

			if (!inventoryData.capacity) {
				res.status(400).json({ error: "Missing required fields" });
				return;
			}

			const inventory = await inventoryService.update(inventoryData);
			res.status(200).json(inventory);
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
	}
	async delete(req: Request, res: Response): Promise<void> {
		try {
			const id = parseInt(req.params.id);
			const championId = parseInt(req.params.championId);

			if (!id) {
				res.status(400).json({ error: "Invalid ID" });
				return;
			}

			if (!championId) {
				res.status(400).json({ error: "Invalid champion ID" });
				return;
			}

			const deletedInventory = await inventoryService.delete(id, championId);
			res.status(204).send({ deletedInventory });
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
	}

	async createItemInventory(req: Request, res: Response): Promise<void> {
		try {
			const inventoryId = parseInt(req.params.id);
			const itemId = req.body.item;
			const quantity = req.body.quantity;

			if (!itemId || isNaN(itemId)) {
				res.status(400).json({ error: "Invalid item" });
				return;
			}

			if (!quantity || isNaN(quantity) || quantity <= 0) {
				res.status(400).json({ error: "Invalid quantity" });
				return;
			}

			const inventory = await inventoryService.createItemInventory(inventoryId, itemId, quantity);
			res.status(200).json(inventory);
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
	}

	async removeItemInventory(req: Request, res: Response): Promise<void> {
		try {
			const userId: number = req.userId as number;
			const inventoryId = parseInt(req.params.id);
			const item = parseInt(req.body.item);

			if (!item || isNaN(item)) {
				res.status(400).json({ error: "Invalid item or quantity" });
				return;
			}

			const inventoryExists = await inventoryService.getById(inventoryId);
			if (!inventoryExists) {
				res.status(404).json({ error: "Inventory not found" });
				return;
			}

			const updatedInventory = await inventoryService.removeItemInventory(inventoryId, item);
			res.status(200).json(updatedInventory);

		} catch (err: any) {
			res.status(400).json({ error: err?.message || "Unexpected error occurred" });
		}

	}

}
