const db = require("../config/database");

class UserModel {
  // Busca usuário por email
  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    return rows[0];
  }

  // Registra novo usuário
  static async create(user) {
    const { name, email, password, role, phone } = user;
    const [result] = await db.query("INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)", [
      name,
      email,
      password,
      role,
      phone,
    ]);

    return result.insertId;
  }

  // Encontra todos usuários
  static async getUsers() {
    const [rows] = await db.query("SELECT * FROM users");

    return rows;
  }

  // Busca usuário por ID
  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

    return rows[0];
  }

  // Atualiza dados do usuário pelo ID
  static async updateUser(id, data) {
    const { name, email, password, role, phone } = data;
    const [result] = await db.query(
      "UPDATE users SET name = ?, email = ?, password = ?, phone = ?, role = ? WHERE id = ?",
      [name, email, password, role, phone, id]
    );

    return result.affectedRows;
  }

  // Remove um usuário por ID
  static async deleteById(id) {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);

    return result.affectedRows;
  }
}

module.exports = UserModel;
