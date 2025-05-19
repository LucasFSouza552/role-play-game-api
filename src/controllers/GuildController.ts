import { Request, Response } from 'express';
import { GuildService } from '../services/GuildService';
import { error } from 'console';

export class GuildController {
    private guildService = new GuildService();

    async findAll(req: Request, res: Response) {
        try {
            const guilds = await this.guildService.findAllGuild();
            res.json(guilds);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}