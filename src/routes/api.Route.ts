import { Router } from "express";

import ChampionRoute from "./Champion.Route"
import MissionsRoute from "./Missions.Route";
import ChampionRoleRoute from "./ChampionRole.Route";
import userRoute from "./User.Route";
import ItemRoute from "./Item.Route";
import ShopRoute from "./Shop.Route";

import AuthMiddleware from "../middleware/authMiddleware";
import authorizationMiddleware from "../middleware/autorizationMiddleware";
import GuildRoute from "./Guild.Route";

const apiRoute = Router();

apiRoute.get("/", (req, res) => {
	res.send("API"); 
});

// Rotas de usuário (públicas)
apiRoute.use("/user", userRoute);

// Rotas que requerem autenticação
apiRoute.use("/champions", AuthMiddleware, ChampionRoute);

apiRoute.use("/roles", ChampionRoleRoute);
apiRoute.use("/missions", MissionsRoute);
apiRoute.use("/shop", ShopRoute);

// Rotas que requerem autenticação e autorização de admin
apiRoute.use("/guilds", AuthMiddleware, authorizationMiddleware(["admin"]), GuildRoute);
apiRoute.use("/items", AuthMiddleware, authorizationMiddleware(["admin"]), ItemRoute);

// Rota desabilitada
// apiRoute.use("/inventory", AuthMiddleware, authorizationMiddleware(["admin"]), ChampionInventory);

export default apiRoute;
