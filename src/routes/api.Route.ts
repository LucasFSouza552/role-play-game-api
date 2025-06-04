import { Router } from "express";

import ChampionRoute from "./Champion.Route"
import MissionsRoute from "./Missions.Route";
import ChampionRoleRoute from "./ChampionRole.Route";
import userRoute from "./User.Route";
import ChampionInventory from "./ChampionInventory.Route";
import ItemRoute from "./Item.Route";
import ShopRoute from "./Shop.Route";

import AuthMiddleware from "../middleware/authMiddleware";
import authorizationMiddleware from "../middleware/autorizationMiddleware";

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

// Rotas que requerem autenticação e autorização de admin
apiRoute.use("/inventory", AuthMiddleware, authorizationMiddleware(["admin"]), ChampionInventory);
apiRoute.use("/items", AuthMiddleware, authorizationMiddleware(["admin"]), ItemRoute);
apiRoute.use("/shop", AuthMiddleware, ShopRoute);

export default apiRoute;
