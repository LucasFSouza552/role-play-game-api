import { Router } from "express";
import { ItemController } from "../controllers/ItemController";

const ItemRoute = Router();

ItemRoute.get("/", (req, res) => ItemController.getAllItems(req, res));
ItemRoute.get("/:id", (req, res) => ItemController.getItemById(req, res));
ItemRoute.post("/", (req, res) => ItemController.createItem(req, res));
ItemRoute.patch("/:id", (req, res) => ItemController.updateItem(req, res));
ItemRoute.delete("/:id", (req, res) => ItemController.deleteItem(req, res));

export default ItemRoute;