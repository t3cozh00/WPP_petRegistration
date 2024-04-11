import { Pet } from "./pet.js";
// import { response } from "express";

class Pets {
  #pets = [];
  #backend_url = "";

  constructor(url) {
    this.#backend_url = url;
  }

  registratePet = (formData) => {
    //console.log(formData);
    // for (const value of formData.values()) {
    //   console.log(value);
    // }
    return new Promise(async (resolve, reject) => {
      //const json = JSON.stringify(formData);
      fetch(this.#backend_url + "/pet-registration", {
        method: "post",
        //headers: { "Content-Type": "application/form-data" },
        body: formData,
      })
        .then((response) => response.json())
        .then((json) => {
          resolve(
            this.#addToPetArray(
              json.id_pet,
              formData.id_pet_category,
              formData.breed,
              formData.colour,
              formData.weight,
              formData.age,
              formData.vaccination,
              formData.vaccination_date,
              formData.vaccination_hospital_name,
              formData.description,
              formData.last_edit_date,
              formData.post_expire_date,
              formData.email_address
            )
          );
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  #addToPetArray = (formData) => {
    const {
      id_pet,
      id_pet_category,
      breed,
      colour,
      weight,
      age,
      vaccination,
      vaccination_date,
      vaccination_hospital_name,
      description,
      last_edit_date,
      post_expire_date,
      email_address,
    } = formData;
    const pet = new Pet(
      id_pet,
      id_pet_category,
      breed,
      colour,
      weight,
      age,
      vaccination,
      vaccination_date,
      vaccination_hospital_name,
      description,
      last_edit_date,
      post_expire_date,
      email_address
    );
    this.#pets.push(pet);
    return pet;
  };
}

export { Pets };
