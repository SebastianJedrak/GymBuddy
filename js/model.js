import { options } from "./config.js";
import { API_URL } from "./config.js";
import { randomize } from "./helpers.js";
import { activeUser } from "./controller.js";

export class User {
  constructor(login, password, height, weight, gender, experience) {
    this.login = login;
    this.password = password;
    this.height = height;
    this.weight = weight;
    this.gender = gender;
    this.experience = experience;
    this.BMI = (weight / (height / 100) ** 2).toFixed(2);
    this.lastSetsArray = [];
  }
}

export const bobby = new User(
  "bobby",
  "1111",
  "180",
  "90",
  "man",
  "intermediate"
);
const lila = new User("lila", "2222", "150", "50", "woman", "beginner");

export const usersList = [bobby, lila];

export const workout = {
  exercises: [],
  sets: [],
  reps: [],
  weight: [],
};

export function exerciseRp(index) {
  //Estimated One Rep Max formula:
  // reps * 2.5 = x ; 100 - x = y ; y / 100 = z ; 1RM = weight / z
  // strength = 0.8 RP ; balanced = 0.6 RP ; endurance = 0.4 RP
  const x = workout.reps[index] * 2.5;
  const y = 100 - x;
  const z = y / 100;
  const oneRM = workout.weight[index] / z;
  return Math.trunc(oneRM);
}

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

function checkRp(name) {
  let isTrue = false;
  activeUser.lastSetsArray.forEach((element) => {
    if (element[0] === name) {
      isTrue = true;
    }
  });
  return isTrue;
}

function getRp(name, multiplier, bodyOnly) {
  let weight;
  activeUser.lastSetsArray.forEach((element) => {
    if (element[0] === name) {
      weight = element[1] * multiplier;
    }
  });
  if (bodyOnly) workout.reps.push(weight);
  if (!bodyOnly) workout.weight.push(Math.trunc(weight));
}

function getMultiplier(reps) {
  if (reps === 12) return 0.6;
  if (reps === 8) return 0.7;
  if (reps === 5) return 0.8;
}

// PUSH TO WORKOUT ARRAY
async function pushExercise(muscle, type) {
  // PUSH EXERCISE
  workout.exercises.push(await getMuscle(muscle));

  // PUSH SETS AND REPS
  if (type === "compound") {
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
    if (
      workout.exercises.at(-1).equipment === "body_only" ||
      workout.exercises.at(-1).equipment === "other"
    ) {
      workout.weight.push("-");
    } else {
      // Add weight calculated from previous workouts
      if (checkRp(workout.exercises.at(-1).name)) {
        getRp(
          workout.exercises.at(-1).name,
          getMultiplier(workout.reps.at(-1))
        );
      }
      // Add weight if it's first time
      else {
        workout.weight.push(20);
      }
    }
  }
  if (type === "accessory") {
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

    if (
      workout.exercises.at(-1).equipment === "body_only" ||
      workout.exercises.at(-1).equipment === "other"
    ) {
      workout.weight.push("-");
    } else {
      if (checkRp(workout.exercises.at(-1).name)) {
        getRp(
          workout.exercises.at(-1).name,
          getMultiplier(workout.reps.at(-1))
        );
      }
      // Add weight if it's first time
      else {
        workout.weight.push(4);
      }
    }
  }
}

// SETS AND REPS

function getSetsReps(reps) {
  if (
    (checkRp(workout.exercises.at(-1).name) &&
      workout.exercises.at(-1).equipment === "body_only") ||
    (checkRp(workout.exercises.at(-1).name) &&
      workout.exercises.at(-1).equipment === "other")
  ) {
    getRp(workout.exercises.at(-1).name, 1, true);
    if (reps === "medium") {
      workout.sets.push(4);
    }
    if (reps === "low") {
      workout.sets.push(5);
    }
    if (reps === "high") {
      workout.sets.push(3);
    }
  } else {
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
