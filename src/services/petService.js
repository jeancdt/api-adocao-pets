const PetModel = require("../models/petModel");

class PetService {
  // Lista todos os pets somente os available
  static async getPetsAvailable() {
    const pets = await PetModel.getPetsAvailable();
    if (!pets) {
      const err = new Error("Nenhum animal disponível encontrado!");
      err.status = 404;
      throw err;
    }

    return { pets };
  }

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

  // Atualiza os dados de um pet
  static async updatePets(id, data) {
    const existing = await PetModel.findById(id);
    if (!existing) {
      const err = new Error("Animal não encontrado");
      err.status = 404;
      throw err;
    }

    if (!existing.status == "adopted") {
      const err = new Error("Animal já adotado!");
      err.status = 500;
      throw err;
    }

    const updated = {
      name: data.name ?? existing.name,
      age: data.age ?? existing.age,
      species: data.species ?? existing.species,
      size: data.size ?? existing.size,
      status: data.status ?? existing.status,
      description: data.description ?? existing.description,
    };

    const affected = await PetModel.updatePets(id, updated);
    if (!affected) {
      const err = new Error("Falha ao atualizar animal");
      err.status = 500;
      throw err;
    }

    return { message: "Animal atualizado com sucesso" };
  }

  // Remove um pet do sistema (somente se status = available)
  static async deleteById(id) {
    const existing = await PetModel.findById(id);
    if (!existing) {
      const err = new Error("Animal não encontrado");
      err.status = 404;
      throw err;
    }

    if (existing.status == "adopted") {
      const err = new Error("Falha ao remover animal. Animal já adotado!");
      err.status = 500;
      throw err;
    }

    const affected = await PetModel.deleteById(id);
    if (!affected) {
      const err = new Error("Falha ao remover animal");
      err.status = 500;
      throw err;
    }

    return { message: "Animal removido com sucesso", pet: existing };
  }

  // Atualiza os dados de um pet ao ser adotado
  static async updateAdoptedPets(id) {
    const affected = await PetModel.updateAdoptedPets(id);
    if (!affected) {
      const err = new Error("Falha ao atualizar animal para adotado");
      err.status = 500;
      throw err;
    }

    return { message: "Animal atualizado para adotado com sucesso" };
  }
}

module.exports = PetService;
