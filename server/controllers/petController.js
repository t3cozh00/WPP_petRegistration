const {
  createPetRegistration,
  deletePetData,
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
      is_active,
      is_adopted,
      //file_name,
    } = req.body;
    //save pet registration data
    const result = await createPetRegistration({
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
      is_active,
      is_adopted,
      file_name,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
  return;
};

const onDeletePetData = async (req, res) => {
  const petId = Number(req.params.id);
  //check category id is available as a path param
  if (!petId) {
    return res.status(400).send("Invalid request, pet ID required.");
  }
  try {
    //delete relevant category record
    const result = await deletePetData(petId);
    res.status(result === undefined ? 404 : 200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
  return;
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

module.exports = { onPetRegistrationCreate, onDeletePetData, onGetPetData };
