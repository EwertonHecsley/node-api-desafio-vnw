# API de Gerenciamento de Usuários - Médicos e Dentistas

Esta API fornece operações de gerenciamento de usuários (cadastro, consulta, atualização e remoção) para o projeto **Médicos e Dentistas**.

## Tecnologias utilizadas

- **Node.js**
- **Express 5**
- **dotenv** para variáveis de ambiente
- **Nodemon** (ambiente de desenvolvimento)
- Persistência em **arquivo JSON local** (`src/data/users.json`)

## Arquitetura da API

- **Controller**: recebe requisição e envia resposta HTTP.
- **DTOs**: validam e sanitizam os dados de entrada.
- **Service**: aplica regras de negócio e persiste dados no JSON.
- **Middleware global de erro**: padroniza respostas de falha.

## Pré-requisitos

- Node.js 18+
- npm

## Configuração e execução

1. Instale as dependências:

```bash
npm install
```

2. Configure as variáveis de ambiente no arquivo `.env`:

```env
NODE_ENV=development
PORT=3000
```

3. Execute a API:

```bash
npm run dev
```

ou

```bash
npm start
```

## URL base

```text
http://localhost:3000/api
```

## Formato padrão de erro

Quando ocorre erro, a API responde no formato:

```json
{
  "status": "error",
  "message": "Mensagem de erro",
  "errors": ["Detalhes opcionais"]
}
```

## Endpoints

### 1. Health Check

- **Método:** `GET`
- **Rota:** `/health`

#### Exemplo de requisição

```bash
curl -X GET http://localhost:3000/api/health
```

#### Exemplo de resposta (200)

```json
{
  "status": "ok",
  "uptime": 12.345678
}
```

---

### 2. Listar todos os usuários

- **Método:** `GET`
- **Rota:** `/users`

#### Exemplo de requisição

```bash
curl -X GET http://localhost:3000/api/users
```

#### Exemplo de resposta (200)

```json
[
  {
    "id": 1,
    "name": "Usuario Teste",
    "email": "teste@email.com",
    "phone": "99999999999",
    "message": "Teste de mensagem",
    "createdAt": "2026-03-08T01:33:24.243Z"
  }
]
```

---

### 3. Buscar usuário por ID

- **Método:** `GET`
- **Rota:** `/users/:id`

#### Exemplo de requisição

```bash
curl -X GET http://localhost:3000/api/users/1
```

#### Exemplo de resposta (200)

```json
{
  "id": 1,
  "name": "Usuario Teste",
  "email": "teste@email.com",
  "phone": "99999999999",
  "message": "Teste de mensagem",
  "createdAt": "2026-03-08T01:33:24.243Z"
}
```

#### Exemplo de resposta (404)

```json
{
  "status": "error",
  "message": "Usuário não encontrado."
}
```

---

### 4. Criar usuário

- **Método:** `POST`
- **Rota:** `/users`

#### Body esperado

```json
{
  "name": "string (mínimo 3 caracteres)",
  "email": "email válido",
  "phone": "string com 10 ou 11 dígitos",
  "message": "string com até 500 caracteres"
}
```

#### Exemplo de requisição

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Silva",
    "email": "maria.silva@email.com",
    "phone": "85999998888",
    "message": "Usuária cadastrada no sistema"
  }'
```

#### Exemplo de resposta (201)

```json
{
  "id": 4,
  "name": "Maria Silva",
  "email": "maria.silva@email.com",
  "phone": "85999998888",
  "message": "Usuária cadastrada no sistema",
  "createdAt": "2026-03-08T02:10:00.000Z"
}
```

#### Exemplo de resposta (400 - validação)

```json
{
  "status": "error",
  "message": "Falha na validacao dos dados.",
  "errors": [
    "O campo \"email\" é obrigatório, deve ser uma string e deve ser um email válido."
  ]
}
```

#### Exemplo de resposta (409 - duplicidade)

```json
{
  "status": "error",
  "message": "E-mail já cadastrado."
}
```

---

### 5. Atualizar usuário

- **Método:** `PUT`
- **Rota:** `/users/:id`
- Aceita atualização parcial (`name`, `email`, `phone`, `message`).

#### Exemplo de requisição

```bash
curl -X PUT http://localhost:3000/api/users/3 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuario Alterado",
    "phone": "85999997777"
  }'
```

#### Exemplo de resposta (204)

Sem conteúdo no body.

#### Exemplo de resposta (400 - sem dados válidos)

```json
{
  "status": "error",
  "message": "Nenhum dado válido para atualização foi enviado."
}
```

#### Exemplo de resposta (404)

```json
{
  "status": "error",
  "message": "Usuário não encontrado para atualização."
}
```

---

### 6. Remover usuário

- **Método:** `DELETE`
- **Rota:** `/users/:id`

#### Exemplo de requisição

```bash
curl -X DELETE http://localhost:3000/api/users/3
```

#### Exemplo de resposta (200)

```json
{
  "message": "Usuário removido com sucesso"
}
```

#### Exemplo de resposta (404)

```json
{
  "status": "error",
  "message": "Usuário não encontrado para exclusão."
}
```

## Arquivo de requisições pronto

O projeto já possui um arquivo para testes manuais:

- `example.requests.http`

Você pode usar esse arquivo com extensões de REST Client no VS Code para executar as chamadas rapidamente.
