import { Request, Response } from 'express';
import { GuildService } from '../services/GuildService';
import { guildRepo } from '../repositories/RepositoriosManager';

const guildService = new GuildService();

export class GuildController {

    async getAll(req: Request, res: Response) {
        try {
            const guilds = await guildService.getAllGuild();
            res.json(guilds);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const guildId = req.params.id;
            res.json(guildId);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }

    }




}