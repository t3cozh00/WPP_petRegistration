const { queryDb } = require("../repository/queryDatabase");

const currentDate = new Date();
const twoMonthsLater = new Date(currentDate);
twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);

//Create pet registration data in the pet table
const createPetRegistration = async (data) => {
  try {
    // insert pet information into table pet01
    const petResult = await queryDb(
      'insert into "pet" (id_user, id_pet_category, breed, colour, weight, ageyear, agemonth, vaccination, vaccination_date, vaccination_hospital_name, description, publishing_date, post_expiry_date, is_active, is_adopted) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning *',
      [
        data.id_user,
        data.id_pet_category,
        data.breed,
        data.colour,
        data.weight,
        data.ageyear,
        data.agemonth,
        data.vaccination,
        data.vaccination_date,
        data.vaccination_hospital_name,
        data.description,
        currentDate, // publishing_date
        twoMonthsLater,
        true,
        false, //set these two columns default value
      ]
    );

    // insert pet image into table pet_image
    const petImageResult = await queryDb(
      'insert into "pet_image" (id_pet, image_name) values($1, $2) returning *',
      [petResult.rows[0].id_pet, data.file_name]
    );

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
      'select pet_image.id_pet_image, "user".id_user, pet.id_pet from pet inner join pet_image on pet.id_pet = pet_image.id_pet inner join "user" on pet.id_user = "user".id_user'
    );
    const resultRows = dbResult.rows ? dbResult.rows : [];
    return !resultRows ? [{}] : resultRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createPetRegistration, findPetData };
