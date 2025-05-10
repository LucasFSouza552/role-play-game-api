import { Request, Response } from "express";
import { ChampionService } from "../services/ChampionService";

const championService = new ChampionService();
export class ChampionController {
    async getAll(req: Request, res: Response) {
        try {
            const champions = await championService.getAllChampions();
            res.json(champions);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    
}