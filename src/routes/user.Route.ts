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
 *     summary: Listar todos os usuários (apenas Administradores)
 *     description: Retorna uma lista de todos os usuários cadastrados. Acesso restrito para administradores.
 *     tags:
 *       - Usuários (Users)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Filtrar por nome do usuário
 *         schema:
 *           type: string
 *           example: "João"
  *       - in: query
 *         name: role
 *         required: false
 *         description: Filtrar por cargo do usuário
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *           example: "user"
 *       - in: query
 *         name: page
 *         required: false
 *         description: Número da página para paginação
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Número de usuários por página
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *           example: 10
 *       - in: query
 *         name: orderBy
 *         required: false
 *         description: Campo para ordenação
 *         schema:
 *           type: string
 *           enum: [id, name, role]
 *           default: "id"
 *           example: "name"
 *       - in: query
 *         name: order
 *         required: false
 *         description: Direção da ordenação
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: "asc"
 *           example: "asc"
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
 *                     $ref: '#/components/schemas/User'
 *                 length:
 *                   type: integer
 *                   description: Total de usuários retornados
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso proibido - Apenas administradores podem acessar
 *       500:
 *         description: Erro interno do servidor
 */
userRoute.get('/', AuthMiddleware, authorizationMiddleware(["admin"]), userController.getAll);

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Pegar dados do usuário logado
 *     description: Retorna os dados do usuário logado.
 *     tags:
 *       - Usuários (Users)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário logado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: Identificador único do usuário.
 *                 name:
 *                   type: string
 *                   description: Nome do usuário.
 *                 email:
 *                   type: string
 *                   description: Email do usuário.
 *       401:
 *         description: Token inválido.
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
 *                 description: Papel do usuário.
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