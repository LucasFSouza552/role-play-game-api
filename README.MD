# 🎮 Role Play Game API

API RESTful para gerenciamento de um jogo de RPG, permitindo o controle de aventureiros, missões, guildas, lojas e itens.

---

## 🧾 Sobre o Projeto
Este projeto é uma API desenvolvida para gerenciar elementos de um jogo de RPG, incluindo personagens, missões, guildas, lojas e itens.

---

## 🚀 Funcionalidades
Aventureiros: Cadastro e gerenciamento de personagens, incluindo nome, progressão, status, classe, inventário, guilda, missões e habilidades.

Missões: Criação e atribuição de missões com título, descrição, dificuldade, prazo e recompensas.

Guildas: Gerenciamento de guildas com nome, nível (baseado nos membros), membros e conquistas.

Lojas: Controle de inventário e rotacionamento diário de itens.

Itens: Cadastro de itens com nome, descrição, raridade, nível e preços.

---

## 💾 Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/LucasFSouza552/role-play-game-api.git
    cd role-play-game-api
    ```

2. Instale as dependências:
    npm installl

3. Configure as variáveis de ambiente:
   - Renomeie o arquivo .env.example para .env.
   - Atualize as variáveis conforme necessário.
  
4. Execute as migrações e seeds:
    ```bash
    npx knex migrate:latest
    npx knex seed:run
    ```

5. Inicie o servidor:
    ```bash
    npm run dev
    ``` 

---

## 📌 Como Usar
Consulte o arquivo ENDPOINTS.MD para obter detalhes sobre os endpoints disponíveis, incluindo métodos, parâmetros e exemplos de requisições.

