export class User {
  constructor(login, password, height, weight, gender) {
    this.login = login;
    this.password = password;
    this.height = height;
    this.weight = weight;
    this.gender = gender;
  }
}

export const andrew = new User("andrew", "1111", "180", "80", "man");

export const workoutParameters = {
  bodyPart: "full",
  type: "balanced",
  duration: "medium",
};
