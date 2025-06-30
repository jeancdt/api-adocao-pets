const PetModel = require("../models/petModel");

class PetService {
  // Lista todos os pets (inclusive os adotados)
  static async getPets() {
    const pets = await PetModel.getPets();
    if (!pets) {
      const err = new Error("Nenhum animal encontrado!");
      err.status = 404;
      throw err;
    }

    return { pets };
  }

  // Busca pet por ID
  static async findById(id) {
    const pet = await PetModel.findById(id);
    if (!pet) {
      const err = new Error("Nenhum animal encontrado!");
      err.status = 404;
      throw err;
    }

    return { pet };
  }

  // Cadastra um novo pet
  static async registerPet(pet) {
    const id = await PetModel.create(pet);

    return { message: "Animal registrado com sucesso", id };
  }
}

module.exports = PetService;
