import { NextFunction, Request, Response } from "express";
import { validateAuthorizationHeader } from "../utils/jwt";
import { ChampionDTO } from "../DTOS/ChampionDTO";
import { userDTO } from "../DTOS/UserDTO";

declare module "express-serve-static-core" {
    interface Request {
        userId?: number;
        user?: userDTO;
        champion?: ChampionDTO;
    }
}

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ error: "Token not found" });
        return;
    }
    
    const decodedToken = validateAuthorizationHeader(token);
    if (!decodedToken) {
        res.status(401).json({ error: "Invalid token. Use format Bearer <token>" });
        return;
    }
    req.userId = parseInt(decodedToken.id);
    
    if (isNaN(req.userId)) {
        res.status(401).json({ error: "Invalid token" });
        return;
    }

    next();
}