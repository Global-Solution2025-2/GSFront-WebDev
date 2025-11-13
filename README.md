# Global Solution 2025: Front-End & WebDev

Este projeto é a entrega da Global Solution 2025 para as disciplinas de Front-End Design e Web Development, com o tema **"O Futuro do Trabalho"**.

Criamos uma plataforma-vitrine interativa, semelhante a uma rede profissional, que conecta talentos e competências. A aplicação é uma Single Page Application (SPA) desenvolvida em **React** e estilizada com **Tailwind CSS** e **Shadcn/UI**.

---

## 1. Resumo do Projeto

A aplicação simula uma rede onde é possível explorar perfis de profissionais de tecnologia. O usuário pode se autenticar para ter acesso à plataforma.

### Funcionalidades Principais

* **Autenticação:** Sistema de login com backend (Node.js local / Vercel API) e rotas protegidas.
* **Listagem de Perfis:** Carregamento de 60+ perfis a partir de um arquivo `perfis.json` local.
* **Busca e Filtros:** Sistema de filtragem em tempo real por nome, área, cidade ou tecnologia.
* **Modal Interativo:** Visualização detalhada do perfil completo de cada profissional ao clicar em um card.
* **Interatividade (LocalStorage):**
    * **Recomendações:** Usuários podem escrever recomendações para um profissional, que ficam salvas no LocalStorage e são exibidas no perfil dele.
    * **Inbox:** Usuários podem enviar mensagens, que são salvas no LocalStorage e podem ser visualizadas em uma "Caixa de Entrada" (Inbox).

---

## 2. Usuários e Senhas

Para acessar a plataforma (localmente ou no deploy), utilize as seguintes credenciais:

* **Usuário:** `admin`
* **Senha:** `senha123`

---

## 3. Instalação do Projeto (Passo-a-Passo)

O projeto é dividido em duas partes que precisam ser executadas **simultaneamente** para testes locais:
1.  `backend`: Um mini-servidor Node.js para autenticação.
2.  `web-front`: A aplicação React (Vite).

### Pré-requisitos

* Node.js (v18 ou superior)
* NPM

### Passo 1: Backend (Servidor de Login Local)

Este servidor simula a autenticação para o ambiente de desenvolvimento.

```bash
# 1. Abra um terminal e navegue até a pasta do backend
cd backend

# 2. Instale as dependências
npm install

# 3. Inicie o servidor (ficará rodando em http://localhost:3001)
node server.js
```

Deixe este terminal rodando.

---

### Passo 2: Frontend (Aplicação React)

Em um novo terminal, execute os seguintes passos:

```bash
# 1. Navegue até a pasta do frontend
cd web-front

# 2. Instale as dependências
npm install

# 3. Inicie a aplicação (ficará rodando em http://localhost:5173)
npm run dev
```

Após esses passos, basta acessar **http://localhost:5173** no seu navegador para usar a aplicação localmente.

---

## 4. Link do Deploy

A aplicação foi hospedada na Vercel e pode ser acessada através do link abaixo:

➡️ **[\[SITE HOSPEDADO NO VERCEL\]](https://gs-front-web-dev.vercel.app)**

---

## 5. Link do Repositório

O código-fonte está disponível no GitHub:

➡️ **[\[LINK DO REPOSITÓRIO GITHUB\]](https://github.com/Global-Solution2025-2/GSFront-WebDev)**

---

## 👥 Integrantes
- Vítor Silva Borsato RM:561805   
- João Pedro Godinho Passiani RM:561602​
- Gabriel Molinari Droppa RM:562082
- Isabela de Deus RM: 565988