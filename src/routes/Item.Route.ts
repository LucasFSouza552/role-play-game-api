import { Router } from "express";
import { ItemController } from "../controllers/ItemController";

const ItemRoute = Router();

const itemController = new ItemController();

ItemRoute.get("/", itemController.getAllItems);
ItemRoute.get("/:id", itemController.getItemById);
ItemRoute.post("/", itemController.createItem);
ItemRoute.patch("/:id", itemController.updateItem);
ItemRoute.delete("/:id", itemController.deleteItem);

export default ItemRoute;