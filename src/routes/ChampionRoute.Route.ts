import { Router } from "express";
import {ChampionController} from "../controllers/ChampionController";

const championController = new ChampionController();
const ChampionRoute = Router();

/**
 * @swagger
 * path:
 * /api/champions:
 *   get:
 *     summary: Listar todos os campeões
 *     description: Retorna uma lista de todos os campeões disponíveis.
 *     tags:
 *       - Campeões
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Nome do campeão para filtrar.
 *         schema:
 *           type: string
 *           example: "Ahri"
 *       - in: query
 *         name: role
 *         required: false
 *         description: Função ou classe do campeão para filtrar.
 *         schema:
 *           type: string
 *           example: "Mage"
 *       - in: query
 *         name: level
 *         required: false
 *         description: Nível do campeão para filtrar.
 *         schema:
 *           type: integer
 *           example: 1
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
 *         description: Lista de campeões
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                      id:
 *                          type: string
 *                          description: Identificador único do campeão
 *                      name:
 *                          type: string
 *                          description: Nome do campeão
 *                      roleId:
 *                          type: integer
 *                          description: ID da função ou classe do campeão
 *                      guildId:
 *                          type: string
 *                          nullable: true
 *                          description: Identificador da guilda à qual o campeão pertence (pode ser nulo)
 *                      money:
 *                          type: number
 *                          format: float
 *                          description: Quantidade de dinheiro do campeão
 *                      strength:
 *                          type: integer
 *                          description: Atributo de força física do campeão
 *                      dexterity:
 *                          type: integer
 *                          description: Atributo de agilidade e precisão do campeão
 *                      intelligence:
 *                          type: integer
 *                          description: Atributo de inteligência e magia do campeão
 *                      vitality:
 *                          type: integer
 *                          description: Atributo de resistência e vida máxima do campeão
 *                      hp:
 *                          type: integer
 *                          description: Pontos de vida atuais do campeão
 *                      level:
 *                          type: integer
 *                          description: Nível atual do campeão
 *                      xp:
 *                          type: integer
 *                          description: Experiência acumulada pelo campeão
 *                      xp_max:
 *                          type: integer
 *                          description: Experiência necessária para o próximo nível
 *                      sp:
 *                          type: integer
 *                          description: Pontos de habilidade disponíveis para distribuição
 *       400:
 *         description: Requisição malformada
 *       404:
 *         description: Não foi encontrado nenhum campeão com os filtros especificados
 *       500:
 *         description: Erro interno do servidor
 */
ChampionRoute.get("/", championController.getAll);

/**
 * @swagger
 * /api/champions/{id}:
 *   get:
 *     summary: Recuperar um campeão específico
 *     description: Retorna um campeão baseado no ID fornecido.
 *     tags:
 *       - Campeões
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes do campeão
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Identificador único do campeão
 *                 name:
 *                   type: string
 *                   description: Nome do campeão
 *       404:
 *         description: Campeão não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
ChampionRoute.get("/:id", championController.getById);

/**
 * @swagger
 * /api/champions:
 *   post:
 *     summary: Criar um novo campeão
 *     description: Cria um novo campeão com as informações fornecidas.
 *     tags:
 *       - Campeões
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - roleName
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do campeão.
 *               roleName:
 *                 type: string
 *                 description: Identificador único da classe do campeão.
 *     responses:
 *       201:
 *         description: Campeão criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Identificador único do campeão.
 *                 name:
 *                   type: string
 *                   description: Nome do campeão.
 *       400:
 *         description: Erro na requisição.
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
ChampionRoute.post("/", championController.createChampion);

/**
 * @swagger
 * /api/champions/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um campeão existente
 *     description: Atualiza os atributos especificados de um campeão a partir do ID fornecido.
 *     tags:
 *       - Campeões
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do campeão a ser atualizado
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               money:
 *                 type: number
 *                 example: 150
 *               guildId:
 *                 type: string
 *                 example: "abc123"
 *               strength:
 *                 type: number
 *                 example: 12
 *               dexterity:
 *                 type: number
 *                 example: 10
 *               intelligence:
 *                 type: number
 *                 example: 8
 *               vitality:
 *                 type: number
 *                 example: 9
 *               hp:
 *                 type: number
 *                 example: 100
 *               xp:
 *                 type: number
 *                 example: 2000
 *               sp:
 *                 type: number
 *                 example: 30
 *     responses:
 *       200:
 *         description: Campeão atualizado com sucesso
 *       400:
 *         description: Requisição inválida
 *       404:
 *         description: Campeão não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

ChampionRoute.patch("/:id", championController.updateChampion);


/**
 * @swagger
 * /api/champions/{id}:
 *   delete:
 *     summary: Excluir um campeão
 *     description: Remove um campeão baseado no ID fornecido.
 *     tags:
 *       - Campeões
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campeão excluído com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */
ChampionRoute.delete("/:id", championController.deleteChampion);

export default ChampionRoute;