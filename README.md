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
- `id` - INT AUTO_INCREMENT PRIMARY KEY
- `name` - VARCHAR(100) NOT NULL
- `email` - VARCHAR(100) NOT NULL UNIQUE
- `password` - VARCHAR(255) NOT NULL
- `phone` - VARCHAR(20)
- `role` - ENUM('admin', 'adopter') NOT NULL DEFAULT 'adopter'

### Tabela `pets`
- `id` - INT AUTO_INCREMENT PRIMARY KEY
- `name` - VARCHAR(100) NOT NULL
- `age` - INT NOT NULL
- `species` - VARCHAR(50) NOT NULL
- `size` - ENUM('small', 'medium', 'large') NOT NULL
- `status` - ENUM('available', 'adopted') NOT NULL DEFAULT 'available'
- `description` - TEXT

### Tabela `adoptions`
- `id` - INT AUTO_INCREMENT PRIMARY KEY
- `user_id` - INT NOT NULL
- `pet_id` - INT NOT NULL
- `adoption_date` - DATE NOT NULL
- `foreign key (user_id)` - REFERENCES users(id)
- `foreign key (pet_id)` - REFERENCES pets(id)

## Rotas

- `/public/*` - Rotas públicas (acesso livre)
- `/auth/*` - Rotas de autenticação (registro e login - acesso livre)
- `/protected/*` - Rotas protegidas (requer autenticação JWT)

## Testes

- `/tests/api_test.rest` - Arquivo de testes com exemplos de requisições
- Faça um registro de usuário e obtenha um token JWT para utilizar as rotas protegidas
- Utilize o token JWT no cabeçalho `Authorization` das requisições protegidas
- Lembre-se de substituir o token JWT pelo token recebido após o registro

Para mais detalhes sobre as rotas disponíveis e testes, consulte o arquivo `tests/api_test.rest`.