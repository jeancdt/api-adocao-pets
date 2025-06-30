const UserService = require("../services/userService");
const PetService = require("../services/petService");

class ProtectedController {
  // Usuário normal
  static dashboard(req, res) {
    try {
      return res.status(200).json({
        message: `Bem-vindo ao painel,
   ${req.user.email}`,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao acessar o painel",
        error: error.message,
      });
    }
  }

  // Usuário admin
  static adminOnly(req, res) {
    try {
      return res.status(200).json({
        message: `Bem-vindo à área admin,
   ${req.user.email}`,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao acessar a área admin",
        error: error.message,
      });
    }
  }

  static async getUsers(req, res) {
    try {
      const { users } = await UserService.getUsers();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar usuários",
        error: error.message,
      });
    }
  }

  static async findById(req, res) {
    try {
      const id = req.params.id;
      const { user } = await UserService.findById(id);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar usuário por ID",
        error: error.message,
      });
    }
  }

  // Atualiza dados do usuário pelo ID
  static async updateUser(req, res) {
    try {
      const id = Number(req.params.id);
      const data = req.body;

      const result = await UserService.updateUser(id, data);

      return res.status(200).json(result);
    } catch (error) {
      const status = error.status || 500;

      return res.status(status).json({
        message: error.message || "Erro ao atualizar usuário",
      });
    }
  }

  // Remove um usuário por ID
  static async deleteById(req, res) {
    try {
      const id = req.params.id;
      const result = await UserService.deleteById(id);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || "Erro ao remover usuário",
        error: error.message,
      });
    }
  }

  static async getPets(req, res) {
    try {
      const { pets } = await PetService.getPets();

      return res.status(200).json(pets);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar animal",
        error: error.message,
      });
    }
  }

  // Busca pet por ID
  static async findPetById(req, res) {
    try {
      const id = req.params.id;
      const { pet } = await PetService.findById(id);

      return res.status(200).json(pet);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar animal por ID",
        error: error.message,
      });
    }
  }

  // Cadastra um novo pet
  static async registerPet(req, res) {
    try {
      const result = await PetService.registerPet(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(409).json({ message: error.message });
    }
  }
}

module.exports = ProtectedController;
