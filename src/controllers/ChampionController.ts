import { Champion } from './../models/Champion';
import { Request, Response } from "express";
import { ChampionService } from "../services/ChampionsService";
import { Filters, defaultFilters } from "../models/Filters";

const championService = new ChampionService();
export class ChampionController {
	async getAll(req: Request, res: Response) {
		try {
			const filters: Filters = {...defaultFilters, ...req.query};
			const champions = await championService.getAllChampions(filters);

			res.status(200).json({champions: champions, length: champions.length});
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const champion = await championService.getChampionById(id);
			res.status(200).json(champion);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	async createChampion(req: Request, res: Response) {
		try {
			const champion = req.body;

			if (!champion.name || !champion.roleName) {
				throw new Error('Campeão inválido');
			}

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

			if(!championId) {
				throw new Error('ID do campeão inválido');
			}

			const championExists = await championService.getChampionById(championId);

			if(!championExists) {
				throw new Error('Campeão não encontrado');
			}

			const dataChampionUpdate = {
				money: champion.money || championExists.money,
				guildId: champion.guildId || championExists.guildId,
				strength: champion.strength || championExists.strength,
				dexterity: champion.dexterity  || championExists.dexterity,
				intelligence: champion.intelligence || championExists.intelligence,
				vitality: champion.vitality || championExists.vitality,
				hp: champion.hp || championExists.hp,
				xp: champion.xp	 || championExists.xp,
				sp: champion.sp	|| championExists.sp
			}

			const {role, skills, ...newChampion} = {...championExists, ...dataChampionUpdate};
			

			const updatedChampion = await championService.updateChampion(championId, newChampion);
			res.status(200).json(updatedChampion);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	async deleteChampion(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const deletedChampion = await championService.deleteChampion(id);
			res.status(200).json({deletedChampion: !!deletedChampion});
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}


}
