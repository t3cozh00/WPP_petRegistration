const {
  createPetRegistration,
  findPetData,
} = require("../services/petService");

const onPetRegistrationCreate = async (req, res) => {
  //console.log(req.body);
  //console.log(req.files);
  // get pet data

  let file_name = "";
  try {
    if (req.files && req.files.image) {
      const file = req.files.image;

      // Wait for the database write operation to complete before fetching pet data
      const petData = await new Promise((resolve, reject) => {
        findPetData().then(resolve).catch(reject);
      });
      console.log(petData);

      const lastPetData = petData[petData.length - 1];
      // Construct file name using id_pet_image, id_user, and id_pet
      file_name = `${lastPetData.id_pet_image}_${lastPetData.id_user}_${lastPetData.id_pet}.jpg`;
      //file_name = file.name;
      console.log(file_name);
      const uploadPath = `./public/images/${file_name}`;
      file.mv(uploadPath, (err) => {
        if (err) {
          console.log(err);
        }
      });
<<<<<<< HEAD

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
        last_edit_date,
        post_expire_date,
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
        last_edit_date,
        post_expire_date,
        file_name,
        id_pet,
      });

      // Check if both pet and pet image information were successfully created
      if (result.pet && result.petImage) {
        res.status(200).send(result);
      } else {
        res.status(400).send("Failed to create pet registration.");
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

=======
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

>>>>>>> 5140d737f7c6083756b1f42894339d3f0620c3c1
const onGetPetData = async (req, res) => {
  //let file_name = "";
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
