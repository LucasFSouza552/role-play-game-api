
import { Router } from "express";
import {ChampionController} from "../controllers/ChampionController";


const championController = new ChampionController();
const ChampionRoute = Router();

ChampionRoute.get("/", championController.getAll);

export default ChampionRoute;