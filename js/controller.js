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
  // Navigation bar
  navStart();
  document.querySelector(".nav-tile-home").classList.add("active");
  // Start button
  homeView.startListener(renderWorkout.bind(workoutView));
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
