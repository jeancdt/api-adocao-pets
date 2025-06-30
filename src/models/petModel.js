const db = require("../config/database");

class PetModel {
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
}

module.exports = PetModel;
