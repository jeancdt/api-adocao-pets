const AdoptionModel = require("../models/adoptionModel");
const PetModel = require("../models/petModel");
const UserModel = require("../models/userModel");

class AdoptionService {
  // Lista todas as adoções realizadas
  static async getAdoptions() {
    const adoptions = await AdoptionModel.getAdoptions();
    if (!adoptions) {
      const err = new Error("Nenhuma adoção encontrado!");
      err.status = 404;
      throw err;
    }

    return { adoptions };
  }

  // Realiza a adoção de um pet.
  static async registerAdoption(adoptions) {
    const pet = await PetModel.findById(adoptions.pet_id);
    if (!pet) {
      const err = new Error("Nenhum animal encontrado!");
      err.status = 404;
      throw err;
    } else if (pet.status == "adopted") {
      const err = new Error("O animal já foi adotado!");
      err.status = 404;
      throw err;
    }

    const user = await UserModel.findById(adoptions.user_id);
    if (!user) {
      const err = new Error("Nenhum usuário encontrado!");
      err.status = 404;
      throw err;
    } else if (!user.role == "adopter") {
      const err = new Error("Usuário não é adopter!");
      err.status = 404;
      throw err;
    }

    await PetModel.updateAdoptedPets(adoptions.pet_id);

    const id = await AdoptionModel.create(adoptions);

    return { message: "Animal registrado com sucesso", id };
  }
}

module.exports = AdoptionService;
