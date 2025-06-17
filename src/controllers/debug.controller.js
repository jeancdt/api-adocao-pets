const UserService = require("../services/userService");

class DebugController {
  // Cadastrar novo usuário
  static async main(req, res) {
    console.log("aloooooooo")
    return res.status(201).json('{"hello":"world"}');
  }
}

module.exports = DebugController;
