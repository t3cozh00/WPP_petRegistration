import { Pets } from "./class/Pets.js";

const user = { id_user: "1", email_address: "aabbcc123@email.com" };
const pets = new Pets();

const submitButton = document.querySelector(".btn-submit");

// Get the user email input automatically
const user_email_input = document.querySelector("#inputUserEmail");
user_email_input.addEventListener("click", function () {
  user_email_input.value = user.email_address;
});
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

// Vaccination area
let vaccinationCheck;
yesCheck.addEventListener("change", function () {
  if (this.checked) {
    vaccinationCheck = true;
    vaccinationDetail.forEach((element) => {
      element.removeAttribute("hidden");
    });
    console.log("Vaccination value:", vaccinationCheck);
    noCheck.checked = false;
  }
});
noCheck.addEventListener("change", function () {
  if (this.checked) {
    vaccinationCheck = false;
    vaccinationDetail.forEach((element) => {
      element.setAttribute("hidden", true);
    });
    console.log("Vaccination value:", vaccinationCheck);
    yesCheck.checked = false;
  }
});

// Information-4 select and upload picture area
const selectImage = document.querySelector(".btn-select-image");
const inputFile = document.querySelector("#fileMultiple");

// Select images area
selectImage.addEventListener("click", function () {
  inputFile.click();
});

// Upload images area
inputFile.addEventListener("change", function () {
  const image = this.files[0];
  // Check image size
  if (image.size < 400000) {
    const reader = new FileReader();
    reader.onload = () => {
      const imgUrl = reader.result;
      const imgArea = document.querySelector(".right-section .img-display");
      imgArea.src = imgUrl;
    };
    reader.readAsDataURL(image);
  } else {
    alert("Image size more than 400KB");
  }
});

// Add submit button click event
submitButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const id_pet_category = window.petCategoryId;
  const breed_text = breed_input.value;
  const colour_text = colour_input.value.trim();
  const weight_text = weight_input.value.trim();
  const description_text = description_input.value;
  const ageDate = new Date(age_input.value);
  const ageYear = ageDate.getFullYear();
  const ageMonth = ageDate.toLocaleString("default", { month: "long" });

  if (inputFile.files.length > 0) {
    console.log("File added:", inputFile.files[0]);
  } else {
    console.log("Null");
  }

  let hospitalName;
  let vaccinationFormattedDate;
  // Check if vaccination is checked
  if (vaccinationCheck) {
    const vaccinationDate = new Date(vaccinationDate_input.value);
    if (!isNaN(vaccinationDate.getTime())) {
      // Check if a valid date
      const year = vaccinationDate.getFullYear();
      const month = String(vaccinationDate.getMonth() + 1).padStart(2, "0"); // Month starts from 0
      const day = String(vaccinationDate.getDate()).padStart(2, "0");
      vaccinationFormattedDate = `${year}-${month}-${day}`;
    } else {
      // If vaccination date is not valid, set to null or handle accordingly
      vaccinationFormattedDate = null;
    }
    hospitalName = vaccination_hospital_name_input.value;
  } else {
    vaccinationFormattedDate = null;
    hospitalName = null;
  }

  // Structure the petData
  const formData = new FormData();
  formData.append("id_user", user.id_user);
  formData.append("id_pet_category", id_pet_category);
  formData.append("breed", breed_text);
  formData.append("colour", colour_text);
  formData.append("weight", weight_text);
  formData.append("ageyear", ageYear);
  formData.append("agemonth", ageMonth);
  formData.append("vaccination", vaccinationCheck);
  if (vaccinationFormattedDate !== null) {
    formData.append("vaccination_date", vaccinationFormattedDate);
    formData.append("vaccination_hospital_name", hospitalName);
  }
  formData.append("description", description_text);
  formData.append("image", inputFile.files ? inputFile.files[0] : null);

  try {
    await pets.registratePet(formData);
  } catch (error) {
    console.error("Failed to register pet:", error);
  }
});
