const db = require("../config/database");

class PetModel {
  // Lista todos os pets com status "available" para adoção
  static async getPetsAvailable() {
    const [rows] = await db.query("SELECT * FROM pets WHERE status = 'available'");

    return rows;
  }

  // Lista todos os pets (inclusive os adotados)
  static async getPets() {
    const [rows] = await db.query("SELECT * FROM pets");

    return rows;
  }

  // Busca pet por ID
  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM pets WHERE id = ?", [id]);

    return rows[0];
  }

  // Cadastra um novo pet
  static async create(pet) {
    const { name, age, species, size, status, description } = pet;
    const [result] = await db.query(
      "INSERT INTO pets (name, age, species, size, status, description) VALUES (?, ?, ?, ?, ?, ?)",
      [name, age, species, size, status, description]
    );

    return result.insertId;
  }

  // Atualiza os dados de um pet
  static async updatePets(id, data) {
    const { name, age, species, size, status, description } = data;
    const [result] = await db.query(
      "UPDATE pets SET name = ?, age = ?, species = ?, size = ?, status = ?, description = ? WHERE id = ?",
      [name, age, species, size, status, description, id]
    );

    return result.affectedRows;
  }

  // Remove um pet do sistema (somente se status = available)
  static async deleteById(id) {
    const [result] = await db.query("DELETE FROM pets WHERE id = ?", [id]);

    return result.affectedRows;
  }
}

module.exports = PetModel;
