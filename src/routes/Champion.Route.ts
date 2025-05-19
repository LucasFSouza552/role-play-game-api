import { Router } from "express";
import {ChampionController} from "../controllers/ChampionController";

const championController = new ChampionController();
const ChampionRoute = Router();

/**
 * @swagger
 * path:
 * /api/champions:
 *   get:
 *     summary: Listar todos os campeões do usuário
 *     description: Retorna uma lista de todos os campeões do usuário.
 *     tags:
 *       - Campeões (Champions)
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Nome do campeão para filtrar.
 *         schema:
 *           type: string
 *       - in: query
 *         name: role
 *         required: false
 *         description: Função ou classe do campeão para filtrar.
 *         schema:
 *           type: string
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
 *                          type: number
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
 *     summary: Recuperar um campeão específico do usuário
 *     description: Retorna um campeão do usuário baseado no ID fornecido.
 *     tags:
 *       - Campeões (Champions)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do campeão
 *         content:
 *           application/json:
 *             schema:
 *               type: 
*                  object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único do campeão
 *                 name:
 *                   type: string
 *                   description: Nome do campeão
 *                 roleId:
 *                   type: integer
 *                   description: Função ou classe do campeão
 *                 guildId:
 *                   type: integer
 *                   nullable: true
 *                   description: Identificador da guilda à qual o campeão pertence (pode ser nulo)
 *                 money:
 *                   type: number
 *                   format: float
 *                   description: Quantidade de dinheiro do campeão
 *                 strength:
 *                   type: integer
 *                   description: Atributo de força física do campeão
 *                 dexterity:
 *                   type: integer   
 *                   description: Atributo de agilidade e precisão do campeão
 *                 intelligence:
 *                   type: integer
 *                   description: Atributo de inteligência e magia do campeão
 *                 vitality:
 *                   type: integer
 *                   description: Atributo de resistência e vida máxima do campeão
 *                 hp:
 *                   type: integer
 *                   description: Pontos de vida atuais do campeão
 *                 level:
 *                   type: integer
 *                   description: Nível atual do campeão
 *                 xp:
 *                   type: integer
 *                   description: Experiência acumulada pelo campeão
 *                 xp_max:
 *                   type: integer
 *                   description: Experiência necessária para o próximo nível
 *                 sp:
 *                   type: integer
 *                   description: Pontos de habilidade disponíveis para distribuição
 *                 skills:
 *                    type: array
 *                    items:
 *                       $ref: '#/components/schemas/Skill'
 *                       description: Habilidade do campeão
 *                    description: Lista de habilidades do campeão
 *                 role:
 *                    type: object
 *                    $ref: '#/components/schemas/Role'
 *                    description: Função ou classe do campeão

 *       404:
 *         description: Campeão não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
ChampionRoute.get("/:id", championController.getById);

/** 
 * @swagger
 * /api/champions/{id}/skills:
 *  get:
 *    summary: Recuperar todas as habilidades de um campeão
 *    tags:
 *      - Campeões (Champions)
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Identificador único do campeão
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Lista de habilidades do campeão
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: Identificador único da habilidade
 *                  name:
 *                    type: string
 *                    description: Nome da habilidade
 *                  description:
 *                    type: string
 *                    description: Descrição da habilidade
 *                  type:
 *                    type: string
 *                    description: Tipo da habilidade
 *                  level:
 *                    type: integer
 *                    description: Nível da habilidade
 *                  cost:
 *                    type: integer
 *                    description: Custo da habilidade
 *                  cooldown:
 *                    type: integer
 *                    description: Tempo de recarga da habilidade
 */
ChampionRoute.get('/:id/skills', championController.getSkills);

/**
 * @swagger
 * /api/champions:
 *   post:
 *     summary: Criar um novo campeão
 *     description: Cria um novo campeão com as informações fornecidas.
 *     tags:
 *       - Campeões (Champions)
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
 *                   type: integer
 *                   description: Identificador único do campeão
 *                 name:
 *                   type: string
 *                   description: Nome do campeão
 *                 roleId:
 *                   type: integer
 *                   description: Função ou classe do campeão
 *                 guildId:
 *                   type: integer
 *                   nullable: true
 *                   description: Identificador da guilda à qual o campeão pertence (pode ser nulo)
 *                 money:
 *                   type: number
 *                   format: float
 *                   description: Quantidade de dinheiro do campeão
 *                 strength:
 *                   type: integer
 *                   description: Atributo de força física do campeão
 *                 dexterity:
 *                   type: integer   
 *                   description: Atributo de agilidade e precisão do campeão
 *                 intelligence:
 *                   type: integer
 *                   description: Atributo de inteligência e magia do campeão
 *                 vitality:
 *                   type: integer
 *                   description: Atributo de resistência e vida máxima do campeão
 *                 hp:
 *                   type: integer
 *                   description: Pontos de vida atuais do campeão
 *                 level:
 *                   type: integer
 *                   description: Nível atual do campeão
 *                 xp:
 *                   type: integer
 *                   description: Experiência acumulada pelo campeão
 *                 xp_max:
 *                   type: integer
 *                   description: Experiência necessária para o próximo nível
 *                 sp:
 *                   type: integer
 *                   description: Pontos de habilidade disponíveis para distribuição
 *                 skills:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Skill'
 *                   description: Lista de habilidades do campeão
 *                 role:
 *                   type: object
 *                   $ref: '#/components/schemas/Role'
 *                   description: Função ou classe do campeão
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
 * /api/champions/{id}/status:
 *   patch:
 *     summary: Atualizar o status de um campeão
 *     description: Atualiza o status de um campeão baseado no ID fornecido.
 *     tags:
 *       - Campeões (Champions)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               strength:
 *                 type: integer
 *                 description: Valor a ser adicionado ao atributo de força física do campeão
 *               dexterity:
 *                 type: integer
 *                 description: Valor a ser adicionado ao atributo de agilidade e precisão do campeão
 *               intelligence:
 *                 type: integer
 *                 description: Valor a ser adicionado ao atributo de inteligência e magia do campeão
 *               vitality:
 *                 type: integer
 *                 description: Valor a ser adicionado ao atributo de resistência e vida máxima do campeão
 *     responses:
 *       200:
 *         description: Status do campeão atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único do campeão
 *                 strength:
 *                   type: integer
 *                   description: Novo valor de força física do campeão
 *                 dexterity:
 *                   type: integer
 *                   description: Novo valor de agilidade e precisão do campeão
 *                 intelligence:
 *                   type: integer
 *                   description: Novo valor de inteligência e magia do campeão
 *                 vitality:
 *                   type: integer
 *                   description: Novo valor de resistência e vida máxima do campeão
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
 *       404:
 *         description: Campeão não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
ChampionRoute.patch("/:id/status", championController.updateStatusChampion);


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

/**
 * @swagger
 * /api/champions/{id}/skill:
 *   post:
 *     summary: Adicionar uma habilidade ao campeão
 *     description: Adiciona uma habilidade ao campeão especificado pelo ID.
 *     tags:
 *       - Campeões
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skillId:
 *                 type: number
 *                 description: Identificador da habilidade a ser adicionada.
 *     responses:
 *       200:
 *         description: Habilidade adicionada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 skill:
 *                   type: object
 *                   description: Informações da habilidade adicionada.
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
 *       404:
 *         description: Campeão não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
ChampionRoute.post("/:id/skill", championController.addSkill);


export default ChampionRoute;