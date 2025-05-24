import { Request, Response } from "express";
import { Filters, FilterDefault } from "../models/Filters";
import { ChampionRoleService } from "../services/ChampionRoleService";

const championRoleService = new ChampionRoleService();

export class ChampionRoleController {

    async getAll(req: Request, res: Response) {
        try {
            const filters: Filters = { ...FilterDefault, ...req.query };
            const roles = await championRoleService.getAllChampionRoles(filters);

            res.status(200).json({ roles: roles, length: roles.length });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const roleId = req.params.id;

            if (!roleId) {
                res.status(400).send({ error: "ID é inválido" })
                return;
            }
            
            const role = await championRoleService.getChampionRoleById(roleId);
            res.status(200).json(role);
        } catch (error) {
            throw new Error("Erro ao buscar classe");
        }
    }

    async createRole(req: Request, res: Response) {
        try {
            const role = req.body;

            if (!role.name) {
                res.status(400).send({ error: "Classe inválida" })
                return;
            }

            const newRole = await championRoleService.createChampionRole(role);
            res.status(201).json(newRole);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}