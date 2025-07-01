const PetService = require("../services/petService");

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

  static async getPetsAvailable(req, res) {
    try {
      const { pets } = await PetService.getPetsAvailable();

      return res.status(200).json(pets);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar animais disponíveis",
        error: error.message,
      });
    }
  }
}

module.exports = PublicController;
