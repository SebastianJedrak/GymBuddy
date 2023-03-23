import { options } from "./config.js";
import { API_URL } from "./config.js";
import { randomize } from "./helpers.js";
import { activeUser } from "./controller.js";

export class User {
  constructor(
    login,
    password,
    height,
    weight,
    gender,
    experience,
    lastSetsArray = [],
    workoutsHistory = []
  ) {
    this.login = login;
    this.password = password;
    this.height = height;
    this.weight = weight;
    this.gender = gender;
    this.experience = experience;
    this.lastSetsArray = lastSetsArray;
    this.workoutsHistory = workoutsHistory;
    this.BMI = (weight / (height / 100) ** 2).toFixed(2);
  }
}

//TEST ACCOUNTS

export const bobby = new User(
  "bobby",
  "1111",
  "180",
  "90",
  "man",
  "intermediate",
  [
    ["Barbell front squat", 34],
    ["Barbell front squat", 34],
    ["Barbell Full Squat", 34],
    ["Incline dumbbell bench press", 34],
    ["Muscle Up", 12],
    ["Single-leg kettlebell deadlift", 15],
    ["EZ-Bar Skullcrusher", 15],
    ["Standing cable low-to-high twist", 15],
    ["Barbell Squat", 35],
    ["Barbell stiff-legged deadlift", 35],
    ["Exercise ball hip thrust", 35],
    ["Monster Walk", 15],
    ["Landmine twist", 15],
    ["Chest dip", 10],
    ["Straight-arm rope pull-down", 34],
    ["Reverse Grip Triceps Pushdown", 15],
    ["Dumbbell Bicep Curl", 15],
    ["Spider crawl", 12],
    ["Forward lunge", 10],
    ["Pushups", 10],
    ["Shotgun row", 34],
    ["Power clean", 15],
    ["Triceps Pushdown - Rope Attachment", 15],
    ["Suspended ab fall-out", 12],
    ["Overhead cable curl", 15],
    ["Barbell walking lunge", 34],
    ["Stiff-Legged Dumbbell Deadlift", 34],
    ["Walking High Knee", 10],
    ["Cross-over jack", 12],
    ["Cocoons", 12],
    ["Pushups", 15],
    ["Straight-arm rope pull-down", 42],
    ["Kneeling cable triceps extension", 15],
    ["EZ-bar spider curl", 15],
    ["Suspended ab fall-out", 16],
    ["Single-Leg Press", 35],
    ["Kettlebell One-Legged Deadlift", 35],
    ["Walking Butt Kicks", 12],
    ["Cross-over jack", 15],
    ["Elbow plank", 15],
    ["Barbell Full Squat", 42],
    ["Decline Dumbbell Flyes", 34],
    ["Rope climb", 10],
    ["Stiff-Legged Dumbbell Deadlift", 38],
    ["Decline EZ-bar skullcrusher", 15],
    ["Dumbbell V-Sit Cross Jab", 15],
    ["Barbell walking lunge", 38],
    ["Barbell Bench Press - Medium Grip", 35],
    ["Rope climb", 14],
    ["Stiff-Legged Dumbbell Deadlift", 40],
    ["Kneeling cable triceps extension", 21],
    ["Spider crawl", 15],
  ],
  [
    {
      bodyPart: "full",
      type: "balanced",
      duration: "medium",
      date: "18-03-2023",
      index: 0,
    },
    {
      bodyPart: "full",
      type: "balanced",
      duration: "medium",
      date: "19-03-2023",
      index: 2,
    },
    {
      bodyPart: "lower",
      type: "endurance",
      duration: "short",
      date: "19-03-2023",
      index: 3,
    },
    {
      bodyPart: "upper",
      type: "strength",
      duration: "short",
      date: "19-03-2023",
      index: 4,
    },
    {
      bodyPart: "full",
      type: "strength",
      duration: "long",
      date: "19-03-2023",
      index: 5,
    },
    {
      bodyPart: "lower",
      type: "strength",
      duration: "short",
      date: "19-03-2023",
      index: 6,
    },
    {
      bodyPart: "upper",
      type: "strength",
      duration: "short",
      date: "19-03-2023",
      index: 7,
    },
    {
      bodyPart: "lower",
      type: "endurance",
      duration: "short",
      date: "19-03-2023",
      index: 8,
    },
    {
      bodyPart: "full",
      type: "strength",
      duration: "medium",
      date: "19-03-2023",
      index: 9,
    },
    {
      bodyPart: "full",
      type: "endurance",
      duration: "medium",
      date: "19-03-2023",
      index: 10,
    },
  ]
);
const lila = new User("lila", "2222", "150", "50", "woman", "beginner");

export let usersList = [bobby, lila];

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
  date: "",
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
    if (fetchJson.status === 502) getMuscle(muscle);
    if (!fetchJson.ok)
      throw new Error(`${fetchJson.status}: Something goes wrong`);
    const data = await fetchJson.json();
    return data[randomize(data.length)];
  } catch (error) {
    // ERROR HANDLING
    const errorReject = error.message;
    console.log(errorReject);
    return errorReject;
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
      await pushExercise(muscles.chest, "compound");
      await pushExercise(muscles.lats, "compound");
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
      // await pushExercise(muscles.biceps, "accessory");
      // await pushExercise(muscles.abdominals, "accessory");
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
      // await pushExercise(muscles.abductors, "accessory");
      // await pushExercise(muscles.abdominals, "accessory");
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

//! LOCAL STORAGE
export function storageSaveData() {
  localStorage.setItem("usersList", JSON.stringify(usersList));
  sessionStorage.setItem("activeUser", JSON.stringify(activeUser));
}

export function storageGetData() {
  const dataStorage = JSON.parse(localStorage.getItem(`usersList`));
  if (!dataStorage) return;
  usersList = dataStorage;
}

export function sessionGetData() {
  const sessionDataStorage = JSON.parse(sessionStorage.getItem(`activeUser`));
  if (!sessionDataStorage) return;
  return sessionDataStorage;
}
