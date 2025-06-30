class PublicController {
  static home(req, res) {
    try {
      return res.status(200).send("Bem-vindo à API pública!");
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao acessar a rota pública",
        error: error.message,
      });
    }
  }
}

module.exports = PublicController;
