const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RPG API",
      version: "1.0.0",
      description: "Documentação da API para o RPG",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Insira seu token JWT no formato: Bearer <token>",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "Identificador único do usuário"
            },
            name: {
              type: "string",
              description: "Nome do usuário"
            },
            email: {
              type: "string",
              description: "Email do usuário"
            },
            role: {
              type: "string",
              description: "Papel do usuário (admin ou user)"
            }
          }
        },
        Champion: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Identificador único do campeão"
            },
            name: {
              type: "string",
              description: "Nome do campeão"
            },
            roleId: {
              type: "integer",
              description: "ID da função ou classe do campeão"
            },
            guildId: {
              type: "integer",
              nullable: true,
              description: "Identificador da guilda à qual o campeão pertence (pode ser nulo)"
            },
            money: {
              type: "number",
              format: "float",
              description: "Quantidade de dinheiro do campeão"
            },
            strength: {
              type: "integer",
              description: "Atributo de força física do campeão"
            },
            dexterity: {
              type: "integer",
              description: "Atributo de agilidade e precisão do campeão"
            },
            intelligence: {
              type: "integer",
              description: "Atributo de inteligência e magia do campeão"
            },
            vitality: {
              type: "integer",
              description: "Atributo de resistência e vida máxima do campeão"
            },
            hp: {
              type: "integer",
              description: "Pontos de vida atuais do campeão"
            },
            level: {
              type: "integer",
              description: "Nível atual do campeão"
            },
            xp: {
              type: "integer",
              description: "Experiência acumulada pelo campeão"
            },
            xp_max: {
              type: "integer",
              description: "Experiência necessária para o próximo nível"
            },
            sp: {
              type: "integer",
              description: "Pontos de habilidade disponíveis para distribuição"
            }
          }
        },
        InventoryItem: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Identificador único do item"
            },
            itemId: {
              type: "integer",
              description: "ID do tipo de item"
            },
            quantity: {
              type: "integer",
              description: "Quantidade do item"
            },
            item: {
              type: "object",
              $ref: "#/components/schemas/Item",
              description: "Detalhes do item"
            }
          }
        },
        Item: {
          type: "object",
          required: ["name", "description", "type", "priceMin", "priceMax"],
          properties: {
            id: {
              type: "integer",
              description: "Identificador único do item",
              example: 1
            },
            name: {
              type: "string",
              description: "Nome do item",
              example: "Espada Longa"
            },
            description: {
              type: "string",
              description: "Descrição detalhada do item",
              example: "Uma espada longa forjada em aço valiriano"
            },
            type: {
              type: "string",
              description: "Tipo do item",
              enum: ["Spells", "Armour", "Weapons", "Potions"],
              example: "Weapons"
            },
            priceMin: {
              type: "number",
              format: "float",
              description: "Preço mínimo do item",
              example: 50.00
            },
            priceMax: {
              type: "number",
              format: "float",
              description: "Preço máximo do item",
              example: 150.00
            }
          }
        },
        Mission: {
          type: "object",
          required: ["name", "description", "reward", "difficulty", "money"],
          properties: {
            id: {
              type: "integer",
              description: "Identificador único da missão",
              example: 1
            },
            name: {
              type: "string",
              description: "Nome da missão",
              example: "Caça ao Dragão"
            },
            description: {
              type: "string",
              description: "Descrição detalhada da missão",
              example: "Caçar um dragão perigoso que está aterrorizando a vila"
            },
            difficulty: {
              type: "string",
              description: "Nível de dificuldade da missão",
              enum: ["Easy", "Medium", "Hard", "Expert"],
              example: "Hard"
            },
            money: {
              type: "number",
              description: "Recompensa em dinheiro",
              example: 100
            },
            sp: {
              type: "integer",
              description: "Recompensa em pontos de habilidade",
              example: 100
            },
            xp: {
              type: "integer",
              description: "Recompensa em pontos de experiência",
              example: 100
            }
          },
        },
        Role: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID da classe"
            },
            name: {
              type: "string",
              description: "Nome da classe"
            },
            description: {
              type: "string",
              description: "Descrição da classe"
            },
            hp: {
              type: "integer",
              description: "Pontos de vida da classe"
            },
            mp: {
              type: "integer",
              description: "Pontos de mana da classe"
            },
            ep: {
              type: "integer",
              description: "Pontos de energia da classe",
            },
          },
        },
        Skill: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID da habilidade"
            },
            name: {
              type: "string",
              description: "Nome da habilidade"
            },
            description: {
              type: "string",
              description: "Descrição da habilidade"
            },
            power: {
              type: "integer",
              description: "Poder da habilidade"
            },
            EP: {
              type: "integer",
              description: "Custo de energia da habilidade"
            },
            MP: {
              type: "integer",
              description: "Custo de mana da habilidade"
            },
            target: {
              type: "string",
              description: "Alvo da habilidade"
            }
          }
        },
        Inventory: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID do inventário"
            },
            ownerId: {
              type: "integer",
              description: "Referência a ShopId ou ChampionId"
            },
            capacity: {
              type: "integer",
              description: "Capacidade máxima do inventário"
            },
            itens: {
              type: "array",
              description: "Lista de itens no inventário",
              items: {
                $ref: "#/components/schemas/InventoryItem"
              }
            }
          },
          required: ["id", "ownerId", "capacity"]
        },
        Shop: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID da loja"
            },
            name: {
              type: "string",
              description: "Nome da loja"
            },
            type: {
              type: "string",
              description: "Tipo da loja",
              enum: ["Spells", "Armour", "Weapons", "Potions"]
            }
          }
        },
        Guild: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID da guilda"
            },
            name: {
              type: "string",
              description: "Nome da guilda"
            },
            level: {
              type: "integer",
              description: "Nível da guilda"
            },
            created_at: {
              type: "string",
              format: "date-time",
              description: "Data de criação da guilda"
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    tags: [
      {
        name: "Usuários (Users)",
        description: "Operações de usuários"
      },
      {
        name: "Campeões (Champions)",
        description: "Operações de personagens"
      },
      {
        name: "Itens (Items)",
        description: "Operações de itens (Apenas Administradores)"
      },
      {
        name: "Missões (Missions)",
        description: "Operações de missões"
      },
      {
        name: "Classes (Roles)",
        description: "Operações de classes"
      },
      {
        name: "Habilidades (Skills)",
        description: "Operações de habilidades"
      },
      {
        name: "Guildas (Guilds)",
        description: "Operações de guildas"
      },
      {
        name: "Lojas (Shops)",
        description: "Operações de lojas"
      }
    ]
  },
  apis: ["./src/routes/*.Route.ts"]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
