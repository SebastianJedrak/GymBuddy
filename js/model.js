import { options } from "./config.js";
import { API_URL } from "./config.js";
import { API_URL_markup } from "./config.js";
import { randomize } from "./helpers.js";

export class User {
  constructor(login, password, height, weight, gender, experience) {
    this.login = login;
    this.password = password;
    this.height = height;
    this.weight = weight;
    this.gender = gender;
    this.experience = experience;
    this.BMI = (weight / (height / 100) ** 2).toFixed(2);
  }
}

const andrew = new User("andrew", "1111", "180", "80", "man", "intermediate");

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
  abdominals: `abdominals`,
  abductors: "abductors",
  adductors: `adductors`,
  biceps: `biceps`,
  middleBack: `middle_back`,
  lats: "lats",
  calves: `calves`,
  chest: `chest`,
  glutes: `glutes`,
  hamstrings: `hamstrings`,
  triceps: `triceps`,
  quadriceps: `quadriceps`,
};

async function getMuscle(muscle) {
  const url = `${API_URL}${muscle}&difficulty=${activeUser.experience}&type=strength`;
  // const url = API_URL_markup;
  // GET DATA
  try {
    const fetchJson = await fetch(url, options);
    if (!fetchJson.ok) throw new Error(`Something goes wrong`);
    const data = await fetchJson.json();
    return data[randomize(data.length)];
  } catch (error) {
    // ERROR HANDLING
    console.error(error);
  }
}

// PUSH TO WORKOUT ARRAY
async function pushExercise(muscle) {
  workout.exercises.push(await getMuscle(muscle));
}

await pushExercise(`middle_back`);

console.log(workout.exercises);

function generateExercises() {
  if (workoutParameters.bodyPart === "full") {
    {
    }
    if (workoutParameters.duration === "medium") {
    }
    if (workoutParameters.duration === "long") {
    }
  }
  if (workoutParameters.bodyPart === "upper") {
    {
    }
    if (workoutParameters.duration === "medium") {
    }
    if (workoutParameters.duration === "long") {
    }
  }
  if (workoutParameters.bodyPart === "lower") {
    {
    }
    if (workoutParameters.duration === "medium") {
    }
    if (workoutParameters.duration === "long") {
    }
  }
}
