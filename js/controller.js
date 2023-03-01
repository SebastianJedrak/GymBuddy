import homeView from "./views/homeView.js";
import userView from "./views/userView.js";
import historyView from "./views/historyView.js";
import workoutView from "./views/workoutView.js";
import navigatorView from "./views/navigatorView.js";
import spinnerView from "./views/spinnerView.js";
import * as model from "./model.js";

function init() {
  renderHome();
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
  // Reset workoutParametersObject
  model.workoutParameters.bodyPart = "full";
  model.workoutParameters.type = "balanced";
  model.workoutParameters.duration = "medium";
}

function renderUser() {
  // Render HTML
  userView.renderView();
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
  workoutView.getDataToRender(model.workout);
  console.log(model.workout);
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
}

function navStart() {
  navigatorView.userListener(renderUser);
  navigatorView.homeListener(renderHome);
  navigatorView.historyListener(renderHistory);
}

//! LISTENERS

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

function doneHandler() {
  if (
    workoutView.currentSet < model.workout.sets[workoutView.currentExercise]
  ) {
    workoutView.currentSet += 1;
    return renderWorkoutView();
  }
  if (workoutView.currentExercise === model.workout.exercises.length - 1) {
    resetWorkoutView();
    return renderHome();
  }
  workoutView.currentSet = 1;
  workoutView.currentExercise += 1;
  renderWorkoutView();
}

function skipToHandler() {
  if (workoutView.currentExercise === model.workout.exercises.length - 1) {
    resetWorkoutView();
    return renderHome();
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
