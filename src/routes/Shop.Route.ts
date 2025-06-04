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

/**
 * @swagger
 * /api/shop/{id}/inventory:
 *   get:
 *     tags:
 *       - Shop
 *     summary: Get inventory by shop ID
 *     description: Retrieves the inventory for a specific shop
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the shop to retrieve inventory for
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       '400':
 *         description: Invalid ID supplied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid ID"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error fetching shop inventory"
 */
shopRoute.get('/:id/inventory', shopController.getInventory);

/**
 * @swagger
 * /api/shop/{id}/purchase:
 *   post:
 *     summary: Realiza a compra de itens em uma loja
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da loja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - championId
 *               - itemId
 *               - quantity
 *             properties:
 *               championId:
 *                 type: integer
 *                 description: ID do campeão que está realizando a compra
 *               itemId:
 *                 type: integer
 *                 description: ID do item a ser comprado
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 999
 *                 description: Quantidade do item a ser comprado (1-999)
 *     responses:
 *       200:
 *         description: Compra realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: |
 *           Erro na requisição. Possíveis motivos:
 *           - IDs inválidos
 *           - Quantidade inválida
 *           - Campeão não encontrado
 *           - Item não encontrado no inventário
 *           - Dinheiro insuficiente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro detalhada
 *       404:
 *         description: Loja não encontrada
 *       500:
 *         description: Erro interno no servidor
 */
shopRoute.post('/:id/purchase', shopController.purchase);
shopRoute.get('/:id/sell', shopController.sell);



export default shopRoute;
