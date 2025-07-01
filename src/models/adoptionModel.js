const db = require("../config/database");

class AdoptionModel {
  // Lista todas as adoções realizadas
  static async getAdoptions() {
    const [rows] = await db.query("SELECT * FROM adoptions");

    return rows;
  }

  // Realiza a adoção de um pet.
  static async create(adoption) {
    const { user_id, pet_id } = adoption;
    const today = new Date().toISOString().slice(0, 10);
    const [result] = await db.query("INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES (?, ?, ?)", [
      user_id,
      pet_id,
      today,
    ]);

    return result.insertId;
  }
}

module.exports = AdoptionModel;
