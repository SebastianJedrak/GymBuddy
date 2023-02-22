import homeView from "./views/homeView.js";
import userView from "./views/userView.js";
import historyView from "./views/historyView.js";
import workoutView from "./views/workoutView.js";
import navigatorView from "./views/navigatorView.js";
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
  homeView.startListener(renderWorkout.bind(workoutView));
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

function renderWorkout() {
  // Render HTML
  workoutView.renderView();
  // Back button
  workoutView.backListener(renderHome);
}

function navStart() {
  navigatorView.userListener(renderUser);
  navigatorView.homeListener(renderHome);
  navigatorView.historyListener(renderHistory);
}

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

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0adeb2f97amshd8f144b29750119p1c7540jsn752e8dc122da",
    "X-RapidAPI-Host": "exerciseapi3.p.rapidapi.com",
  },
};

const muscles = {
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

const API_URL = `https://exerciseapi3.p.rapidapi.com/search/?primaryMuscle=${muscles.gluteus}`;

fetch(API_URL, options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
