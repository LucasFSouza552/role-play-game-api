import { Request, Response } from "express";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { ShopService } from "../services/ShopService";
import { FilterDefault, FilterShop } from "../models/Filters";

const shopService = new ShopService();

export class ShopController implements ControllerInterface {
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
		} catch (error) {
			res.status(500).json({ error: "Error deleting shop" });
		}
	}


}
