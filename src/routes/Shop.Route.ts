import { Router } from "express";
import { ShopController } from "../controllers/ShopController";

const shopRoute = Router();
const shopController = new ShopController();

/**
 * @swagger
 * /api/shop:
 *   get:
 *     summary: Lista todas as lojas
 *     tags: [Shop]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar lojas pelo nome
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filtrar lojas pela cidade
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrar lojas pela categoria
 *     responses:
 *       200:
 *         description: Lista de lojas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
 */
shopRoute.get('/', shopController.getAll);

/**
 * @swagger
 * /api/shop/{id}:
 *   get:
 *     summary: Busca uma loja pelo ID
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da loja
 *     responses:
 *       200:
 *         description: Loja encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       404:
 *         description: Loja não encontrada
 */
shopRoute.get('/:id', shopController.getById);

/**
 * @swagger
 * /api/shop:
 *   post:
 *     summary: Cria uma nova loja
 *     tags: [Shop]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shop'
 *     responses:
 *       201:
 *         description: Loja criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 */
shopRoute.post('/', shopController.create);

/**
 * @swagger
 * /api/shop/{id}:
 *   patch:
 *     summary: Atualiza uma loja existente
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da loja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shop'
 *     responses:
 *       200:
 *         description: Loja atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       404:
 *         description: Loja não encontrada
 */
shopRoute.patch('/:id', shopController.update);

/**
 * @swagger
 * /api/shop/{id}:
 *   delete:
 *     summary: Remove uma loja
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da loja
 *     responses:
 *       204:
 *         description: Loja removida com sucesso
 *       404:
 *         description: Loja não encontrada
 */
shopRoute.delete('/:id', shopController.delete);

export default shopRoute;
