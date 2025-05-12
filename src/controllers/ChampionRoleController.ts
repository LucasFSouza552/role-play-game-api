import { Request, Response } from "express";
import { Filters, defaultFilters } from "../models/Filters";
import { ChampionRoleService } from "../services/ChampionRoleService";

const championRoleService = new ChampionRoleService();

export class ChampionRoleController {

    async getAll(req: Request, res: Response) {
        try {
            const filters: Filters = {...defaultFilters, ...req.query};
            const roles = await championRoleService.getAllChampionRoles(filters);

            res.status(200).json({roles: roles, length: roles.length});
        } catch (error) {
            throw new Error('Erro ao buscar roles');
        }
    }

}