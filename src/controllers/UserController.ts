import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { validatePassword } from "../utils/bcryptPassword";
import { generateJwtToken } from "../utils/jwt";
import { UserMapper } from "../utils/mapppers/userMapping";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { createUserDTO, updateUserDTO } from "../DTOS/UserDTO";

const userService = new UserService();

export class UserController implements ControllerInterface {

	async create(req: Request, res: Response) {
		try {
			const user = req.body;

			if (!user || !user.name || !user.email || !user.password) {
				res.status(400).json({ error: "Falta informação necessária para criar um usuário" });
				return;
			}

			const userExists = await userService.getByEmail(user.email);

			if (userExists) {
				res.status(400).json({ error: "Usuário já cadastrado" });
				return;
			}

			const userData: createUserDTO = UserMapper.mapCreateUserToDTO(user);

			const newUser = await userService.create(userData);
			const token = generateJwtToken(newUser.id);
			res.status(201).json({ token });
		} catch (err: any) {
			console.error(err);
			res.status(400).json({ error: err.message });
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			const users = await userService.getAll();
			res.status(200).json({ users: users, length: users.length });
		} catch (err: any) {
			console.error(err);
			res.status(400).json({ error: err.message });
		}
	}

	async authenticateUser(req: Request, res: Response) {
		try {
			const user = req.body;

			if (!user.email || !user.password) {
				res.status(400).json({ error: "Falta informação necessária para criar um usuário" });
				return;
			}

			const User = await userService.getByEmail(user.email);

			if (!User) {
				res.status(400).json({ error: "Usuário não encontrado" });
				return;
			}

			const passwordEncoded = await validatePassword(user.password, User.password);

			if (!passwordEncoded) {
				res.status(400).json({ error: "Credenciais inválidas" });
				return;
			}

			const token = generateJwtToken(User.id);
			res.status(200).json({ token: token });
		} catch (err: any) {
			console.error(err);
			res.status(400).json({ error: err.message });
		}
	}

	async getById(req: Request, res: Response) {
		try {

			const userId: number = req.userId as number;

			const user = await userService.getById(userId);
			res.status(200).json({ user });
		} catch (err: any) {
			console.error(err);
			res.status(400).json({ error: err.message });
		}
	}

	async update(req: Request, res: Response) {

		const user = req.userId;

		if (!user) {
			res.status(400).json({ error: "Falta informação necessária para atualizar o usuário" });
			return;
		}

		const User = await userService.getById(user);

		if (!User) {
			res.status(400).json({ error: "Usuário não encontrado" });
			return;
		}

		const userBody: updateUserDTO = req.body;

		if (!userBody) {
			res.status(400).json({ error: "Falta informação necessária para atualizar o usuário" });
			return;
		}

		const userData: updateUserDTO = UserMapper.mapUserToUpdateDTO(userBody); 

		const userUpdated = await userService.update(userData);
		if (!userUpdated || userUpdated.id !== user) {
			res.status(400).json({ error: "Erro ao atualizar o usuário" });
			return;
		}


		const token = generateJwtToken(userUpdated.id);

		res.status(200).json({ token });
	}

	delete(req: Request, res: Response): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
