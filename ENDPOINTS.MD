## Base Route Api
```bash
/api
```


### Usuário (User)
```bash 
GET /user # Exibe dados sobre o usuário
POST /user/register # Cria um novo usuário
POST /user/login # Autenticar usuário
PATCH /user/update #Atualiza dados do usuário
```

### Aventureiro (Champion)
```bash
GET /champions # Exibe todos os aventureiros
GET /champions/:id # Exibe um aventureiro específico
GET /champions/:id/skills # Retorna todas as habilidades de um aventureiro
POST /champions #Cria um Aventureiro
POST /champions/:id/items # Adiciona um item no inventário do aventureiro
POST /champions/:id/skill # Adicionar uma habilidade ao aventureiro
POST /champions/:id/guilds/join # Aventureiro entrar na guilda
PATCH /champions # Atualiza um aventureiro
```
    
### Guilda (Guilds)
```bash
GET /guilds # Retorna todas as guildas
GET /guilds/:id # Retorna uma guilda específica
POST /guilds # Cria uma guilda
PATCH /guilds # Atualiza a guilda
POST /guilds/:id/join # Aventureiro entrar na guilda
```

### Missões (Missions)
```bash
GET /missions # Retorna todas as missões
GET /missions/:id # Retorna uma guilda específica
POST /missions # Cria uma missão
PATCH /missions # Atualiza uma missão
POST /missions/:id/accept # Aceita uma missão específica
```

### Lojas (Shop)
```bash
GET /shop # Retorna todas as lojas
GET /shop/:id # Retorna uma loja específica
GET /shop/:id/stock # Retorna os itens de uma loja específica
POST /shop/:id/stock/buy # Compra um item da loja
POST /shop/:id/stock/sell # Vende um item da loja
POST /shop # Cria uma loja
```

### Itens (Itens)
```bash
GET /itens # Retornar todos os itens
GET /itens/:id # Retorna um item em específico
POST /itens # Cria um novo item
POST /itens # Atualiza um item
DELETE /itens # Apaga um item
```