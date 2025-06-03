import { Request, Response } from "express";
import { FilterChampionRole, FilterDefault } from "../models/Filters";
import { ChampionRoleService } from "../services/ChampionRoleService";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { ChampionRole } from "../models/ChampionRole";

const championRoleService = new ChampionRoleService();

export class ChampionRoleController implements ControllerInterface {

    update(req: Request, res: Response): Promise<void> {

        // TODO: Implementar
        throw new Error("Method not implemented.");
    }
    delete(req: Request, res: Response): Promise<void> {
        // TODO: Implementar
        throw new Error("Method not implemented.");
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const filters: FilterChampionRole = { ...FilterDefault, ...req.query };
            const roles: ChampionRole[] = await championRoleService.getAll(filters);

            res.status(200).json({ roles: roles, length: roles.length });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const roleId = req.params.id ? parseInt(req.params.id) : null;
            const userId: number = req.userId as number;

            if (!roleId) {
                res.status(400).send({ error: "ID é inválido" })
                return;
            }
            
            const role = await championRoleService.getById(roleId);
            res.status(200).json(role);
        } catch (error) {
            throw new Error("Erro ao buscar classe");
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const role = req.body;
            const requiredFields = ['name', 'description', 'hp', 'mp', 'ep'];
            const missingFields = requiredFields.filter(field => !role[field]);

            if (missingFields.length > 0) {
                res.status(400).send({ 
                    error: "Campos obrigatórios faltando", 
                    missingFields: missingFields 
                });
                return;
            }

            // TODO: Criar MAPPER
            const newRole = await championRoleService.create(role);
            res.status(201).json(newRole);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}