import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { user } from "../models/User";
import { cryptPassword, validatePassword } from "../utils/bcryptPassword";
import { generateJwtToken } from "../utils/jwt";

const userService = new UserService();

export class UserController {

    async getUserByEmail(email: string) {
        return await userService.getUserByEmail(email);
    }
    async createUser(req: Request, res: Response) {
        try {
            const user = req.body;

            if (!user || !user.name || !user.email || !user.password) {
                res.status(400).json({ error: "Falta informação necessária para criar um usuário" });
                return;
            }

            const userExists = await userService.getUserByEmail(user.email);

            if (userExists) {
                res.status(400).json({ error: "Usuário já cadastrado" });
                return;
            }

            const passwordEncoded = await cryptPassword(user.password);

            const userData: Omit<user, 'id'> = {
                name: user.name,
                email: user.email,
                password: passwordEncoded,
                role: 'user'
            };

            const newUser = await userService.createUser(userData);
            const token = generateJwtToken(newUser.id);
            res.status(201).json({ token });
        } catch (err: any) {
            console.error(err);
            res.status(400).json({ error: err.message });
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json({ users: users, length: users.length });
        } catch (err: any) {
            console.error(err);
            res.status(400).json({ error: err.message });
        }
    }

    async authenticateUser(req: Request, res: Response) {
        try {
            const user = req.body;

            console.log(user);

            if (!user.email || !user.password) {
                res.status(400).json({ error: "Falta informação necessária para criar um usuário" });
                return;
            }
            
            const User = await userService.getUserByEmail(user.email);
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

    async getUserById(req: Request, res: Response) {
        try {

            const userId: number = req.userId as number;

            const { name, email, role } = await userService.getUserById(userId);
            res.status(200).json({ user: { name, email, role } });
        } catch (err: any) {
            console.error(err);
            res.status(400).json({ error: err.message });
        }
    }

    // async updateUser(id: string, user: user): Promise<user> {
    //     return await userService.updateUser(id, user);
    // }
}
