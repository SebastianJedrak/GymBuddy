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

export const workout = {
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

// SETS AND REPS

function getSetsReps(reps) {
  if (reps === "medium") {
    workout.sets.push(4);
    workout.reps.push(8);
  }
  if (reps === "low") {
    workout.sets.push(5);
    workout.reps.push(5);
  }
  if (reps === "high") {
    workout.sets.push(3);
    workout.reps.push(12);
  }
}

function compoundExercise() {
  switch (workoutParameters.type) {
    case "balanced":
      getSetsReps(randomize(2) === 2 ? "medium" : "low");
      break;
    case "strength":
      getSetsReps("low");
      break;
    case "endurance":
      getSetsReps("medium");
      break;
  }
}

function accessoryExercise() {
  switch (workoutParameters.type) {
    case "balanced":
      getSetsReps(randomize(2) === 2 ? "medium" : "high");
      break;
    case "strength":
      getSetsReps("medium");
      break;
    case "endurance":
      getSetsReps("high");
      break;
  }
}

// EXERCISES GENERATOR

export async function generateExercises() {
  workout.exercises = [];
  if (workoutParameters.bodyPart === "full") {
    {
      await pushExercise(muscles.quadriceps);
      compoundExercise();
      // await pushExercise(muscles.chest);
      compoundExercise();
      // await pushExercise(muscles.lats);
      compoundExercise();
      // await pushExercise(muscles.hamstrings);
      // await pushExercise(muscles.triceps);
    }
    if (
      workoutParameters.duration === "medium" ||
      workoutParameters.duration === "long"
    ) {
      await pushExercise(muscles.abdominals);
      accessoryExercise();
    }
    if (workoutParameters.duration === "long") {
      await pushExercise(muscles.biceps);
    }
  }
  if (workoutParameters.bodyPart === "upper") {
    {
      await pushExercise(muscles.chest);
      // await pushExercise(muscles.lats);
      // await pushExercise(muscles.triceps);
      // await pushExercise(muscles.biceps);
      // await pushExercise(muscles.abdominals);
    }
    if (
      workoutParameters.duration === "medium" ||
      workoutParameters.duration === "long"
    ) {
      await pushExercise(muscles.chest);
    }
    if (workoutParameters.duration === "long") {
      await pushExercise(muscles.middleBack);
    }
  }
  if (workoutParameters.bodyPart === "lower") {
    {
      await pushExercise(muscles.quadriceps);
      // await pushExercise(muscles.hamstrings);
      // await pushExercise(muscles.glutes);
      // await pushExercise(muscles.abductors);
      // await pushExercise(muscles.abdominals);
    }
    if (
      workoutParameters.duration === "medium" ||
      workoutParameters.duration === "long"
    ) {
      await pushExercise(muscles.calves);
    }
    if (workoutParameters.duration === "long") {
      await pushExercise(muscles.adductors);
    }
  }
}
