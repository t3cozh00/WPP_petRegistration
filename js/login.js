import { User } from "./class/User.js";

const user = new User();
const email_address_input = document.querySelector("#user-email");
const password_input = document.querySelector("#password");
const submit_button = document.querySelector("#login-button");

submit_button.addEventListener("click", (event) => {
  event.preventDefault();
  const email_address = email_address_input.value;
  const password = password_input.value;

  user
    .login(email_address, password)
    .then((user) => {
      console.log(user);
      window.location.href = "template_petRegistration.html";
    })
    .catch((error) => {
      alert(error);
    });
});
