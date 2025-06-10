class ProtectedController {
    // Usuário normal
    static dashboard(req, res) {
        try {
            return res.status(200).json({
                message: `Bem-vindo ao painel,
   ${req.user.email}`
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao acessar o painel', error:
                    error.message
            });
        }
    }

    // Usuário admin
    static adminOnly(req, res) {
        try {
            return res.status(200).json({
                message: `Bem-vindo à área admin,
   ${req.user.email}`
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao acessar a área admin',
                error: error.message
            });
        }
    }
}

module.exports = ProtectedController;
