# API de Adoção de Pets

API REST para gerenciamento de adoção de pets, permitindo o cadastro de usuários, pets e controle do processo de adoção. O sistema possui diferentes níveis de acesso (administrador e adotante) e utiliza autenticação JWT para garantir a segurança das rotas protegidas.

## Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **MySQL** - Sistema de gerenciamento de banco de dados
- **JWT (JSON Web Token)** - Autenticação e autorização
- **Google Auth Library** - Autenticação com Google
- **bcryptjs** - Criptografia de senhas
- **dotenv** - Gerenciamento de variáveis de ambiente (estará nos arquivos para exemplo)

## Instalação

1. Clone o repositório:
```bash
git clone (link)
```
2. Instale as dependências:
```bash
npm install
```
3. Execute o script SQL (`src/database/init.sql`) para criar o banco de dados e tabelas
4. Configure as variáveis de ambiente no arquivo `.env`

## Execução

Para iniciar o servidor em modo de desenvolvimento:
```bash
npm run dev
```

Para iniciar o servidor em modo de produção:
```bash
npm start
```

## Estrutura do Banco de Dados

### Tabela `users`
- `id` - INT (Primary Key, Auto Increment)
- `name` - VARCHAR(100)
- `email` - VARCHAR(100) UNIQUE
- `password` - VARCHAR(255)
- `phone` - VARCHAR(20)
- `role` - ENUM('admin', 'adopter')

### Tabela `pets`
- `id` - INT (Primary Key, Auto Increment)
- `name` - VARCHAR(100)
- `age` - INT
- `species` - VARCHAR(50)
- `size` - ENUM('small', 'medium', 'large')
- `status` - ENUM('available', 'adopted')
- `description` - TEXT

### Tabela `adoptions`
- `id` - INT (Primary Key, Auto Increment)
- `user_id` - INT (Foreign Key -> users.id)
- `pet_id` - INT (Foreign Key -> pets.id)
- `adoption_date` - DATE

## Rotas

- `/public/*` - Rotas públicas (acesso livre)
- `/auth/*` - Rotas de autenticação (registro e login)
- `/protected/*` - Rotas protegidas (requer autenticação JWT)

## Testes

- `/tests/api_test.rest` - Arquivo de testes com exemplos de requisições
- Faça um registro de usuário e obtenha um token JWT para utilizar as rotas protegidas
- Utilize o token JWT no cabeçalho `Authorization` das requisições protegidas
- Lembre-se de substituir o token JWT pelo token recebido após o registro

Para mais detalhes sobre as rotas disponíveis e testes, consulte o arquivo `tests/api_test.rest`.