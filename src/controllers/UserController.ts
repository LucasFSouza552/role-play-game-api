import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { validatePassword } from "../utils/bcryptPassword";
import { generateJwtToken } from "../utils/jwt";
import { UserMapper } from "../utils/mapppers/userMapping";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { createUserDTO, updateUserDTO } from "../DTOS/UserDTO";
import { FilterDefault, FilterUser } from "../models/Filters";
import { ThrowsError } from "../errors/ThrowsError";
import isValidEmail from "../utils/emailValidator";

const userService = new UserService();

export class UserController implements ControllerInterface {

	async create(req: Request, res: Response) {
		try {
			const user = req.body;

			if (!user || !user.name.trim() || !user.email || !user.password) {
				throw new ThrowsError('Missing information to create a user', 400);
			}

			if(!isValidEmail(user.email)) {
				throw new ThrowsError('Invalid email', 400);
			}	

			const userExists = await userService.getByEmail(user.email);

			if (userExists) {
				throw new ThrowsError('User already registered', 409);
			}

			const userData: createUserDTO = UserMapper.mapCreateUserToDTO(user);

			const newUser = await userService.create(userData);

			if (!newUser) {
				throw new ThrowsError('Error creating user', 404);
			}

			const token = generateJwtToken(newUser.id);
			res.status(201).json({ token });
			return;
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			const filter: FilterUser = { ...FilterDefault, ...req.query };
			const users = await userService.getAll(filter);

			if (!users) {
				throw new ThrowsError('Error getting users', 404);
			}

			res.status(200).json({ users: users, length: users.length });
			return;
		} catch (error) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}

	async authenticateUser(req: Request, res: Response) {
		try {
			const user = req.body;
			const email = user.email.trim();
			const password = user.password.trim();

			if (!email || !password) {
				throw new ThrowsError('Missing information to authenticate a user', 400);
			}

			const User = await userService.getByEmail(email);

			if (!User) {
				throw new ThrowsError('User not found', 404);
			}

			const passwordEncoded = await validatePassword(password, User.password);

			if (!passwordEncoded) {
				throw new ThrowsError('Invalid credentials', 400);
			}

			const token = generateJwtToken(User.id);
			res.status(200).json({ token: token });
			return;
		} catch (error) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const userId = req.userId;

			if (!userId) {
				throw new ThrowsError('Missing information to find a user', 400);
			}

			const user = await userService.getById(userId);

			if (!user) {
				throw new ThrowsError('User not found', 404);
			}

			res.status(200).json({ user });
			return;
		} catch (error) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}

	async update(req: Request, res: Response) {

		try {
			const userId = req.userId;
			const userBody: updateUserDTO = req.body;

			if (!userId) {
				throw new ThrowsError("Missing information to update a user", 400);
			}

			const otherUserId: number = userBody.id || userId;

			const User = await userService.getById(otherUserId);

			if (!User) {
				throw new ThrowsError("User not found", 404);
			}

			if (!userBody) {
				throw new ThrowsError("Missing information to update a user", 400);
			}

			userBody.id = otherUserId;
			const userData: updateUserDTO = UserMapper.mapUserToUpdateDTO(userBody);

			const userUpdated = await userService.update(userData);
			if (!userUpdated || userUpdated.id !== otherUserId) {
				throw new ThrowsError("Error updating the user", 400);
			}

			const token = generateJwtToken(userUpdated.id);

			res.status(200).json({ token });
			return;
		} catch (error) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}

	async delete(req: Request, res: Response): Promise<void> {
		try {
			const userId = req.userId as number;

			if (!userId) {
				throw new ThrowsError("Missing information to delete a user", 400);
			}

			const userDeleted = await userService.delete(userId);
			if (!userDeleted) {
				throw new ThrowsError("Error deleting the user", 400);
			}

			res.status(204).send();
			return;
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}
}

