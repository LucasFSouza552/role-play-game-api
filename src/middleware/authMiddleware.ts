import { NextFunction, Request, Response } from "express";
import { validateAuthorizationHeader } from "../utils/jwt";
import { ChampionDTO } from "../DTOS/ChampionDTO";
import { userDTO } from "../DTOS/UserDTO";
import { ThrowsError } from "../errors/ThrowsError";

declare module "express-serve-static-core" {
	interface Request {
		userId?: number;
		user?: userDTO;
		champion?: ChampionDTO;
	}
}

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {

	try {
		const token = req.headers.authorization;
		if (!token) {
            throw new ThrowsError("Token not found. Use format Bearer <token>", 401);
		}

		const decodedToken = validateAuthorizationHeader(token);
		if (!decodedToken) {
			throw new ThrowsError("Invalid token. Use format Bearer <token>", 401);
		}
		req.userId = parseInt(decodedToken.id);

		if (isNaN(req.userId)) {
			throw new ThrowsError("Invalid token. Use format Bearer <token>", 401);
		}
	} catch (error) {
        if (error instanceof ThrowsError) {
            res.status(error.statusCode).json({ error: error.message });
            return;
        } else {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
	}

    next();
}
