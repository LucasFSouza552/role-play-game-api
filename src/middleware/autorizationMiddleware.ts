import { NextFunction, Response, Request } from "express";
import { UserService } from "../services/UserService";


const userService = new UserService();
export default async function authorizationMiddleware(allowedRoles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({ error: "Usuário inválido" });
            return;
        }

        const userProfile = await userService.getById(userId);

        if (!allowedRoles.includes(userProfile.role)) {
            res.status(403).json({ error: "Você não tem permissão para acessar este recurso" });
            return;
        }
        next();
    };
}
