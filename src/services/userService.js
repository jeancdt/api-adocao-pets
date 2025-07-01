const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

class UserService {
  // Registrar novo usuário
  static async registerUser(user) {
    const { email, password } = user;
    // Verifica e-mail caso cadastrado
    const existing = await UserModel.findByEmail(email);
    if (existing) {
      throw new Error("Usuário já existe");
    }

    // Criptografar senha
    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;

    // Criar novo usuário
    const id = await UserModel.create(user);

    return { message: "Usuário registrado com sucesso", id };
  }

  // Autenticar usuário e Gerar token JWT
  static async loginUser({ email, password }) {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    // Verificar senha
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Senha inválida");
    }

    // Gerar token JWT
    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return { token };
  }

  // Encontra todos usuários
  static async getUsers() {
    const users = await UserModel.getUsers();
    if (!users) {
      const err = new Error("Nenhum usuário encontrado!");
      err.status = 404;
      throw err;
    }

    return { users };
  }

  // Busca usuário por ID
  static async findById(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      const err = new Error("Nenhum usuário encontrado!");
      err.status = 404;
      throw err;
    }

    return { user };
  }

  // Atualiza dados do usuário pelo ID
  static async updateUser(id, data) {
    const existing = await UserModel.findById(id);
    if (!existing) {
      const err = new Error("Usuário não encontrado");
      err.status = 404;
      throw err;
    }

    const emailExists = await UserModel.findByEmail(data.email);
    if (emailExists) {
      const err = new Error("Email do usuário já cadastrado!");
      err.status = 500;
      throw err;
    }

    if (existing.role == "adopter" && data.role == "admin") {
      const err = new Error("Falha ao trocar função do usuário");
      err.status = 500;
      throw err;
    }

    let password = existing.password;
    if (data.password) {
      password = await bcrypt.hash(data.password, 10);
    }

    const updated = {
      name: data.name ?? existing.name,
      email: data.email ?? existing.email,
      password,
      phone: data.phone ?? existing.phone,
      role: data.role ?? existing.role,
    };

    const affected = await UserModel.updateUser(id, updated);
    if (!affected) {
      const err = new Error("Falha ao atualizar usuário");
      err.status = 500;
      throw err;
    }

    return { message: "Usuário atualizado com sucesso" };
  }

  // Remove um usuário por ID
  static async deleteById(id) {
    const existing = await UserModel.findById(id);
    if (!existing) {
      const err = new Error("Usuário não encontrado");
      err.status = 404;
      throw err;
    }

    const affected = await UserModel.deleteById(id);
    if (!affected) {
      const err = new Error("Falha ao remover usuário");
      err.status = 500;
      throw err;
    }

    return { message: "Usuário removido com sucesso", user: existing };
  }
}

module.exports = UserService;
