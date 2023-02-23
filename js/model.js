import { options } from "./config.js";
import { API_URL } from "./config.js";
import { API_URL_markup } from "./config.js";
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

const workout = {
  exercises: [],
  sets: [],
  reps: [],
};

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

async function getMuscle(muscle, number) {
  // const url = `${API_URL}=${muscle}`;
  const url = API_URL_markup;
  try {
    const fetchJson = await fetch(url, options);
    if (!fetchJson.ok)
      throw new Error(`Something goes wrong ${fetchJson.statusText}`);
    const data = await fetchJson.json();
    const exercises = new Set();
    while (exercises.size < number) {
      exercises.add(data[randomize(data.length)]);
    }

    return [...exercises];
  } catch (error) {
    console.error(error);
  }
}

console.log(await getMuscle(0, 5));

function generateExercises() {
  if (activeUser.gender === "man") {
    if (workoutParameters.bodyPart === "full") {
      {
      }
      if (
        workoutParameters.duration === "medium" ||
        workoutParameters.duration === "long"
      ) {
      }
      if (workoutParameters.duration === "long") {
      }
    }
    if (workoutParameters.bodyPart === "upper") {
      {
      }
      if (
        workoutParameters.duration === "medium" ||
        workoutParameters.duration === "long"
      ) {
      }
      if (workoutParameters.duration === "long") {
      }
    }
    if (workoutParameters.bodyPart === "lower") {
      {
      }
      if (
        workoutParameters.duration === "medium" ||
        workoutParameters.duration === "long"
      ) {
      }
      if (workoutParameters.duration === "long") {
      }
    }
  }
  if (activeUser.gender === "woman") {
    if (workoutParameters.bodyPart === "full") {
      {
      }
      if (
        workoutParameters.duration === "medium" ||
        workoutParameters.duration === "long"
      ) {
      }
      if (workoutParameters.duration === "long") {
      }
    }
    if (workoutParameters.bodyPart === "upper") {
      {
      }
      if (
        workoutParameters.duration === "medium" ||
        workoutParameters.duration === "long"
      ) {
      }
      if (workoutParameters.duration === "long") {
      }
    }
    if (workoutParameters.bodyPart === "lower") {
      {
      }
      if (
        workoutParameters.duration === "medium" ||
        workoutParameters.duration === "long"
      ) {
      }
      if (workoutParameters.duration === "long") {
      }
    }
  }
}
