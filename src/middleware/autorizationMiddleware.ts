import { NextFunction, Response, Request } from "express";
import { UserService } from "../services/UserService";
import { ThrowsError } from "../errors/ThrowsError";


const userService = new UserService();
export default function authorizationMiddleware(allowedRoles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId;

            if (!userId) {
                throw new ThrowsError("Invalid user", 401);
            }

            const userProfile = await userService.getById(userId);

            if (!allowedRoles.includes(userProfile.role)) {
                throw new ThrowsError("You do not have permission to access this resource", 403);
            }
            req.user = userProfile;
            next();
        } catch (error) {
            if (error instanceof ThrowsError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    };
}
