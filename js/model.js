import { options } from "./config.js";
import { API_URL } from "./config.js";
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

const andrew = new User("andrew", "1111", "180", "90", "man", "intermediate");

export const activeUser = andrew;

export const workout = {
  exercises: [],
  sets: [],
  reps: [],
  weight: [],
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
async function pushExercise(muscle, type) {
  // PUSH EXERCISE
  workout.exercises.push(await getMuscle(muscle));

  // PUSH SETS AND REPS
  if (type === "compound") {
    if (
      workout.exercises.at(-1).equipment === "body_only" ||
      workout.exercises.at(-1).equipment === "other"
    ) {
      workout.weight.push("-");
    } else {
      workout.weight.push(20);
    }
    switch (workoutParameters.type) {
      case "balanced":
        getSetsReps(randomize(2) + 1 === 2 ? "medium" : "low");
        break;
      case "strength":
        getSetsReps("low");
        break;
      case "endurance":
        getSetsReps("medium");
        break;
    }
  }
  if (type === "accessory") {
    if (
      workout.exercises.at(-1).equipment === "body_only" ||
      workout.exercises.at(-1).equipment === "other"
    ) {
      workout.weight.push("-");
    } else {
      workout.weight.push(4);
    }
    switch (workoutParameters.type) {
      case "balanced":
        getSetsReps(randomize(2) + 1 === 2 ? "medium" : "high");
        break;
      case "strength":
        getSetsReps("medium");
        break;
      case "endurance":
        getSetsReps("high");
        break;
    }
  }
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

// EXERCISES GENERATOR

export async function generateExercises() {
  workout.exercises = [];
  workout.reps = [];
  workout.sets = [];
  workout.weight = [];
  if (workoutParameters.bodyPart === "full") {
    {
      await pushExercise(muscles.quadriceps, "compound");
      // await pushExercise(muscles.chest, "compound");
      // await pushExercise(muscles.lats, "compound");
      // await pushExercise(muscles.hamstrings, "accessory");
      // await pushExercise(muscles.triceps, "accessory");
    }
    if (
      workoutParameters.duration === "medium" ||
      workoutParameters.duration === "long"
    ) {
      await pushExercise(muscles.abdominals, "accessory");
    }
    if (workoutParameters.duration === "long") {
      await pushExercise(muscles.biceps, "accessory");
    }
  }
  if (workoutParameters.bodyPart === "upper") {
    {
      await pushExercise(muscles.chest, "compound");
      await pushExercise(muscles.lats, "compound");
      await pushExercise(muscles.triceps, "accessory");
      await pushExercise(muscles.biceps, "accessory");
      await pushExercise(muscles.abdominals, "accessory");
    }
    if (
      workoutParameters.duration === "medium" ||
      workoutParameters.duration === "long"
    ) {
      await pushExercise(muscles.chest, "compound");
    }
    if (workoutParameters.duration === "long") {
      await pushExercise(muscles.middleBack, "accessory");
    }
  }
  if (workoutParameters.bodyPart === "lower") {
    {
      await pushExercise(muscles.quadriceps, "compound");
      await pushExercise(muscles.hamstrings, "compound");
      await pushExercise(muscles.glutes, "compound");
      await pushExercise(muscles.abductors, "accessory");
      await pushExercise(muscles.abdominals, "accessory");
    }
    if (
      workoutParameters.duration === "medium" ||
      workoutParameters.duration === "long"
    ) {
      await pushExercise(muscles.calves, "accessory");
    }
    if (workoutParameters.duration === "long") {
      await pushExercise(muscles.adductors, "accessory");
    }
  }
}
