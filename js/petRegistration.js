import { Pets } from "./class/Pets.js";
import { Pet } from "./class/pet.js";
import { User } from "./class/User.js";

const user = new User();
const pets = new Pets("http://localhost:5050/api/v1");

console.log(user.id);
console.log(user.email_address);

const submitButton = document.querySelector(".btn-submit");

// read the input fields
const user_email_input = document.querySelector("#inputUserEmail");
user_email_input.addEventListener("click", function () {
  user_email_input.value = user.email_address;
});
const pet_category_input = document.querySelector("#inputPetCategory");
const breed_input = document.querySelector("#inputBreed");
const colour_input = document.querySelector("#inputColour");
const weight_input = document.querySelector("#inputWeight");
const description_input = document.querySelector("#inputDescription");
const age_input = document.querySelector("#inputAge");
const yesCheck = document.getElementById("yesCheck");
const noCheck = document.getElementById("noCheck");
const vaccinationDetail = document.querySelectorAll(".vaccinationInfo");
const vaccinationDate_input = document.querySelector("#inputVaccinationDate");
const vaccination_hospital_name_input =
  document.querySelector("#inputHospitalName");

// vaccination area
let vaccinationCheck;
yesCheck.addEventListener("change", function () {
  if (this.checked) {
    vaccinationCheck = "Yes";
    vaccinationDetail.forEach((element) => {
      element.removeAttribute("hidden");
    });
    console.log("Vaccination value:", vaccinationCheck);
    noCheck.checked = false;
  }
});
noCheck.addEventListener("change", function () {
  if (this.checked) {
    vaccinationCheck = "No";
    vaccinationDetail.forEach((element) => {
      element.setAttribute("hidden", true);
    });
    console.log("Vaccination value:", vaccinationCheck);
    yesCheck.checked = false;
  }
});

// information4 select and upload picture area
const selectImage = document.querySelector(".btn-select-image");
const inputFile = document.querySelector("#fileMultiple");
const imgArea = document.querySelector(".right-section .img-display");
imgArea.src = "http://localhost:5050/images/bird_01.jpg";
// select images area
selectImage.addEventListener("click", function () {
  inputFile.click();
});

// inputFile.onchange = (event) => {
//   inputImg = ;
// };

// upload images area

// add submit button click event
submitButton.addEventListener("click", async (event) => {
  event.preventDefault();

  if (inputFile.files.length > 0) {
    console.log("File added:", inputFile.files[0]);
  } else {
    console.log("Null");
  }

  //const user_email = user.email_address;
  const id_pet_category = pet_category_input.value;
  const breed_text = breed_input.value;
  const colour_text = colour_input.value.trim();
  const weight_text = weight_input.value.trim();
  const description_text = description_input.value;
  // get formattedDate and formattedPostExpireDate
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();
  const postExpireDate = new Date(currentDate);
  postExpireDate.setMonth(postExpireDate.getMonth() + 2);
  const formattedPostExpireDate = postExpireDate.toLocaleString();

  // Get selected date from age input
  const selectedDate = new Date(age_input.value);
  const pet = new Pet(
    null,
    id_pet_category,
    breed_text,
    colour_text,
    weight_text,
    description_text,
    selectedDate
  );
  const pet_age = pet.getAge();

  let vaccinationFormattedDate;
  let hospitalName;
  // Check if vaccination is checked
  if (vaccinationCheck === "Yes") {
    const vaccinationDate = new Date(vaccinationDate_input.value);
    (vaccinationFormattedDate = vaccinationDate
      ? vaccinationDate.toLocaleDateString()
      : null),
      (hospitalName = vaccination_hospital_name_input.value);
  } else {
    vaccinationFormattedDate = null;
    hospitalName = null;
  }

  // structure the petData
  const formData = new FormData();

  formData.append("id_pet_category", id_pet_category);
  formData.append("breed", breed_text);
  formData.append("colour", colour_text);
  formData.append("weight", weight_text);
  formData.append("age", pet_age);
  formData.append("vaccination", vaccinationCheck);
  formData.append("vaccination_date", vaccinationFormattedDate);
  formData.append("vaccination_hospital_name", hospitalName);
  formData.append("description", description_text);
  formData.append("last_edit_date", formattedDate);
  formData.append("post_expire_date", formattedPostExpireDate);
  formData.append("image", inputFile.files ? inputFile.files[0] : null);
  formData.append("id_user", user.id);

  try {
    await pets.registratePet(formData);
    // Redirect to a new page
    //window.location.href = "successSubmit.html";
  } catch (error) {
    console.error("Failed to register pet:", error);
  }
});

// last edit area >>> successSubmit.html
