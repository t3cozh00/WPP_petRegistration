class Pet {
  #id_pet;
  #id_pet_category;
  #breed;
  #colour;
  #weight;
  #description;
  #inputDate;

  constructor(
    id_pet,
    id_pet_category,
    breed,
    colour,
    weight,
    description,
    inputDate
  ) {
    this.#id_pet = id_pet;
    this.#id_pet_category = id_pet_category;
    this.#breed = breed;
    this.#colour = colour;
    this.#weight = weight;
    this.#description = description;
    this.#inputDate = inputDate;
  }

  getId() {
    return this.#id_pet;
  }

  getPetCategory() {
    return this.#id_pet_category;
  }

  getBreed() {
    return this.#breed;
  }

  // Function to calculate age based on selected date
  #calculateAge() {
    const currentDate = new Date();
    let yearDifference =
      currentDate.getFullYear() - this.#inputDate.getFullYear();
    let monthDifference = currentDate.getMonth() - this.#inputDate.getMonth();

    if (monthDifference < 0) {
      yearDifference--;
      monthDifference += 12;
    }

    let formattedAge;

    if (yearDifference > 0) {
      formattedAge =
        yearDifference === 1 ? "1 year" : `${yearDifference} years`;
    } else if (yearDifference === 0 && monthDifference > 0) {
      formattedAge =
        monthDifference === 1 ? "1 month" : `${monthDifference} months`;
    } else {
      formattedAge = "Less than 1 month";
    }
    return formattedAge;
  }

  getColour() {
    return this.#colour;
  }

  getWeight() {
    return this.#weight;
  }

  getDescription() {
    return this.#description;
  }

  getAge() {
    return this.#calculateAge();
  }
}

export { Pet };
