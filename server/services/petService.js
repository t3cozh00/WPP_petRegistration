const { queryDb } = require("../repository/queryDatabase");

//Create pet registration data in the pet table
const createPetRegistration = async (formData) => {
  try {
    const dbResult = await queryDb(
      'insert into "pet01" (id_pet_category, breed, colour, weight, age, vaccination, vaccination_date, vaccination_hospital_name, description,last_edit_date, post_expire_date, is_active, is_adopted, image_name) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning *',
      [
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
        formData.is_active,
        formData.is_adopted,
        formData.file_name,
      ]
    );
    console.log(formData.image_name);
    const resultRows = dbResult.rows ? dbResult.rows : [];
    return resultRows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

//Delete pet record from pet table
const deletePetData = async (id) => {
  try {
    const dbResult = await queryDb(
      "delete from pet01 where id_pet=$1 returning *",
      [id]
    );
    const resultRows = dbResult.rows ? dbResult.rows : [];
    return !resultRows ? {} : resultRows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

//Find pet data from pet table
const findPetData = async () => {
  try {
    const dbResult = await queryDb("select * from pet01");
    const resultRows = dbResult.rows ? dbResult.rows : [];
    return !resultRows ? [{}] : resultRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createPetRegistration, deletePetData, findPetData };
