import { Request, Response } from "express";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { ShopService } from "../services/ShopService";
import { FilterDefault, FilterShop } from "../models/Filters";

const shopService = new ShopService();

export class ShopController implements ControllerInterface {
	async getInventory(req: Request, res: Response): Promise<void> {
		try {
			const shopId = parseInt(req.params.id);
			if (!shopId) {
				res.status(400).json({ error: "Invalid ID" });
				return;
			}
			const inventory = await shopService.getInventory(shopId);
			res.status(200).json(inventory);
		} catch (error: any) {
			res.status(500).json({ error: `Error fetching shop inventory: ${error.message}` });
		}
	}

	async getAll(req: Request, res: Response): Promise<void> {
		try {
			const filter: FilterShop = { ...FilterDefault, ...req.query };
			const shops = await shopService.getAll(filter);
			res.status(200).json(shops);
		} catch (error) {
			res.status(500).json({ error: "Error fetching shops" });
		}
	}
	async getById(req: Request, res: Response): Promise<void> {
		try {
			const id = parseInt(req.params.id);
			if (!id) {
				res.status(400).json({ error: "Invalid ID" });
				return;
			}
			const shop = await shopService.getById(id);
			res.status(200).json(shop);
		} catch (error) {
			res.status(500).json({ error: "Error fetching shop" });
		}
	}
	async create(req: Request, res: Response): Promise<void> {
		try {
			const shop = await shopService.create(req.body);
			res.status(201).json(shop);
		} catch (error) {
			res.status(500).json({ error: "Error creating shop" });
		}
	}
	async update(req: Request, res: Response): Promise<void> {
		try {
			const shop = await shopService.update(req.body);
			res.status(200).json(shop);
		} catch (error) {
			res.status(500).json({ error: "Error updating shop" });
		}
	}
	async delete(req: Request, res: Response): Promise<void> {
		try {
			const id = parseInt(req.params.id);
			if (!id) {
				res.status(400).json({ error: "Invalid ID" });
				return;
			}
			const shop = await shopService.delete(id);
			res.status(200).json(shop);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async sell(req: Request, res: Response): Promise<void> {
		try {
			const userId = Number(req.userId);
			const shopId = Number(req.params.id);
			const championId = Number(req.body.championId);
			const itemId = Number(req.body.itemId);
			const quantity = Number(req.body.quantity);

			if (!shopId || !userId) {
				res.status(400).json({ error: 'Invalid ID' });
				return;
			}

			if (!championId || !itemId) {
				res.status(400).json({ error: 'Invalid ID' });
				return;
			}

			if (isNaN(quantity) || quantity < 1 || quantity > 999) {
				res.status(400).json({ error: 'Number of items has to be in 1 to 999' });
				return;
			}

			const updatedShop = await shopService.sell(
				shopId,
				userId,
				championId,
				itemId,
				quantity
			);

			res.status(200).json(updatedShop);
		} catch (error: any) {
			throw new Error("Error selling item: " + error.message);
		}
	}

	async purchase(req: Request, res: Response): Promise<void> {
		try {
			const userId = req.userId as Number;
			const shopId = parseInt(req.params.id);

			if (!shopId || !userId) {
				res.status(400).json({ error: 'Invalid ID' });
				return;
			}

			const { championId, itemId, quantity } = req.body;

			if (!championId || !itemId) {
				res.status(400).json({ error: 'Invalid ID' });
				return;
			}
			if (!quantity || isNaN(quantity) || quantity <= 0 || quantity > 999) {
				res.status(400).json({ error: 'Number of items has to be in 1 to 999' });
				return;
			}

			const updatedShop = await shopService.purchase(
				shopId,
				Number(userId),
				championId,
				itemId,
				quantity
			);
			
			res.status(200).json(updatedShop);

		} catch (error: any) {
			throw new Error(error.message);
		}
	}

}
