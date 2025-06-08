## Base Route Api
```bash
/api
```

### Usuário (user)
```bash
GET /api/user # Listar todos os usuários
PATCH /api/user # Atualizar dados do usuário
GET /api/user/profile # Obter dados do usuário logado
POST /api/user/register # Criar um novo usuário
POST /api/user/login # Autenticar usuário
```

### Campeões (champions)
```bash
GET /api/champions # Listar todos os campeões do usuário
POST /api/champions # Criar um novo campeão
GET /api/champions/{id} # Recuperar um campeão específico do usuário
DELETE /api/champions/{id} # Excluir um campeão
PATCH /api/champions/{id} # Atualizar o nome de um campeão
POST /api/champions/{id}/skills # Adicionar habilidade ao campeão
PATCH /api/champions/{id}/status # Atualizar o status de um campeão
PATCH /api/champions/{id}/guild/join # Entrar na guilda
PATCH /api/champions/{id}/guild/leave # Sair da guilda
GET /api/champions/{id}/inventory # Obter inventário do campeão
POST /api/champions/{id}/inventory # Atualizar inventário do campeão (Administradores)
PATCH /api/champions/{id}/inventory # Atualizar quantidade de itens no inventário (Administradores)
```

### Itens (items)
```bash
GET /api/items # Listar todos os itens
POST /api/items # Criar novo item
GET /api/items/{id} # Obter item por ID
PATCH /api/items/{id} # Atualizar item
DELETE /api/items/{id} # Excluir item
```

### Missões (missions)
```bash
GET /api/missions # Listar todas as missões
POST /api/missions # Criar nova missão
GET /api/missions/{id} # Obter missão por ID
PATCH /api/missions/{id} # Atualizar missão
DELETE /api/missions/{id} # Excluir missão
```

### Classes (roles)
```bash
GET /api/roles # Listar classes disponíveis
POST /api/roles # Criar nova classe
PATCH /api/roles # Atualizar classe
GET /api/roles/{id} # Recuperar uma classe específica
DELETE /api/roles/{id} # Excluir classe
```

### Guildas (guilds)
```bash
GET /api/guilds # Listar guildas
POST /api/guilds # Criar nova guilda
GET /api/guilds/{id} # Obter guilda por ID
PATCH /api/guilds/{id} # Atualizar guilda
DELETE /api/guilds/{id} # Excluir guilda
```

### Lojas (shop)
```bash
GET /api/shop # Listar todas as lojas
POST /api/shop # Criar nova loja
GET /api/shop/{id} # Buscar loja por ID
PATCH /api/shop/{id} # Atualizar loja
DELETE /api/shop/{id} # Excluir loja
GET /api/shop/{id}/inventory # Obter inventário da loja
POST /api/shop/{id}/purchase # Realizar compra
POST /api/shop/{id}/sell # Realizar venda
```
