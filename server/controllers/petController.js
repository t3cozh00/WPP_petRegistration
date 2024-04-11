const {
  createPetRegistration,
  findPetData,
} = require("../services/petService");

const onPetRegistrationCreate = async (req, res) => {
  //console.log(req.body);
  //console.log(req.files);
  let file_name = "";
  try {
    if (req.files) {
      const file = req.files.image;
      file_name = file.name;
      const uploadPath = `./public/images/${file_name}`;
      file.mv(uploadPath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    const {
      id_pet_category,
      id_user,
      breed,
      colour,
      weight,
      age,
      vaccination,
      vaccination_date,
      vaccination_hospital_name,
      description,
      is_active,
      is_adopted,
      id_pet,
      //file_name,
    } = req.body;
    //save pet registration data
    const result = await createPetRegistration({
      id_pet_category,
      id_user,
      breed,
      colour,
      weight,
      age,
      vaccination,
      vaccination_date,
      vaccination_hospital_name,
      description,
      is_active,
      is_adopted,
      file_name,
      id_pet,
    });
    // Check if both pet and pet image information were successfully created
    if (result.pet && result.petImage) {
      res.status(200).send(result);
    } else {
      res.status(400).send("Failed to create pet registration.");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const onGetPetData = async (req, res) => {
  try {
    //get details of all the pet data
    const result = await findPetData();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
  return;
};

module.exports = { onPetRegistrationCreate, onGetPetData };
