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

    async updateUser(req: Request, res: Response){

        const user = req.userId;

        if (!user) {
            res.status(400).json({ error: "Falta informação necessária para atualizar o usuário" });
            return;
        }

        const User = await userService.getUserById(user);
        
        if(!User) {
            res.status(400).json({ error: "Usuário não encontrado" });
            return;
        }
        
        const userBody:Partial<Omit<user, "id" | "email">> = req.body;

        if(!userBody) {
            res.status(400).json({ error: "Falta informação necessária para atualizar o usuário" });
            return;
        }

        if (userBody?.password) {
            const passwordEncoded = await cryptPassword(userBody.password);
            userBody.password = passwordEncoded;
        }

        const userData: Partial<Omit<user, "id" | "email">> = {
            ...User,
            ...userBody
        }
        const userUpdated = await userService.updateUser(userData as user);
        if (!userUpdated) {
            res.status(400).json({ error: "Erro ao atualizar o usuário" });
            return;
        }   


        const token = generateJwtToken(userUpdated.id);

        res.status(200).json({ token });
    }
}
