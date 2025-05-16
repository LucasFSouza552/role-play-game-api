import { user } from "./../models/User";
import { Request, Response } from "express";
import { ChampionService } from "../services/ChampionsService";
import { Filters, defaultFilters } from "../models/Filters";
import ValidateUUID from "../utils/validateChampionId";
import { validateAuthorizationHeader } from "../utils/jwt";

const championService = new ChampionService();
export class ChampionController {
	async getAll(req: Request, res: Response) {
		try {
			const filters: Filters = { ...defaultFilters, ...req.query, userId: req.userId };
			const champions = await championService.getAllChampions(filters);

			res.status(200).json({ champions: champions, length: champions.length });
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const championId = req.params.id;

			if (!ValidateUUID(championId)) {
				res.status(400).send({ error: "ID é inválido" })
				return;
			}

			const champion = await championService.getChampionById(championId, req.userId as string);
			res.status(200).json(champion);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	async createChampion(req: Request, res: Response) {
		try {
			const champion = req.body;

			if (!champion.name || !champion.roleName) {
				res.status(400).json({ error: "Falta informação necessária para criar um campeão" });
				return;
			}

			champion.userId = req.userId as string;

			const newChampion = await championService.createChampion(champion);
			res.status(201).json(newChampion);
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
	}

	async updateChampion(req: Request, res: Response) {
		try {
			const championId = req.params.id;
			const champion = req.body;

			if (!ValidateUUID(championId)) {
				res.status(400).json({ error: "ID do campeão inválido" });
				return;
			}

			const championExists = await championService.getChampionById(championId, req.userId as string);

			if (!championExists) {
				res.status(400).json({ error: "Campeão não encontrado" })
				return;
			}

			const dataChampionUpdate = {
				money: champion.money || championExists.money,
				guildId: champion.guildId || championExists.guildId,
				strength: champion.strength || championExists.strength,
				dexterity: champion.dexterity || championExists.dexterity,
				intelligence: champion.intelligence || championExists.intelligence,
				vitality: champion.vitality || championExists.vitality,
				hp: champion.hp || championExists.hp,
				xp: champion.xp || championExists.xp,
				sp: champion.sp || championExists.sp
			}

			const { role, skills, ...newChampion } = { ...championExists, ...dataChampionUpdate };

			const updatedChampion = await championService.updateChampion(championId, newChampion);
			res.status(200).json(updatedChampion);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	async deleteChampion(req: Request, res: Response) {
		try {
			const championId = req.params.id;

			if (!ValidateUUID(championId)) {
				res.status(400).json({ error: "ID do campeão inválido" })
				return;
			}

			const deletedChampion = await championService.deleteChampion(championId);
			res.status(200).json({ deletedChampion: !!deletedChampion });
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
}
