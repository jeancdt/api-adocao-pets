const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/userModel");

class UserService {
    // Registrar novo usuário
    static async registerUser(user) {
        const { email, password, role } = user;
        // Verifica e-mail caso cadastrado
        const existing = await UserModel.findByEmail(email);
        if (existing) {
            throw new Error('Usuário já existe');
        }

        // Criptografar senha
        const hashed = await bcrypt.hash(password, 10);
        user.password = hashed;

        // Criar novo usuário
        const id = await UserModel.create(user);

        return { message: 'Usuário registrado com sucesso', id };
    }

    // Autenticar usuário e Gerar token JWT
    static async loginUser({ email, password }) {
        const user = await UserModel.findByEmail(email);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Verificar senha
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Senha inválida');
        }

        // Gerar token JWT
        const token = jwt.sign(
            { email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { token };
    }
}

module.exports = UserService;
