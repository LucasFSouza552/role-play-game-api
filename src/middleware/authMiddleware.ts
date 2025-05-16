import { NextFunction, Request, Response } from "express";
import { validateAuthorizationHeader } from "../utils/jwt";

declare module "express-serve-static-core" {
    interface Request {
        userId?: number;
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
        res.status(401).json({ error: "Invalid token" });
        return;
    }
    req.userId = decodedToken.id as number;

    next();
}