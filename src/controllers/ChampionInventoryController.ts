import { Request, Response } from "express";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { ChampionInventoryService } from "../services/InventoryService";

const championInventoryService = new ChampionInventoryService();

export class ChampionInventoryController implements ControllerInterface {
    getAll(req: Request, res: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getById(req: Request, res: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }
    create(req: Request, res: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(req: Request, res: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(req: Request, res: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }

}