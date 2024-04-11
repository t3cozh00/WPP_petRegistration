class User {
  #id_user = undefined;
  #email_address = undefined;

  constructor() {
    const userFromStorage = sessionStorage.getItem("user");
    if (userFromStorage) {
      const userObject = JSON.parse(userFromStorage);
      this.#id_user = userObject.id_user;
      this.#email_address = userObject.email_address;
    }
  }

  get id() {
    return this.#id_user;
  }

  get email_address() {
    return this.#email_address;
  }

  async login(email_address, password) {
    const data = JSON.stringify({
      email_address: email_address,
      password: password,
    });
    const response = await fetch("http://localhost:5050/api/v1/user-login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    if (response.ok === true) {
      const json = await response.json();
      //console.log(json);
      this.#id_user = json.id_user;
      this.#email_address = json.email_address;
      sessionStorage.setItem("user", JSON.stringify(json));
      return json;
    } else {
      throw response.statusText;
    }
  }
}

export { User };
