import { Router } from "express";
import { ItemController } from "../controllers/ItemController";

const ItemRoute = Router();
const itemController = new ItemController();

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Listar todos os itens
 *     description: Retorna uma lista de todos os itens, com filtros opcionais por nome e preço.
 *     tags:
 *       - Itens (Items)
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Nome do item para filtrar.
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         required: false
 *         description: Preço mínimo para filtrar.
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         required: false
 *         description: Preço máximo para filtrar.
 *         schema:
 *           type: number
 *       - in: query
 *         name: size
 *         required: false
 *         description: Número de itens por página.
 *         schema:
 *           type: integer
 *           default: 5
 *           minimum: 1
 *       - in: query
 *         name: offset
 *         required: false
 *         description: Número de itens a pular para paginação.
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *     responses:
 *       200:
 *         description: Lista de itens retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Erro interno do servidor.
 */
ItemRoute.get("/", itemController.getAll);

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Buscar item por ID
 *     description: Retorna um item específico pelo seu ID.
 *     tags:
 *       - Itens (Items)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do item.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: ID inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro.
 *       404:
 *         description: Item não encontrado.
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
 */
ItemRoute.get("/:id", itemController.getById);

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Criar um novo item
 *     tags: [Itens (Items)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - priceMin
 *               - priceMax
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               priceMin:
 *                 type: number
 *               priceMax:
 *                 type: number
 *               type:
 *                 type: string
 *                 description: Tipo do item (ex: "weapon", "armor", "potion").
 *     responses:
 *       201:
 *         description: Item criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 */
ItemRoute.post("/", itemController.create);

/**
 * @swagger
 * /api/items/{id}:
 *   patch:
 *     summary: Atualizar um item
 *     tags: [Itens (Items)]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               priceMin:
 *                 type: number
 *               priceMax:
 *                 type: number
 *               type:
 *                 type: string
 *                 description: Tipo do item (ex: "weapon", "armor", "potion").
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       404:
 *         description: Item não encontrado.
 */
ItemRoute.patch("/:id", itemController.update);

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Deletar um item
 *     description: Remove um item pelo seu ID.
 *     tags:
 *       - Itens (Items)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do item.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item deletado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item deletado com sucesso.
 *       404:
 *         description: Item não encontrado.
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
 */
ItemRoute.delete("/:id", itemController.delete);

export default ItemRoute;