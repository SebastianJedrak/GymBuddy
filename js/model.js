// import { workoutParameters } from "./controller.js";

class User {
  constructor(login, password, height, weight, gender) {
    this.login = login;
    this.password = password;
    this.height = height;
    this.weight = weight;
    this.gender = gender;
  }
}

export const andrew = new User("andrew", "1111", "180", "80", "man");

// console.log(workoutParameters);
