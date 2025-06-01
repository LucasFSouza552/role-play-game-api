import { Router } from "express";
import { ChampionInventoryController } from "../controllers/ChampionInventoryController";
import authorizationMiddleware from "../middleware/autorizationMiddleware";

const ChampionInventoryRoute = Router();

const championInventoryController = new ChampionInventoryController();

ChampionInventoryRoute.get("/", authorizationMiddleware(["admin"]), championInventoryController.getAll);
ChampionInventoryRoute.get("/:id", championInventoryController.getById);
ChampionInventoryRoute.post("/", championInventoryController.create);
ChampionInventoryRoute.put("/:id", championInventoryController.update);
ChampionInventoryRoute.delete("/:id", championInventoryController.delete);
ChampionInventoryRoute.post("/inventory/:id/items", championInventoryController.createItemInventory);

export default ChampionInventoryRoute;
