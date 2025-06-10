const UserService = require('../services/userService');

class AuthController {
    // Cadastrar novo usuário
    static async register(req, res) {
        try {
            const result = await UserService.registerUser(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(409).json({ message: error.message });
        }
    }

    // Logar usuário
    static async login(req, res) {
        try {
            const result = await UserService.loginUser(req.body);
            return res.status(200).json(result);
        } catch (error) {
            const status =
                error.message === 'Usuário não encontrado' || error.message === 'Senha inválida'
                    ? 401 // Não autorizado
                    : 500; // Erro interno do servidor
            return res.status(status).json({ message: error.message });
        }
    }
}

module.exports = AuthController;
