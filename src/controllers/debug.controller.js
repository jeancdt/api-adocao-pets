const UserService = require("../services/userService");

class DebugController {
  // Cadastrar novo usuário
  static async main(req, res) {
    return res.status(201).json("Hello world!");
  }
}

module.exports = DebugController;
