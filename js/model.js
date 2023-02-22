import { options } from "./config.js";
import { API_URL } from "./config.js";

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

export const muscles = {
  chest: `pectoralis%20major`,
  trapezius: `trapezius`,
  shoulders: `deltoid`,
  triceps: `triceps`,
  biceps: `biceps`,
  abdominal: `abdominal`,
  oblique: `external oblique`,
  quadriceps: `quadriceps`,
  hamstrings: `hamstrings`,
  gluteus: `gluteus%20maximus`,
};

export function getMuscle(muscle) {
  const url = `${API_URL}=${muscle}`;
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
