import homeView from "./views/homeView.js";
import userView from "./views/userView.js";
import historyView from "./views/historyView.js";
import workoutView from "./views/workoutView.js";
import navigatorView from "./views/navigatorView.js";
import spinnerView from "./views/spinnerView.js";
import loginView from "./views/loginView.js";
import * as model from "./model.js";

//! RENDER CONTROL

export let activeUser;

function init() {
  // renderHome();
  renderLogin();
}
init();

function renderHome() {
  // Render HTML
  homeView.renderView();
  // Navigation bar init
  navStart();
  document.querySelector(".nav-tile-home").classList.add("active");
  // Start button listener
  homeView.startWorkoutListener(renderWorkout.bind(workoutView));
  // Parameters listeners
  parametersListeners();
  // Tutorial listener
  homeView.openTutorialModalListener();
  // Reset workoutParametersObject
  model.workoutParameters.bodyPart = "full";
  model.workoutParameters.type = "balanced";
  model.workoutParameters.duration = "medium";
}

function renderUser() {
  // Get current user
  userView.getDataToRender(activeUser);
  // Render HTML
  userView.renderView();
  // Render avatar
  userView.avatarGenderSwitch();
  // Render BMI label
  userView.renderLabelBMI();
  // Animate arrow
  userView.animateArrow();
  // Listeners
  userView.openDropdownListener();
  userView.dropdownItemListListener(dropdownItemListHandler);
  userView.logoutButtonListener(renderLogin);
  // Navigation bar
  navStart();
  document.querySelector(".nav-tile-user").classList.add("active");
}

function renderHistory() {
  // Render HTML
  historyView.renderView();
  // Navigation bar
  navStart();
  document.querySelector(".nav-tile-history").classList.add("active");
}

async function renderWorkout() {
  // Loading
  spinnerView.renderView();
  // Generator
  await model.generateExercises();
  // Send workout data to render view
  workoutView.getDataToRender(model.workout, model.workoutParameters);
  // Render View
  renderWorkoutView();
}

function renderWorkoutView() {
  // Render HTML
  workoutView.renderView();
  // Back button
  workoutView.backListener(backHomeHandler);
  // Done button
  workoutView.doneListener(doneHandler);
  // Skip button
  workoutView.skipToListener(skipToHandler);
  // Update progress bar
  workoutView.progressBar();
  // Light and Heavy listeners
  workoutView.heavyListener(heavyHandler);
  workoutView.lightListener(lightHandler);
  // Info Modal window listener
  workoutView.openInfoModalListener();
  // Render equipment img
  workoutView._generateImgEq();
}

function renderLogin() {
  // Reset state
  activeUser = "";
  document
    .querySelectorAll(".input")
    .forEach((input) => input.classList.remove("input-error"));
  //Render login
  loginView.renderView();
  // Login action
  loginView.submitAction(loginAction);
}

function navStart() {
  navigatorView.userListener(renderUser);
  navigatorView.homeListener(renderHome);
  navigatorView.historyListener(renderHistory);
}

//! LISTENERS

// HOME LISTENERS

function parametersListeners() {
  homeView.partParameterListener(parameterListenerHandler);
  homeView.typeParameterListener(parameterListenerHandler);
  homeView.durationParameterListener(parameterListenerHandler);
}

function parameterListenerHandler() {
  // change active button
  [...this.parentElement.children].forEach((e) => {
    e.children[0].classList.remove("btn-orange");
    e.children[0].classList.add("btn-white");
  });
  this.children[0].classList.add("btn-orange");
  // get dataset and set to model.workoutParameters object
  if (this.dataset.part) {
    model.workoutParameters.bodyPart = this.dataset.part;
  }
  if (this.dataset.type) model.workoutParameters.type = this.dataset.type;
  if (this.dataset.duration)
    model.workoutParameters.duration = this.dataset.duration;
}

// WORKOUT HANDLERS

function doneHandler() {
  if (
    workoutView.currentSet < model.workout.sets[workoutView.currentExercise]
  ) {
    workoutView.currentSet += 1;
    workoutView.playSoundNext();
    return renderWorkoutView();
  }
  if (workoutView.currentExercise === model.workout.exercises.length - 1) {
    resetWorkoutView();
    workoutView.insertToLastSetList();
    workoutView.playSoundFinish();
    return workoutView.renderEndModal(renderHome);
  }
  workoutView.currentSet = 1;
  workoutView.currentExercise += 1;
  workoutView.playSoundNext();
  renderWorkoutView();
}

function skipToHandler() {
  if (workoutView.currentExercise === model.workout.exercises.length - 1) {
    resetWorkoutView();
    workoutView.insertToLastSetList();
    workoutView.playSoundFinish();
    return workoutView.renderEndModal(renderHome);
  }
  for (
    let i = 0;
    i <
    model.workout.sets[workoutView.currentExercise] - workoutView.currentSet;
    i++
  ) {
    workoutView.progressBar();
  }
  workoutView.currentSet = 1;
  workoutView.currentExercise += 1;
  workoutView.playSoundNext();
  renderWorkoutView();
}

function backHomeHandler() {
  resetWorkoutView();
  return renderHome();
}

function resetWorkoutView() {
  workoutView.currentExercise = 0;
  workoutView.currentSet = 1;
  workoutView.progress = 0;
}

function heavyHandler() {
  if (!Number.isFinite(model.workout.weight[workoutView.currentExercise])) {
    if (model.workout.reps[workoutView.currentExercise] === 2) return;
    model.workout.reps[workoutView.currentExercise] -= 1;
  } else {
    if (model.workout.weight[workoutView.currentExercise] === 2) {
      if (model.workout.reps[workoutView.currentExercise] === 2) return;
      model.workout.reps[workoutView.currentExercise] -= 1;
    } else {
      model.workout.weight[workoutView.currentExercise] -= 2;
    }
  }
  doneHandler();
}

function lightHandler() {
  if (!Number.isFinite(model.workout.weight[workoutView.currentExercise])) {
    model.workout.reps[workoutView.currentExercise] += 1;
  } else {
    model.workout.weight[workoutView.currentExercise] += 2;
  }
  doneHandler();
}

// USER HANDLERS

function dropdownItemListHandler() {
  document.querySelector(".experience-active-btn").textContent =
    this.textContent;
  document.querySelector(".dropdown-options-list").classList.add("hidden");
  document.querySelector(".dropdown-arrow").classList.toggle("rotate180");
  activeUser.experience = this.dataset.exp;
}

//LOGIN HANDLERS

function loginAction() {
  let login = document.querySelector(".login-login");
  let password = document.querySelector(".login-password");
  model.usersList.forEach((user) => {
    if (user.login === login.value && user.password === password.value) {
      activeUser = user;
      return renderHome();
    }
  });
  if (activeUser) return;
  login.value = "";
  password.value = "";
  document.querySelector(".error-login-text").classList.remove("hidden");
  document.querySelectorAll(".input").forEach((input) => {
    input.classList.add("input-error");
    input.addEventListener("click", () => {
      input.classList.remove("input-error");
    });
  });
}
