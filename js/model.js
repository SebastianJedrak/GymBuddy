import { options } from "./config.js";
import { API_URL } from "./config.js";
import { randomize } from "./helpers.js";

export class User {
  constructor(login, password, height, weight, gender) {
    this.login = login;
    this.password = password;
    this.height = height;
    this.weight = weight;
    this.gender = gender;
    this.BMI = (weight / (height / 100) ** 2).toFixed(2);
  }
}

const andrew = new User("andrew", "1111", "180", "80", "man");

const activeUser = andrew;

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

async function getMuscle(muscle) {
  const url = `${API_URL}=${muscle}`;
  try {
    const fetchJson = await fetch(url, options);
    const data = await fetchJson.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

function generateExercises() {
  if (activeUser.gender === "man") {
    if (workoutParameters.bodyPart === "full") {
    }
    if (workoutParameters.bodyPart === "upper") {
    }
    if (workoutParameters.bodyPart === "lower") {
    }
  }
  if (activeUser.gender === "woman") {
    if (workoutParameters.bodyPart === "full") {
    }
    if (workoutParameters.bodyPart === "upper") {
    }
    if (workoutParameters.bodyPart === "lower") {
    }
  }
}

console.log(randomize(3));

getMuscle(muscles.chest);

const workout = {
  exercises: [],
  sets: [],
  reps: [],
};
