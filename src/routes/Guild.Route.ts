import { Router } from "express";
import { GuildController } from "../controllers/GuildController";

const guildController = new GuildController(); 
const GuildRouter = Router();

GuildRouter.get("/", guildController.getAll);

GuildRouter.get("/:id",guildController.getById);

GuildRouter.post("/",guildController.create);

GuildRouter.patch("/:id", guildController.update);

GuildRouter.delete("/:id", guildController.delete);



export default GuildRouter;
