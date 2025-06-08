import { NextFunction, Request, Response } from "express";
import { ThrowsError } from "../errors/ThrowsError";
import { UserService } from "../services/UserService";

const camposPermitidos = ['id', 'name', 'password', 'role'];

const userService = new UserService();

export async function validateAllowedFields(req: Request, res: Response, next: NextFunction) {
	try {
		const fields = Object.keys(req.body);
		const userId = req.userId;

		if (!userId) {
			throw new ThrowsError("User not authenticated.", 401);
		}

		const user = await userService.getById(userId);

		if (!user) {
			throw new ThrowsError("User not found.", 404);
		}
		const invalidFields = fields.filter(field => !camposPermitidos.includes(field));

		if (invalidFields.length > 0) {
			const plural = invalidFields.length > 1 ? 's' : '';
			const message = `The field${plural} ${invalidFields.join(', ')} ${plural ? 'are' : 'is'} not allowed.`;
			res.status(400).json({
				error: message,
				allowedFields: camposPermitidos,
				invalidFields
			});
			return;
		}
		
		if (fields.includes('role') || fields.includes('id')) {
			const targetUserId = req.body.id;
			if (user.role !== 'admin') {
				throw new ThrowsError("You do not have permission to change the 'role' or 'id' field.", 403);
			}
			if (targetUserId === userId) {
				throw new ThrowsError("You cannot change your own 'role'.", 403);
			}
		}

		next();
	} catch (error) {
		if (error instanceof ThrowsError) {
			res.status(error.statusCode).json({ error: error.message });
		} else {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
}
