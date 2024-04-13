const { queryDb } = require("../repository/queryDatabase");

//Create pet registration data in the pet table
const createPetRegistration = async (data) => {
  try {
    // insert pet information into table pet01
    const petResult = await queryDb(
      'insert into "pet" (id_pet_category, id_user, breed, colour, weight, age, vaccination, vaccination_date, vaccination_hospital_name, description, is_active, is_adopted,last_edit_date, post_expire_date) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning *',
      [
        data.id_pet_category,
        data.id_user,
        data.breed,
        data.colour,
        data.weight,
        data.age,
        data.vaccination,
        data.vaccination_date,
        data.vaccination_hospital_name,
        data.description,
        true,
        false, //set these two columns default value
        data.last_edit_date,
        data.post_expire_date,
      ]
    );
    console.log(petResult.rows[0].id_pet); // 输出 pet 表中插入的数据
    // insert pet image into table pet_image
    const petImageResult = await queryDb(
      'insert into "pet_image" (id_pet, image_name) values($1, $2) returning *',
      [petResult.rows[0].id_pet, data.file_name]
    );
    console.log(petImageResult.rows[0].id_pet_image);

    const result = {
      pet: petResult.rows ? petResult.rows : [],
      petImage: petImageResult.rows ? petImageResult.rows : [],
    };
    return { ...result };
  } catch (error) {
    throw new Error(error.message);
  }
};

//Find pet data from pet table
const findPetData = async () => {
  try {
    const dbResult = await queryDb(
      "select pet_image.id_pet_image, account.id_user,pet.id_pet from pet inner join pet_image on pet.id_pet = pet_image.id_pet inner join account on pet.id_user = account.id_user"
    );
    const resultRows = dbResult.rows ? dbResult.rows : [];
    return !resultRows ? [{}] : resultRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createPetRegistration, findPetData };
