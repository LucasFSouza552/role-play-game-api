import AuthMiddleware from "../middleware/authMiddleware";
import authorizationMiddleware from "../middleware/autorizationMiddleware";
import { validateAllowedFields } from "../middleware/validateAllowedFields";
import { UserController } from "../controllers/UserController";
import { Router } from "express";

const userRoute = Router();

const userController = new UserController();

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Listar todos os usuários
 *     description: Retorna uma lista de usuários com filtros e paginação.
 *     tags:
 *       - Usuários (Users)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar por nome do usuário
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filtrar por cargo do usuário
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Limite de itens por página
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [id, name, role]
 *           default: id
 *         description: Campo para ordenação
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Ordem da ordenação
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: Identificador único do usuário
 *                       name:
 *                         type: string
 *                         description: Nome do usuário
 *                       email:
 *                         type: string
 *                         description: Email do usuário
 *                       role:
 *                         type: string
 *                         description: Cargo do usuário
 *                 length:
 *                   type: number
 *                   description: Número total de usuários retornados
 *       401:
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid token. Use format Bearer <token>"
 *       403:
 *         description: Acesso proibido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission to access this resource"
 *       404:
 *         description: Usuários não encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Users not found"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
userRoute.get("/", AuthMiddleware, authorizationMiddleware(["admin"]), userController.getAll);

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Obter dados do usuário logado
 *     description: Retorna os dados do usuário atualmente logado.
 *     tags:
 *       - Usuários (Users)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário obtidos com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: Identificador único do usuário.
 *                     name:
 *                       type: string
 *                       description: Nome do usuário.
 *                     email:
 *                       type: string
 *                       description: Email do usuário.
 *                     role:
 *                       type: string
 *                       description: Cargo do usuário.
 *       400:
 *         description: Falta de informação para encontrar o usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing information to find a user"
 *       401:
 *         description: Token inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token not found. Use format Bearer <token>"
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
userRoute.get("/profile", AuthMiddleware, userController.getById);

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Criar um novo usuário
 *     description: Cria um novo usuário com as informações fornecidas.
 *     tags:
 *       - Usuários (Users)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário.
 *               email:
 *                 type: string
 *                 description: Email do usuário.
 *               password:
 *                 type: string
 *                 description: Senha do usuário.
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticação do usuário.
 *       400:
 *         description: Requisição inválida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro.
 *       500:
 *         description: Erro interno do servidor.
 */
userRoute.post("/register", userController.create);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Autenticar usuário
 *     description: Autentica um usuário com as credenciais fornecidas.
 *     tags:
 *       - Usuários (Users)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário.
 *               password:
 *                 type: string
 *                 description: Senha do usuário.
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT de autenticação.
 *       400:
 *         description: Requisição inválida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro.
 * 
 */
userRoute.post("/login", userController.authenticateUser);

/**
 * @swagger
 * /api/user/update:
 *   patch:
 *     summary: Atualizar dados do usuário
 *     description: Atualiza os dados do usuário logado com as informações fornecidas.
 *     tags:
 *       - Usuários (Users)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário.
 *               password:
 *                 type: string
 *                 description: Senha do usuário.
 *               role:
 *                 type: string
 *                 description: Cargo do usuário.
 *     responses:
 *       200:
 *         description: Dados do usuário atualizados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso.
 */
userRoute.patch("/update", AuthMiddleware, validateAllowedFields, userController.update);

export default userRoute;