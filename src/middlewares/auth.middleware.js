const jwt = require('jsonwebtoken');

// Autenticar o token JWT enviado pelo cliente
function authenticateToken(req, res, next) {
    // Recuperar requisição
    const authHeader = req.headers['authorization'];
    // Extrair o token no formato "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    // Valida o token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;

        next();
    });
}

// Autorizar o acesso com base na função do usuário
function authorizeRole(role) {
    return (req, res, next) => {
        // Verificar função do usuário
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Acesso negado' });
        }

        next();
    };
}

module.exports = { authenticateToken, authorizeRole };
